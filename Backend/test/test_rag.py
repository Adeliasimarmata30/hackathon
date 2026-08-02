import sys
import os

sys.path.append(
    os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))
    )
)

from rag import build_prompt

prompt, total = build_prompt(
    "Hotel terbaik di Balige"
)

print("Retrieved :", total)
print()
print(prompt)