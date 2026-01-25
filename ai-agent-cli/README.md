# Neuron AI Agent CLI

A lightweight, async Python CLI client for interacting with Large Language Models (LLMs) via [OpenRouter](https://openrouter.ai/). Built with streaming support, retry logic, and clean response handling.

---

## ✨ Features

- **🚀 Async Architecture** - Built with `asyncio` and `AsyncOpenAI` for non-blocking, efficient API calls
- **📡 Streaming Support** - Real-time token streaming for interactive experiences
- **🔄 Automatic Retries** - Exponential backoff retry logic for rate limits and connection errors
- **📊 Token Usage Tracking** - Detailed token usage statistics including prompt, completion, and cached tokens
- **🛡️ Error Handling** - Graceful handling of API errors, rate limits, and connection issues
- **🔌 OpenRouter Integration** - Connect to multiple LLM providers through a single API endpoint

---

## �️ Tech Stack

| Technology                                                                                                       | Description                     |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| ![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat&logo=python&logoColor=white)               | Core programming language       |
| ![OpenAI SDK](https://img.shields.io/badge/OpenAI_SDK-1.0+-412991?style=flat&logo=openai&logoColor=white)        | Async client for LLM API calls  |
| ![OpenRouter](https://img.shields.io/badge/OpenRouter-API-6366F1?style=flat&logo=router&logoColor=white)         | Multi-provider LLM gateway      |
| ![asyncio](https://img.shields.io/badge/asyncio-Native-306998?style=flat&logo=python&logoColor=white)            | Asynchronous I/O framework      |
| ![python-dotenv](https://img.shields.io/badge/python--dotenv-1.0+-ECD53F?style=flat&logo=dotenv&logoColor=black) | Environment variable management |

---

## �📁 Project Structure

```
ai-agent-cli/
├── main.py              # Application entry point
├── client/
│   ├── llm_client.py    # LLM client with streaming and retry logic
│   └── response.py      # Data classes for events and responses
├── justfile             # Development task runner
├── .env.example         # Environment variables template
├── .env                 # Local environment configuration (not tracked)
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

---

## 🛠️ Installation

### Prerequisites

- Python 3.10+
- [OpenRouter](https://openrouter.ai/) API key
- [just](https://just.systems/) (optional, for task running)

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/krishna9358/neuron.git
   cd neuron/ai-agent-cli
   ```

2. **Create virtual environment**

   Using just:

   ```bash
   just venv
   ```

   Or manually:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # bash/zsh
   # or
   source .venv/bin/activate.fish  # fish shell
   ```

3. **Install dependencies**

   ```bash
   pip install openai python-dotenv
   ```

4. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your OpenRouter API key:

   ```env
   OPENROUTER_API_KEY=your_api_key_here
   MODEL_NAME=xiaomi/mimo-v2-flash:free
   OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
   DEBUG=true
   ```

---

## 🚀 Usage

### Quick Start

Run the main script:

```bash
python main.py
```

### Basic Example

```python
from client.llm_client import LLMClient
import asyncio

async def main():
    client = LLMClient()
    messages = [{"role": "user", "content": "Hello, how are you?"}]

    # Streaming response
    async for event in client.chat_completion(messages=messages, stream=True):
        print(event)

    await client.close()

asyncio.run(main())
```

### Non-Streaming Example

```python
async def main():
    client = LLMClient()
    messages = [{"role": "user", "content": "What is Python?"}]

    async for event in client.chat_completion(messages=messages, stream=False):
        if event.text_delta:
            print(event.text_delta.content)
        if event.usage:
            print(f"Tokens used: {event.usage.total_tokens}")

    await client.close()
```

---

## 📦 API Reference

### `LLMClient`

The main client class for interacting with LLMs.

#### Methods

| Method                              | Description                                        |
| ----------------------------------- | -------------------------------------------------- |
| `get_client()`                      | Returns or creates the AsyncOpenAI client instance |
| `close()`                           | Closes the client connection                       |
| `chat_completion(messages, stream)` | Async generator for chat completions               |

#### Parameters

- `messages`: List of message dictionaries with `role` and `content` keys
- `stream`: Boolean to enable/disable streaming (default: `True`)

### Event Types

| Event Type         | Description                                     |
| ------------------ | ----------------------------------------------- |
| `TEXT_DELTA`       | Partial text content during streaming           |
| `MESSAGE_COMPLETE` | Final message with full content and usage stats |
| `ERROR`            | Error event with error details                  |

### Data Classes

#### `StreamEvent`

```python
@dataclass
class StreamEvent:
    type: EventType
    text_delta: TextDelta | None
    error: str | None
    finish_reason: str | None
    usage: TokenUsage | None
```

#### `TokenUsage`

```python
@dataclass
class TokenUsage:
    prompt_tokens: int
    completion_tokens: int
    total_tokens: int
    cached_tokens: int
```

---

## ⚙️ Configuration

### Environment Variables

| Variable              | Description             | Required | Default                        |
| --------------------- | ----------------------- | -------- | ------------------------------ |
| `OPENROUTER_API_KEY`  | Your OpenRouter API key | ✅       | -                              |
| `MODEL_NAME`          | LLM model to use        | ❌       | `xiaomi/mimo-v2-flash:free`    |
| `OPENROUTER_BASE_URL` | OpenRouter API base URL | ❌       | `https://openrouter.ai/api/v1` |
| `DEBUG`               | Enable debug mode       | ❌       | `true`                         |

### Supported Models

You can use any model available on [OpenRouter](https://openrouter.ai/models), including:

- `xiaomi/mimo-v2-flash:free`
- `tngtech/deepseek-r1t2-chimera:free`
- `openai/gpt-4`
- `anthropic/claude-3-opus`
- And many more...

---

## 🔧 Development

### Using Just (Task Runner)

```bash
# Create virtual environment
just venv
```

### Project Dependencies

```
openai>=1.0.0
python-dotenv>=1.0.0
```

---

## 🛡️ Error Handling

The client includes built-in error handling for:

| Error Type           | Behavior                                       |
| -------------------- | ---------------------------------------------- |
| `RateLimitError`     | Retries up to 3 times with exponential backoff |
| `APIConnectionError` | Retries up to 3 times with exponential backoff |
| `APIError`           | Returns error event immediately                |

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

<div align="center">
  <sub>Built with ❤️ using Python and OpenRouter</sub>
</div>
