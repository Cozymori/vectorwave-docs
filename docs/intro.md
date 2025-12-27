---
sidebar_position: 1
---

# Introduction to VectorWave

**VectorWave** is a seamless auto-vectorization framework for Python that transforms how you build AI applications.

## What is VectorWave?

VectorWave allows you to automatically enable Vector DB storage, semantic caching, and distributed tracing with just a single decorator on your Python functions.

```python
from vectorwave import vectorize

@vectorize(collection="documents", cache=True, trace=True)
def process_document(text: str) -> dict:
    return {"content": text, "processed": True}
```

That's it. Your function is now:
- ✅ Automatically storing vectors in your preferred Vector DB
- ✅ Using semantic caching to avoid redundant computations
- ✅ Fully observable with distributed tracing

## Why VectorWave?

### 🚀 Developer Experience First
No boilerplate. No complex setup. Just add a decorator and ship.

### 🧠 Intelligent Defaults
Smart configuration that works out of the box, with full customization when you need it.

### 🔌 Ecosystem Ready
Works with Pinecone, Weaviate, Qdrant, Milvus, Chroma, and more.

## Quick Start

```bash
pip install vectorwave
```

Ready to dive in? Check out our [Getting Started Guide](/docs/getting_started).
