# Configuration

VectorWave provides robust and type-safe configuration management based on `pydantic-settings`.
All settings can be controlled via a **`.env` file** or **system environment variables**.

## 1. Connection & Schema

Defines the Weaviate database connection and the collection (Table) names where data will be stored.

| Variable Name | Description | Default Value |
| :--- | :--- | :--- |
| `WEAVIATE_HOST` | Weaviate instance host address | `localhost` |
| `WEAVIATE_PORT` | HTTP port (REST API) | `8080` |
| `WEAVIATE_GRPC_PORT` | gRPC port (for bulk data transfer) | `50051` |
| `COLLECTION_NAME` | Collection name for storing function metadata (static info) | `VectorWaveFunctions` |
| `EXECUTION_COLLECTION_NAME` | Collection name for storing execution logs (dynamic info) | `VectorWaveExecutions` |
| `GOLDEN_COLLECTION_NAME` | Collection name for storing golden datasets for testing | `VectorWaveGoldenDataset` |
| `IS_VECTORIZE_COLLECTION_NAME` | Whether to store function definitions (static data) (If False, only logs are stored) | `True` |

## 2. AI & Vectorizer Strategy

Sets the engine and model for embedding (Vectorizing) data.

### Strategy Selection (`VECTORIZER`)

| Value | Description |
| :--- | :--- |
| **`huggingface`** | (Default) Uses local `sentence-transformers` models. Free & secure. |
| `openai_client` | Uses OpenAI API. High accuracy, costs apply. |
| `weaviate_module` | Delegates to Weaviate's internal modules (`text2vec-*`). |
| `none` | Disables vectorization (storage only). |

### Detailed Settings

| Variable Name | Description | Default Value |
| :--- | :--- | :--- |
| `HF_MODEL_NAME` | HuggingFace model name (used in local mode) | `sentence-transformers/all-MiniLM-L6-v2` |
| `OPENAI_API_KEY` | OpenAI API key (`sk-...`) | `None` |
| `WEAVIATE_VECTORIZER_MODULE` | Module name to use in Weaviate module mode | `text2vec-openai` |
| `WEAVIATE_GENERATIVE_MODULE` | Weaviate generative module name (for RAG) | `generative-openai` |

## 3. Performance & Batching

Balances real-time processing and bulk data processing. VectorWave uses **Async Batching** by default.

| Variable Name | Description | Default Value |
| :--- | :--- | :--- |
| `BATCH_THRESHOLD` | Batch buffer size. Sends to DB when this count is reached. | `20` |
| `FLUSH_INTERVAL_SECONDS` | Forcibly sends if this time passes even if the buffer isn't full. | `2.0` (seconds) |

> **Tip:** In high-traffic production environments, increase `BATCH_THRESHOLD` to `100` or more to maximize throughput.

## 4. Security & Data Masking

Automatically masks sensitive personal information or secret keys to prevent them from being stored in the Vector DB.

| Variable Name | Description | Default Value |
| :--- | :--- | :--- |
| `SENSITIVE_FIELD_NAMES` | List of keywords to mask (comma separated). Arguments containing these keywords are replaced with `[MASKED]`. | `password,api_key,token,secret,auth_token` |

```python
# Example: password argument is automatically masked and stored
@vectorize
def login(username, password): ... 

```

## 5. Monitoring & Alerting

Sends external notifications when an error occurs.

| Variable Name | Description | Default Value |
| --- | --- | --- |
| `ALERTER_STRATEGY` | Alert strategy (`webhook`, `log`, `none`) | `none` |
| `ALERTER_WEBHOOK_URL` | Slack/Discord webhook URL | `None` |
| `ALERTER_MIN_LEVEL` | Minimum log level to trigger alerts (`INFO`, `WARNING`, `ERROR`) | `ERROR` |

## 6. Advanced Analytics

Settings for detecting data changes or for recommendation systems.

### 📉 Data Drift Detection

Detects when the distribution of input data deviates from training (or past) data.

| Variable Name | Description | Default Value |
| --- | --- | --- |
| `DRIFT_DETECTION_ENABLED` | Whether to enable drift detection | `False` |
| `DRIFT_DISTANCE_THRESHOLD` | Vector distance threshold to determine drift (0~2) | `0.25` |
| `DRIFT_NEIGHBOR_AMOUNT` | Number of recent neighbors to compare | `5` |

### 🎯 Recommendation Margins

Adjusts the search range for similarity search.

| Variable Name | Description | Default Value |
| --- | --- | --- |
| `RECOMMENDATION_STEADY_MARGIN` | Stable (similar) recommendation range | `0.05` |
| `RECOMMENDATION_DISCOVERY_MARGIN` | New (diverse) recommendation discovery range | `0.15` |

## 7. File Path Settings

| Variable Name | Description | Default Value |
| --- | --- | --- |
| `CUSTOM_PROPERTIES_FILE_PATH` | Path to custom metadata schema file | `.weaviate_properties` |
| `FAILURE_MAPPING_FILE_PATH` | Path to error code mapping file | `.vectorwave_errors.json` |
