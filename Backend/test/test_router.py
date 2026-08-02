import sys
import os

ROOT = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        ".."
    )
)

if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

import time

from rag import build_prompt
from ai_router import generate_answer

print("=" * 60)
print("TOBA INFINITY AI ROUTER TEST")
print("=" * 60)

question = "Hotel terbaik di Balige"

prompt, total = build_prompt(question)

print(f"Question             : {question}")
print(f"Retrieved Documents  : {total}")

result = generate_answer(prompt)

print("\nProvider")
print(result["provider"])

print("\nModel")
print(result["model"])

print("\nStatus")
print(result["status"])

print("\nResponse Time")
print(result["response_time"], "sec")

print("\nAnswer")
print("-" * 60)
print(result["answer"])