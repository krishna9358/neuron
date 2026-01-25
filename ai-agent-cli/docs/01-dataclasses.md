# Understanding Python Dataclasses

## What is a Dataclass?

A **dataclass** is a decorator in Python (introduced in Python 3.7) that automatically generates special methods like `__init__()`, `__repr__()`, and `__eq__()` for classes that are primarily used to store data.

Think of it as a shortcut for creating classes that hold data without writing boilerplate code.

---

## Before Dataclasses (The Old Way)

```python
# Traditional class - lots of boilerplate!
class Person:
    def __init__(self, name: str, age: int, email: str):
        self.name = name
        self.age = age
        self.email = email

    def __repr__(self):
        return f"Person(name={self.name}, age={self.age}, email={self.email})"

    def __eq__(self, other):
        if not isinstance(other, Person):
            return False
        return self.name == other.name and self.age == other.age and self.email == other.email
```

---

## With Dataclasses (The Modern Way)

```python
from dataclasses import dataclass

@dataclass
class Person:
    name: str
    age: int
    email: str
```

**That's it!** Python automatically generates `__init__`, `__repr__`, and `__eq__` for you.

---

## How It's Used in Our Codebase

### `TextDelta` Class

```python
@dataclass
class TextDelta:
    content: str

    def __str__(self):
        return self.content
```

**What this gives us:**

- Auto-generated `__init__`: `TextDelta(content="Hello")`
- Auto-generated `__repr__`: `TextDelta(content='Hello')`
- We added a custom `__str__` method for nice printing

**Usage:**

```python
delta = TextDelta(content="Hello, World!")
print(delta)          # Output: Hello, World!
print(repr(delta))    # Output: TextDelta(content='Hello, World!')
```

---

### `TokenUsage` Class

```python
@dataclass
class TokenUsage:
    prompt_tokens: int = 0
    completion_tokens: int = 0
    total_tokens: int = 0
    cached_tokens: int = 0

    def __add__(self, other: TokenUsage) -> TokenUsage:
        return TokenUsage(
            prompt_tokens=self.prompt_tokens + other.prompt_tokens,
            completion_tokens=self.completion_tokens + other.completion_tokens,
            total_tokens=self.total_tokens + other.total_tokens,
            cached_tokens=self.cached_tokens + other.cached_tokens,
        )
```

**Key Features:**

1. **Default values**: All fields default to `0`
2. **Custom `__add__` method**: Allows adding two `TokenUsage` objects together

**Usage:**

```python
usage1 = TokenUsage(prompt_tokens=100, completion_tokens=50, total_tokens=150)
usage2 = TokenUsage(prompt_tokens=200, completion_tokens=100, total_tokens=300)

# Using the custom __add__ method
combined = usage1 + usage2
print(combined.total_tokens)  # Output: 450
```

---

### `StreamEvent` Class

```python
@dataclass
class StreamEvent:
    type: EventType
    text_delta: TextDelta | None = None
    error: str | None = None
    finish_reason: str | None = None
    usage: TokenUsage | None = None
```

**Key Features:**

1. **Required field first**: `type` has no default, so it must be provided
2. **Optional fields**: Use `| None = None` pattern for optional fields
3. **Composition**: Contains other dataclasses (`TextDelta`, `TokenUsage`)

**Usage:**

```python
# Creating different event types
text_event = StreamEvent(
    type=EventType.TEXT_DELTA,
    text_delta=TextDelta(content="Hello")
)

error_event = StreamEvent(
    type=EventType.ERROR,
    error="Something went wrong"
)

complete_event = StreamEvent(
    type=EventType.MESSAGE_COMPLETE,
    finish_reason="stop",
    usage=TokenUsage(prompt_tokens=10, completion_tokens=20, total_tokens=30)
)
```

---

## Dataclass Options

```python
from dataclasses import dataclass, field

@dataclass(frozen=True)  # Makes the class immutable
class ImmutableData:
    value: int

@dataclass(order=True)  # Adds comparison methods (__lt__, __gt__, etc.)
class SortableData:
    priority: int
    name: str

@dataclass
class WithDefaultList:
    # Use field() for mutable default values
    items: list = field(default_factory=list)
```

---

## Key Takeaways

| Feature         | Benefit                                    |
| --------------- | ------------------------------------------ |
| Auto `__init__` | No need to write constructor manually      |
| Auto `__repr__` | Easy debugging with readable output        |
| Auto `__eq__`   | Compare objects by value, not identity     |
| Type hints      | Clear documentation of expected types      |
| Default values  | Optional parameters with sensible defaults |
| Composability   | Dataclasses can contain other dataclasses  |

---

## Further Reading

- [Python Dataclasses Documentation](https://docs.python.org/3/library/dataclasses.html)
- [Real Python - Data Classes Guide](https://realpython.com/python-data-classes/)
