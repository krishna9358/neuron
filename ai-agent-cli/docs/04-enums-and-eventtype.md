# Understanding Enums and EventType

## What is an Enum?

An **Enum** (enumeration) is a way to define a set of named constants. It's used when a variable should only have a specific set of valid values.

Think of it like a dropdown menu - you can only select from predefined options.

---

## Basic Enum Example

```python
from enum import Enum

class Color(Enum):
    RED = "red"
    GREEN = "green"
    BLUE = "blue"

# Usage
my_color = Color.RED
print(my_color)        # Color.RED
print(my_color.value)  # "red"
print(my_color.name)   # "RED"
```

---

## Why Use Enums?

### Without Enums (Error-prone)

```python
def set_status(status: str):
    if status == "pending":      # Typo: "pendign" won't be caught!
        do_something()
    elif status == "completed":
        do_other_thing()

set_status("pendign")  # Bug! No error, just doesn't work
```

### With Enums (Type-safe)

```python
class Status(Enum):
    PENDING = "pending"
    COMPLETED = "completed"

def set_status(status: Status):
    if status == Status.PENDING:
        do_something()
    elif status == Status.COMPLETED:
        do_other_thing()

set_status(Status.PENDIGN)  # ❌ Error! Typo caught immediately
set_status(Status.PENDING)  # ✅ Works correctly
```

---

## How It's Used in Our Codebase

### The `EventType` Enum

```python
from dataclasses import dataclass
from enum import Enum

@dataclass
class EventType(str, Enum):
    # TEXT_DELTA is sent while LLM is generating text
    TEXT_DELTA = "text_delta"

    # MESSAGE_COMPLETE is sent when generation is finished
    MESSAGE_COMPLETE = "message_complete"

    # ERROR is sent when something goes wrong
    ERROR = "error"
```

---

## The `(str, Enum)` Pattern

Notice `EventType(str, Enum)` - this is a **mixed-in Enum**:

```python
class EventType(str, Enum):
    TEXT_DELTA = "text_delta"
```

**Benefits:**

1. **Inherits from `str`**: Can be used anywhere a string is expected
2. **JSON serializable**: Works with `json.dumps()` automatically
3. **String comparison**: `EventType.TEXT_DELTA == "text_delta"` is `True`

```python
# Regular Enum
class RegularStatus(Enum):
    ACTIVE = "active"

print(RegularStatus.ACTIVE == "active")  # False (different types)

# String Enum
class StringStatus(str, Enum):
    ACTIVE = "active"

print(StringStatus.ACTIVE == "active")   # True (string comparison works)
```

---

## Using EventType in Our Code

### Creating StreamEvents with EventType

```python
# Text delta event (during streaming)
text_event = StreamEvent(
    type=EventType.TEXT_DELTA,
    text_delta=TextDelta(content="Hello")
)

# Message complete event (when done)
complete_event = StreamEvent(
    type=EventType.MESSAGE_COMPLETE,
    finish_reason="stop",
    usage=TokenUsage(...)
)

# Error event (when something fails)
error_event = StreamEvent(
    type=EventType.ERROR,
    error="Rate limit exceeded"
)
```

### Checking Event Types

```python
async for event in client.chat_completion(messages, stream=True):
    if event.type == EventType.TEXT_DELTA:
        # Handle streaming text
        print(event.text_delta.content, end="", flush=True)

    elif event.type == EventType.MESSAGE_COMPLETE:
        # Handle completion
        print(f"\n\nTokens used: {event.usage.total_tokens}")

    elif event.type == EventType.ERROR:
        # Handle error
        print(f"Error: {event.error}")
```

---

## Enum Features

### Iterating Over Enums

```python
class EventType(str, Enum):
    TEXT_DELTA = "text_delta"
    MESSAGE_COMPLETE = "message_complete"
    ERROR = "error"

# List all event types
for event_type in EventType:
    print(f"{event_type.name} = {event_type.value}")

# Output:
# TEXT_DELTA = text_delta
# MESSAGE_COMPLETE = message_complete
# ERROR = error
```

### Accessing by Name or Value

```python
# By name
EventType["TEXT_DELTA"]  # EventType.TEXT_DELTA

# By value
EventType("text_delta")  # EventType.TEXT_DELTA
```

---

## Enum Comparison

```python
class Priority(Enum):
    LOW = 1
    MEDIUM = 2
    HIGH = 3

# Identity comparison (recommended)
print(Priority.HIGH == Priority.HIGH)  # True
print(Priority.HIGH == Priority.LOW)   # False

# Value comparison
print(Priority.HIGH.value > Priority.LOW.value)  # True (3 > 1)

# Enums are singletons - use 'is' for comparison
print(Priority.HIGH is Priority.HIGH)  # True
```

---

## Auto-numbered Enums

```python
from enum import Enum, auto

class Status(Enum):
    PENDING = auto()    # 1
    RUNNING = auto()    # 2
    COMPLETED = auto()  # 3
    FAILED = auto()     # 4
```

---

## Enum with Methods

```python
class EventType(str, Enum):
    TEXT_DELTA = "text_delta"
    MESSAGE_COMPLETE = "message_complete"
    ERROR = "error"

    def is_terminal(self) -> bool:
        """Returns True if this is a final event type."""
        return self in (EventType.MESSAGE_COMPLETE, EventType.ERROR)

    def is_error(self) -> bool:
        return self == EventType.ERROR

# Usage
event_type = EventType.MESSAGE_COMPLETE
print(event_type.is_terminal())  # True
print(event_type.is_error())     # False
```

---

## Complete Event Flow

```
┌─────────────────────────────────────────────────────────┐
│                    Event Type Flow                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   LLM API Response              Event Types              │
│   ────────────────              ───────────              │
│                                                          │
│   Token arrives ──────────────► TEXT_DELTA               │
│   Token arrives ──────────────► TEXT_DELTA               │
│   Token arrives ──────────────► TEXT_DELTA               │
│        ...                          ...                  │
│   Generation done ────────────► MESSAGE_COMPLETE         │
│                                                          │
│   OR                                                     │
│                                                          │
│   Something fails ────────────► ERROR                    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## Key Takeaways

| Feature          | Description                            |
| ---------------- | -------------------------------------- |
| Type Safety      | Prevents invalid values                |
| Self-documenting | Clear set of valid options             |
| IDE Support      | Autocomplete and error detection       |
| String Enum      | `(str, Enum)` for string compatibility |
| Singletons       | Each value is a unique instance        |
| Iteratable       | Can loop through all values            |

---

## Further Reading

- [Python Enum Documentation](https://docs.python.org/3/library/enum.html)
- [Real Python - Enums](https://realpython.com/python-enum/)
