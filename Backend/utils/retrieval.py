from typing import List, Dict

from config import (
    supabase,
    get_embedding_model
)


# ==========================================================
# RETRIEVE CONTEXT
# ==========================================================

def retrieve_context(
    question: str,
    top_k: int = 5,
    threshold: float = 0.55
) -> List[Dict]:
    """
    Retrieve relevant documents from Supabase using vector similarity.
    """

    embedding_model = get_embedding_model()

    query_embedding = embedding_model.encode(
        question,
        normalize_embeddings=True
    ).tolist()

    response = supabase.rpc(
        "match_documents",
        {
            "query_embedding": query_embedding,
            "match_count": top_k,
            "match_threshold": threshold
        }
    ).execute()

    if response.data is None:
        return []

    return response.data