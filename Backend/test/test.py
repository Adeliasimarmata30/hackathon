import sys
import os

sys.path.append(
    os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))
    )
)

from utils.retrieval import retrieve_context

docs = retrieve_context("Hotel terbaik di Balige")

print(len(docs))
print(docs)