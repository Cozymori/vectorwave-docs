# Introduction

**VectorWave** is a **"Seamless Auto-Vectorization"** framework that synchronizes the execution flow and results of Python functions to a **Vector Database (Weaviate)** in real-time.

We transform volatile data that disappears the moment code is executed into a **Searchable** and **Reusable** permanent knowledge asset.

:::info Core Philosophy
**"Code is Data."**
VectorWave goes beyond simply logging as text; it embeds the function's **Source Code (Definition)** and **Execution Context (I/O)** into vector space, storing it in a form that AI can understand.
:::

## Paradigm Shift (Why VectorWave?)

Existing data pipelines and VectorWave's approach are fundamentally different.

### 1. Traditional Method (Legacy Pipeline)
* **Complex Process:** Log file generation → Collection (Logstash) → Preprocessing → Embedding model call → Vector DB storage.
* **Dead Data:** Log files are mere text and do not contain semantic meaning, making context search impossible.
* **Management Cost:** The entire pipeline must be modified whenever the data schema changes.

### 2. VectorWave Method
* **Zero Boilerplate:** No separate collection server or pipeline needed; just add the `@vectorize` decorator above the function.
* **Living Data:** All data is vectorized immediately upon storage, enabling natural language queries like "Find the cause of payment failure".
* **Automatic Synchronization:** If code or I/O structure changes, the Vector DB schema adapts automatically.

---

## Key Features

### Semantic Caching

It doesn't just cache when input values match `100%`. VectorWave determines **Semantic Similarity (Vector Distance)** of the input.

> Example: "What is the capital of Korea?" and "Where is the capital city of South Korea?" have different text but the same meaning. VectorWave considers these as the same request, saving LLM call costs.

### Distributed Tracing

Visualizes complex microservices or function call chains by binding them into a single `trace_id`.

* **Trace Root:** The function with `@vectorize` applied becomes the starting point of the trace.
* **Trace Span:** Internal functions with `@trace_span` automatically inherit the parent ID to complete the full execution path.

### Self-Healing

When an error occurs, it doesn't just leave a log.

1. Retrieves the currently occurred **Error Log** and **Source Code**.
2. Searches for **Similar Past Execution History (Golden Data)** in the Vector DB.
3. The LLM compares and analyzes them to propose **Corrected Code (Patch)**.

---

## Ecosystem

VectorWave is powerful on its own, but covers the entire AI engineering lifecycle when used with surrounding tools.

* **VectorSurfer:** A web dashboard that visualizes stored vector data. View execution flow on a timeline and monitor cache hit rates and error rates.
* **VectorCheck:** Beyond the traditional `assert a == b` testing method, it's a **"Semantic Testing"** framework that verifies how similar the AI's output is to the intent.
