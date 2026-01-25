# 📚 Documentation Index

Welcome to the Neuron AI Agent CLI documentation! This folder contains in-depth explanations of Python concepts and how they're used in this codebase.

---

## 📖 Learning Path

Follow these documents in order for the best learning experience:

| #   | Document                                           | Description                                                           |
| --- | -------------------------------------------------- | --------------------------------------------------------------------- |
| 1   | [Dataclasses](./01-dataclasses.md)                 | Learn about Python's `@dataclass` decorator for clean data containers |
| 2   | [Yield & Generators](./02-yield-and-generators.md) | Understand the `yield` keyword and generator functions                |
| 3   | [Async Generators](./03-async-generators.md)       | Combine async/await with generators for streaming                     |
| 4   | [Enums & EventType](./04-enums-and-eventtype.md)   | Type-safe constants with Python Enums                                 |
| 5   | [Code Walkthrough](./05-code-walkthrough.md)       | Complete walkthrough of how all pieces fit together                   |

---

## 🎯 Quick Reference

### What Concept to Read For...

| If you want to understand... | Read this                                                  |
| ---------------------------- | ---------------------------------------------------------- |
| `@dataclass` decorator       | [01-dataclasses.md](./01-dataclasses.md)                   |
| `yield` keyword              | [02-yield-and-generators.md](./02-yield-and-generators.md) |
| `async for` loop             | [03-async-generators.md](./03-async-generators.md)         |
| `AsyncGenerator` type hint   | [03-async-generators.md](./03-async-generators.md)         |
| `Enum` class                 | [04-enums-and-eventtype.md](./04-enums-and-eventtype.md)   |
| `EventType`, `StreamEvent`   | [04-enums-and-eventtype.md](./04-enums-and-eventtype.md)   |
| How the whole system works   | [05-code-walkthrough.md](./05-code-walkthrough.md)         |

---

## 🗂️ Codebase Structure

```
ai-agent-cli/
├── main.py                 # Entry point
├── client/
│   ├── llm_client.py       # LLM client (see: 03, 05)
│   └── response.py         # Data classes (see: 01, 04)
└── docs/
    ├── README.md           # This file
    ├── 01-dataclasses.md
    ├── 02-yield-and-generators.md
    ├── 03-async-generators.md
    ├── 04-enums-and-eventtype.md
    └── 05-code-walkthrough.md
```

---

## 💡 Tips for Learning

1. **Start with the basics**: Read documents 1-4 before the code walkthrough
2. **Run examples**: Try the code snippets in a Python REPL
3. **Modify and experiment**: Change the code to see what happens
4. **Read the actual source**: Refer back to `llm_client.py` and `response.py`

---

## 🔗 External Resources

- [Python Documentation](https://docs.python.org/3/)
- [Real Python Tutorials](https://realpython.com/)
- [OpenAI Python SDK](https://github.com/openai/openai-python)
- [OpenRouter Documentation](https://openrouter.ai/docs)

---

Happy Learning! 🚀
