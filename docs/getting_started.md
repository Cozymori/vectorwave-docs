# Getting Started

Let's install VectorWave and create your first vectorized function. It only takes 5 minutes.

## 1. Prerequisites

* **Python**: 3.10~3.13
* **Docker**: Required to run the Weaviate database.
* (Optional) **OpenAI API Key**: Required when using AI auto-documentation and high-performance embedding.

## 2. Installation

### Library Installation

Install the VectorWave package using `pip` in your terminal.

```bash
pip install vectorwave

```

### Running Weaviate Database

VectorWave uses Weaviate as its backend. You can use the `docker-compose` file included in the project or run it using the command below.

```bash
# Download and run vw_docker.yml
curl -O [https://raw.githubusercontent.com/cozymori/vectorwave/main/test_ex/vw_docker.yml](https://raw.githubusercontent.com/cozymori/vectorwave/main/test_ex/vw_docker.yml)
docker-compose -f vw_docker.yml up -d

```

### Environment Variable Setup (.env)

Create a `.env` file in the project root and add the following settings. We recommend `huggingface` mode which doesn't require a separate API key for local testing.

```ini
# .env file content
WEAVIATE_HOST=localhost
WEAVIATE_PORT=8080
WEAVIATE_GRPC_PORT=50051

# Vectorizer strategy selection: huggingface (Local CPU, Free)
VECTORIZER="huggingface"
HF_MODEL_NAME="sentence-transformers/all-MiniLM-L6-v2"

# Optional: When using OpenAI (VECTORIZER="openai_client")
# OPENAI_API_KEY="sk-..."

```

## 3. Quickstart

Now let's write your first VectorWave script.

### DB Initialization and Function Definition

Create a `quickstart.py` file and write the code below.

```python
import time
from vectorwave import vectorize, initialize_database

# 1. Database Connection and Schema Initialization
# Only needs to be called once when the script starts.
initialize_database()

# 2. Apply @vectorize to function
@vectorize(
    search_description="Process user payment and return receipt.", # Description for search
    team="billing",  # Custom tag
    priority=1       # Custom tag
)
def process_payment(user_id: str, amount: int):
    print(f"Processing payment for {user_id}...")
    time.sleep(0.1) # Simulate processing time
    return {"status": "success", "receipt_id": f"rcpt_{amount}"}

# 3. Execute function (Automatically stored)
if __name__ == "__main__":
    print("Function Calling...")
    result = process_payment("user_123", 5000)
    print(f"Result: {result}")

```

### Check Execution Result

Run the script you wrote.

```bash
python quickstart.py

```

Running it will automatically perform the following operations:

1. The source code and description of the `process_payment` function are stored in the `VectorWaveFunctions` collection.
2. The function execution record (inputs `user_123`, `5000` and return value) is stored in the `VectorWaveExecutions` collection.

Now this data is searchable and can be utilized for RAG or testing later.
