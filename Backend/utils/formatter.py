import re
from typing import List, Dict


# ==========================================================
# EXTRACT FIELD FROM CONTENT
# ==========================================================

def extract_field(content: str, field: str) -> str:
    """
    Extract value from content.

    Example:
    place-name: Vany Villa Balige
    """

    pattern = rf"{field}:\s*(.+)"

    match = re.search(pattern, content, re.IGNORECASE)

    if match:
        return match.group(1).strip()

    return "-"


# ==========================================================
# FORMAT RETRIEVED CONTEXT
# ==========================================================

def format_context(documents: List[Dict]) -> str:

    if not documents:
        return ""

    formatted_documents = []

    for index, doc in enumerate(documents, start=1):

        content = doc.get("content", "")

        similarity = round(doc.get("similarity", 0), 3)

        metadata = doc.get("metadata", {}) or {}

        source = metadata.get("source")

        # ======================================================
        # FALLBACK SOURCE
        # ======================================================

        if not source:

            source = extract_field(
                content,
                "Sumber"
            )

        place = extract_field(
            content,
            "place-name"
        )

        rating = extract_field(
            content,
            "reviewer-rating"
        )

        review = extract_field(
            content,
            "review-text"
        )

        published = extract_field(
            content,
            "published-at"
        )

        formatted = f"""
==============================
Document {index}
==============================

Source:
{source}

Place:
{place}

Rating:
{rating}

Published:
{published}

Similarity:
{similarity}

Review:
{review}
"""

        formatted_documents.append(
            formatted.strip()
        )

    return "\n\n".join(
        formatted_documents
    )