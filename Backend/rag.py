from prompts.system_prompt import SYSTEM_PROMPT

from utils.retrieval import retrieve_context
from utils.formatter import format_context


# ==========================================================
# BUILD PROMPT
# ==========================================================

def build_prompt(question: str):

    contexts = retrieve_context(question)

    if len(contexts) == 0:
        return None, 0

    formatted_context = format_context(contexts)

    prompt = f"""
{SYSTEM_PROMPT}

=========================================================
CONTEXT
=========================================================

{formatted_context}

=========================================================
QUESTION
=========================================================

{question}

=========================================================
INSTRUCTIONS
=========================================================

Before answering:

1. Read every retrieved document carefully before answering.

2. Combine similar information.

3. Do not repeat information.

4. Never copy reviews word-for-word.

5. Rewrite naturally.

6. Explain like a professional tourism consultant.

7. Mention ratings naturally when available.

8. If multiple places are relevant:

- Use bullet points.
- Explain why each place is recommended.

9. Never mention:

- Context
- Database
- RAG
- Embedding
- Metadata
- Supabase

10. If information is unavailable, clearly state that the information is not available in the Toba Infinity knowledge base.
11. Prefer facts that appear consistently across multiple retrieved documents.

12. If ratings differ between documents, mention that ratings may vary.

13. Never expose similarity scores.

14. Never expose internal document numbering.

15. Always synthesize information naturally instead of copying sentences.
=========================================================
ANSWER
=========================================================
"""

    return prompt, len(contexts)