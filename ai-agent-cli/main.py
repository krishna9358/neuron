from client.llm_client import LLMClient
import asyncio
from dotenv import load_dotenv


load_dotenv()

async def main():
    client = LLMClient()
    messages = [{
        "role": "user",
        "content": "what's up?"
    }]
    async for event in client.chat_completion(messages=messages, stream=False):
        print(event)
    print("done")

asyncio.run(main())  