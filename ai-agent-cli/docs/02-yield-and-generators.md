# Understanding Yield and Generators

## What is `yield`?

The `yield` keyword turns a function into a **generator**. Instead of returning a single value and exiting, a generator can **yield** multiple values, one at a time, pausing execution between each yield.

---

## Regular Function vs Generator Function

### Regular Function

```python
def get_numbers():
    result = []
    for i in range(5):
        result.append(i)
    return result  # Returns everything at once

numbers = get_numbers()  # [0, 1, 2, 3, 4]
```

### Generator Function

```python
def get_numbers():
    for i in range(5):
        yield i  # Yields one value at a time

numbers = get_numbers()  # Returns a generator object
for num in numbers:
    print(num)  # Prints 0, 1, 2, 3, 4 one at a time
```

---

## How Generators Work

```
┌─────────────────────────────────────────────────────────┐
│                    Generator Flow                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   def example():          │   for x in example():       │
│       yield 1       ──────┼───► x = 1                   │
│       # PAUSES HERE       │                              │
│       yield 2       ──────┼───► x = 2                   │
│       # PAUSES HERE       │                              │
│       yield 3       ──────┼───► x = 3                   │
│       # FUNCTION ENDS     │   # Loop ends               │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## Why Use Generators?

### 1. Memory Efficiency

```python
# BAD: Loads everything into memory
def get_million_items():
    return [i for i in range(1_000_000)]  # Uses ~8MB

# GOOD: Generates items on-demand
def get_million_items():
    for i in range(1_000_000):
        yield i  # Uses almost no memory
```

### 2. Lazy Evaluation

```python
def infinite_counter():
    n = 0
    while True:
        yield n
        n += 1

# Get first 5 numbers (doesn't run forever!)
counter = infinite_counter()
for _ in range(5):
    print(next(counter))  # 0, 1, 2, 3, 4
```

### 3. Pipeline Processing

```python
def read_large_file(file_path):
    with open(file_path) as f:
        for line in f:
            yield line.strip()

def filter_comments(lines):
    for line in lines:
        if not line.startswith('#'):
            yield line

def process_data(lines):
    for line in lines:
        yield line.upper()

# Chain generators together - memory efficient!
lines = read_large_file('data.txt')
filtered = filter_comments(lines)
processed = process_data(filtered)

for line in processed:
    print(line)
```

---

## Generator Expression

A compact way to create generators:

```python
# List comprehension (creates list in memory)
squares_list = [x**2 for x in range(10)]

# Generator expression (creates generator, lazy evaluation)
squares_gen = (x**2 for x in range(10))

# Usage is the same
for square in squares_gen:
    print(square)
```

---

## The `next()` Function

Manually get the next value from a generator:

```python
def simple_generator():
    yield "First"
    yield "Second"
    yield "Third"

gen = simple_generator()

print(next(gen))  # "First"
print(next(gen))  # "Second"
print(next(gen))  # "Third"
print(next(gen))  # Raises StopIteration!
```

---

## `yield` vs `return`

| `return`                      | `yield`                               |
| ----------------------------- | ------------------------------------- |
| Exits the function completely | Pauses the function, saves state      |
| Returns a single value        | Can yield multiple values             |
| Memory for entire result      | Memory-efficient, one value at a time |
| Runs to completion            | Lazy evaluation                       |

---

## Real-World Example: Streaming LLM Responses

This is exactly how our LLM client uses generators:

```python
def stream_llm_response(prompt):
    """Simulates streaming response from LLM"""
    response = "Hello! I am a helpful assistant."

    for word in response.split():
        time.sleep(0.1)  # Simulate network delay
        yield word  # Send each word as it "arrives"

# Usage - print words as they arrive
for word in stream_llm_response("Hi"):
    print(word, end=" ", flush=True)
# Output: Hello! I am a helpful assistant.
# (Words appear one by one with delay)
```

---

## `yield from` - Delegating to Sub-generators

```python
def sub_generator():
    yield 1
    yield 2
    yield 3

def main_generator():
    yield "Start"
    yield from sub_generator()  # Delegate to another generator
    yield "End"

for item in main_generator():
    print(item)
# Output: Start, 1, 2, 3, End
```

---

## Sending Values INTO Generators

Generators can also receive values:

```python
def accumulator():
    total = 0
    while True:
        value = yield total  # Receives value AND yields
        if value is not None:
            total += value

acc = accumulator()
next(acc)           # Start the generator, returns 0
print(acc.send(5))  # Send 5, returns 5
print(acc.send(10)) # Send 10, returns 15
print(acc.send(3))  # Send 3, returns 18
```

---

## Key Takeaways

| Concept          | Description                                  |
| ---------------- | -------------------------------------------- |
| `yield`          | Pauses function, returns value, saves state  |
| Generator        | Function that uses `yield`, returns iterator |
| Lazy             | Values computed on-demand, not upfront       |
| Memory efficient | Only one value in memory at a time           |
| `StopIteration`  | Raised when generator is exhausted           |
| `yield from`     | Delegate to another generator                |

---

## Further Reading

- [Python Generators Documentation](https://docs.python.org/3/howto/functional.html#generators)
- [Real Python - Generators](https://realpython.com/introduction-to-python-generators/)
