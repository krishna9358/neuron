# Understanding Async Generators

## What is an Async Generator?

An **async generator** combines two powerful concepts:

1. **Generators** - Functions that yield values one at a time
2. **Async/Await** - Non-blocking asynchronous programming

It's a function that:

- Uses `async def` to define it
- Uses `yield` to produce values
- Can use `await` to wait for async operations

---

## Async Generator Syntax

```python
from typing import AsyncGenerator

async def async_generator() -> AsyncGenerator[int, None]:
    for i in range(5):
        await asyncio.sleep(0.1)  # Simulate async operation
        yield i  # Yield value
```

---

## Regular Generator vs Async Generator

### Regular Generator

```python
def regular_generator():
    for i in range(3):
        time.sleep(1)  # BLOCKS the entire program
        yield i

for item in regular_generator():
    print(item)
```

### Async Generator

```python
async def async_generator():
    for i in range(3):
        await asyncio.sleep(1)  # Non-blocking wait
        yield i

async for item in async_generator():
    print(item)
```

---

## The `async for` Loop

To consume an async generator, use `async for`:

```python
async def count_slowly():
    for i in range(5):
        await asyncio.sleep(0.5)
        yield i

async def main():
    # Must use 'async for' with async generators
    async for number in count_slowly():
        print(f"Got: {number}")

asyncio.run(main())
```

---

## Why Async Generators Matter

### The Problem with Blocking I/O

```
┌─────────────────────────────────────────────────────────┐
│              Synchronous (Blocking) Approach            │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   Request 1: ████░░░░░░ (waiting for response...)       │
│   Request 2:           ████░░░░░░ (can't start yet!)    │
│   Request 3:                      ████░░░░░░            │
│                                                          │
│   Total Time: ████████████████████████████████          │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### The Solution with Async

```
┌─────────────────────────────────────────────────────────┐
│              Asynchronous (Non-blocking) Approach       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   Request 1: ████░░░░░░                                 │
│   Request 2: ████░░░░░░  (runs concurrently!)           │
│   Request 3: ████░░░░░░  (runs concurrently!)           │
│                                                          │
│   Total Time: ████░░░░░░ (much faster!)                 │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## Type Hints for Async Generators

```python
from typing import AsyncGenerator

async def my_async_gen() -> AsyncGenerator[str, None]:
    """
    AsyncGenerator[YieldType, SendType]
    - YieldType: Type of values yielded (str in this case)
    - SendType: Type of values sent in (None = we don't send values)
    """
    yield "hello"
    yield "world"
```

---

## How It's Used in Our Codebase

### The `chat_completion` Method

```python
async def chat_completion(
    self, messages: list[dict[str, Any]], stream: bool = True
) -> AsyncGenerator[StreamEvent, None]:
    """
    Returns an async generator that yields StreamEvent objects.

    - AsyncGenerator: Because we yield values asynchronously
    - StreamEvent: The type of object we yield
    - None: We don't send values into this generator
    """
    client = self.get_client()

    # ... setup code ...

    if stream:
        # Yield events from the streaming response
        async for event in self._stream_response(client, kwargs):
            yield event
    else:
        # Yield a single event
        event = await self._non_stream_response(client, kwargs)
        yield event
```

### The `_stream_response` Method

```python
async def _stream_response(
    self, client: AsyncOpenAI, kwargs: dict[str, Any]
) -> AsyncGenerator[StreamEvent, None]:
    # Make async API call
    response = await client.chat.completions.create(**kwargs)

    # Stream the response chunks
    async for chunk in response:
        if chunk.choices:
            choice = chunk.choices[0]
            if choice.delta.content:
                # Yield each text delta as it arrives
                yield StreamEvent(
                    type=EventType.TEXT_DELTA,
                    text_delta=TextDelta(content=choice.delta.content),
                )

    # Yield final completion event
    yield StreamEvent(
        type=EventType.MESSAGE_COMPLETE,
        finish_reason=finish_reason,
        usage=usage,
    )
```

---

## Complete Flow Visualization

```
┌─────────────────────────────────────────────────────────────┐
│                   Streaming LLM Response Flow                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   User Code                  LLM Client                API   │
│   ─────────                  ──────────                ───   │
│       │                          │                       │   │
│       │  async for event in      │                       │   │
│       │  chat_completion()       │                       │   │
│       │─────────────────────────►│                       │   │
│       │                          │ await create()        │   │
│       │                          │──────────────────────►│   │
│       │                          │                       │   │
│       │                          │◄─ chunk 1 ───────────│   │
│       │◄── yield TEXT_DELTA ─────│                       │   │
│       │    (prints "Hello")      │                       │   │
│       │                          │◄─ chunk 2 ───────────│   │
│       │◄── yield TEXT_DELTA ─────│                       │   │
│       │    (prints " World")     │                       │   │
│       │                          │◄─ done ──────────────│   │
│       │◄── yield MESSAGE_COMPLETE│                       │   │
│       │    (with usage stats)    │                       │   │
│       │                          │                       │   │
│       ▼                          ▼                       ▼   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Consuming Async Generators in Our Code

### In `main.py`

```python
async def main():
    client = LLMClient()
    messages = [{"role": "user", "content": "what's up?"}]

    # Consume the async generator with 'async for'
    async for event in client.chat_completion(messages=messages, stream=True):
        print(event)

    print("done")

# Run the async main function
asyncio.run(main())
```

---

## Error Handling in Async Generators

```python
async def safe_async_generator():
    try:
        async for item in some_risky_operation():
            yield item
    except SomeError as e:
        yield ErrorEvent(error=str(e))
    finally:
        await cleanup()

# Our code uses this pattern:
async def chat_completion(...):
    try:
        if stream:
            async for event in self._stream_response(client, kwargs):
                yield event
    except RateLimitError as e:
        # Retry logic...
        yield StreamEvent(type=EventType.ERROR, error=f"Rate Limit: {e}")
```

---

## Key Differences Summary

| Feature     | Generator           | Async Generator        |
| ----------- | ------------------- | ---------------------- |
| Definition  | `def` + `yield`     | `async def` + `yield`  |
| Consumption | `for x in gen()`    | `async for x in gen()` |
| Can await?  | ❌ No               | ✅ Yes                 |
| Blocking?   | Yes                 | No (non-blocking)      |
| Use case    | CPU-bound iteration | I/O-bound streaming    |

---

## When to Use Async Generators

✅ **Use async generators when:**

- Streaming data from network (APIs, WebSockets)
- Reading large files asynchronously
- Processing real-time data feeds
- Building async pipelines

❌ **Don't use async generators when:**

- Operations are CPU-bound (use regular generators)
- You need all data at once
- Simplicity is more important than performance

---

## Further Reading

- [PEP 525 - Async Generators](https://peps.python.org/pep-0525/)
- [Python asyncio Documentation](https://docs.python.org/3/library/asyncio.html)
- [Real Python - Async IO](https://realpython.com/async-io-python/)
