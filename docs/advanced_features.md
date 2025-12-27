# Advanced Features

Learn how to build automated documentation, robust regression testing, and self-healing systems using VectorWave.

## 1. AI Auto-Documentation

Is writing `search_description` manually a hassle? Leave it to the LLM.
It analyzes the function's code to generate a description and can either **save it to the Vector DB** or **inject it directly into the source code**.

### Setup and Execution

1.  **OpenAI Setup:** The `.env` file must contain the `OPENAI_API_KEY`.
2.  **Mark `auto=True`:** Add `auto=True` to the decorator.
3.  **Generate Metadata:** It is recommended to execute this via a separate script rather than at server startup.

```python
# 1. Marking (Source Code)
@vectorize(auto=True)
def complex_algo(data):
    pass

# 2. Generation & Injection Script (generate_docs.py)
from vectorwave import generate_and_register_metadata

# inject=True: Automatically inserts the generated description into the source file's Docstring.
generate_and_register_metadata(inject=True)

```

## 2. Replay Testing

This is a powerful feature that utilizes actual data from the production environment as test cases.

### 🚀 Stronger Verification: VectorCheck (CLI)

Simple string comparison (`assert a == b`) is not suitable for testing AI responses.
**[VectorCheck](https://github.com/cozymori/vectorcheck)** is an independent CLI tool that verifies the AI's **"Intent"** based on vector similarity.

**Installation:**

```bash
pip install vectorcheck

```

**Configuration (`vwtest.ini`):**

```ini
[vectorcheck]
python_paths = src

; 1. LLM Summary Function (High Randomness) -> Pass if similarity is over 85%
[test:my_module.generate_summary]
strategy = similarity
threshold = 0.85

; 2. URL Generation Function (Deterministic) -> Must match exactly
[test:my_module.generate_url]
strategy = exact

```

**Execution:**

```bash
vw test
vw test --target my_module.generate_summary
vw test --exact

```

### Code-Based Replay (Basic)

If you want to perform a simple replay within the code without CLI tools, you can use `VectorWaveReplayer`.

```python
from vectorwave.utils.replayer import VectorWaveReplayer
replayer = VectorWaveReplayer()
result = replayer.replay("my_module.process_payment", limit=10)
print(f"Success: {result['passed']}, Failure: {result['failed']}")

```

## 3. Auto-Injection

You can inject VectorWave functionality externally without directly modifying business logic code (without `@vectorize`). This is useful for legacy code or libraries where you don't have modification rights.

### How to use

1. **Initialize:** Perform DB connection first.
2. **Configure:** Set common tags like `team`, `priority`, etc.
3. **Inject:** Specify the target module path as a string.
4. **Register:** When using `auto=True` mode, batch register the metadata.

```python
from vectorwave import initialize_database, VectorWaveAutoInjector, generate_and_register_metadata
import my_service.payment # Target module (example)

# 1. DB Initialization
initialize_database()

# 2. Configure Global Settings
VectorWaveAutoInjector.configure(
    team="billing-team", # Tag to be applied to all injected functions
    priority=1,
    auto=True            # True: Collect metadata in memory (Pending), False: Save immediately
)

# 3. Inject Module
# VectorWave is automatically applied to functions within 'my_service.payment'.
# No need to touch the source code!
VectorWaveAutoInjector.inject("my_service.payment")

# 4. Register Metadata (Required if auto=True)
# Batch save collected metadata from memory to DB.
generate_and_register_metadata()

# 5. Execute Business Logic
# Now, vectorization and logging are performed automatically whenever the function runs.
my_service.payment.process_transaction()

```

## 4. Self-Healing

`VectorWaveHealer` comprehensively analyzes the error log, past successful logs, and source code for a function where an error occurred, and proposes patched code.

```python
from vectorwave import VectorWaveHealer

healer = VectorWaveHealer(model="gpt-4")
patch = healer.diagnose_and_heal("buggy_function_name")
print(patch) # Output suggested code patch

```

## 5. Data Archiving

You can export old logs to JSONL files or delete them to manage database capacity.

```python
from vectorwave.database.archiver import VectorWaveArchiver

archiver = VectorWaveArchiver()
archiver.export_and_clear(
    function_name="my_func",
    output_file="data_backup.jsonl",
    clear_after_export=True
)

```

## 6. Data Drift Detection

Detects phenomena (Drift) where user input patterns deviate from existing training data.

### How it Works

When new input data comes in, it calculates the **Vector Distance** from existing stored data. If the distance exceeds the threshold (`DRIFT_DISTANCE_THRESHOLD`), it is likely a new type of data.

### Configuration (.env)

```ini
DRIFT_DETECTION_ENABLED=True
DRIFT_DISTANCE_THRESHOLD=0.25

```

## 7. Golden Dataset Management

Establish **verified correct data (Golden Data)** that serves as a standard for regression testing or self-healing.

### Using the Dataset Manager

```python
from vectorwave.database.dataset import VectorWaveDatasetManager
manager = VectorWaveDatasetManager()

```

### 1. Register Golden Data

Promote verified execution logs to Golden Data.

```python
manager.register_as_golden(log_uuid="...", note="Standard success case")

```
