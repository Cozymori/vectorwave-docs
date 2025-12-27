# Core Concepts

Dive deep into VectorWave's three pillars: **Vectorization**, **Distributed Tracing**, and **Semantic Caching**.

## 1. Function Vectorization (@vectorize)

The `@vectorize` decorator is the heart of VectorWave. This decorator wraps functions to store **static information** and **dynamic execution information** separately.

### How it Works

1.  **Static Storage:** When code is loaded, it embeds the function's source code, Docstring, function name, etc., and stores them in the `VectorWaveFunctions` collection. This becomes the knowledge base for RAG (Retrieval-Augmented Generation) systems.
2.  **Dynamic Logging:** Whenever the function executes, it records arguments, return values, execution time, and success/failure status in the `VectorWaveExecutions` collection.

### Key Parameters

```python
@vectorize(
    search_description="Summary of what the function does", # Most important for search accuracy
    sequence_narrative="Contextual explanation before/after function call", # Helps in understanding workflow
    team="backend",      # (Optional) Custom tag
    priority=1,          # (Optional) Custom tag
    replay=True          # (Optional) Enable I/O capture for replay testing
)
def my_function(arg1):
    pass

```

## 2. Distributed Tracing

Complex business logic often takes the form of multiple functions being called in a chain. VectorWave allows you to visualize this by binding them into a single `trace_id`.

### Root and Span

* **Root Span (`@vectorize`)**: The starting point of a trace. A unique `trace_id` is generated here.
* **Child Span (`@trace_span`)**: Child functions called inside the Root function. They automatically inherit the parent's `trace_id`.

### Usage Example

```python
from vectorwave import vectorize, trace_span

# 1. Child Span (Argument capture available)
@trace_span(attributes_to_capture=['user_id'])
def validate_user(user_id):
    print("User validated.")

# 2. Root Span
@vectorize(search_description="Sign up process")
def sign_up(user_id):
    # validate_user shares the same trace_id as sign_up.
    validate_user(user_id) 

```

### Trace Search

You can retrieve all execution logs belonging to a specific trace ID in chronological order using the `search_executions` function.

## 3. Semantic Caching

It skips function execution and returns stored results not only when inputs are identical, but also when **semantically similar inputs** are received. This is very effective for high-cost operations like LLM calls.

### Setup Method

Set `semantic_cache=True` along with a `cache_threshold` (similarity threshold).

```python
@vectorize(
    semantic_cache=True,        # Enable caching
    cache_threshold=0.95,       # Cache hit if similarity is 95% or higher
    capture_return_value=True   # Return value storage is mandatory
)
def summarize_text(text: str):
    # Expensive LLM API call...
    return llm_response

```

* **Cache Hit:** If a past record with similarity of 0.95 or higher exists, it returns the result immediately without executing the function.
* **Cache Miss:** If no similar record exists, it executes the function and stores the result in the DB.

## 4. Search Interface (Search)

Stored data can be searched using natural language at any time.

* **`search_functions(query="...")`**: Finds relevant function code by explaining functionality or purpose in natural language.
* **`search_executions(filters={...})`**: Filters and retrieves execution logs by specific error codes, teams, function names, etc.
