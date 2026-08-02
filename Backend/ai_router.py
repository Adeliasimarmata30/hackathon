import time
from google.genai.errors import ClientError

from config import (
    gemini,
    groq,
    openrouter,
    PRIMARY_MODEL,
    GROQ_MODEL,
    OPENROUTER_MODEL
)


# ==========================================================
# AI ROUTER
# ==========================================================

def generate_answer(prompt: str):

    # ======================================================
    # GEMINI
    # ======================================================

    try:

        start = time.time()

        response = gemini.models.generate_content(
            model=PRIMARY_MODEL,
            contents=prompt
        )

        end = time.time()

        print("=" * 60)
        print("Provider : Gemini")
        print(f"Model    : {PRIMARY_MODEL}")
        print("Status   : SUCCESS")
        print(f"Time     : {end-start:.2f} sec")
        print("=" * 60)

        return {
            "answer": response.text,
            "provider": "Gemini",
            "model": PRIMARY_MODEL,
            "status": "success",
            "response_time": round(end - start, 2)
        }

    except ClientError as e:

        print("=" * 60)
        print("PRIMARY MODEL FAILED")
        print("Provider : Gemini")
        print(f"Model    : {PRIMARY_MODEL}")
        print(f"Error    : {e}")
        print("=" * 60)

    except Exception as e:

        print("=" * 60)
        print("PRIMARY MODEL FAILED")
        print("Provider : Gemini")
        print(f"Model    : {PRIMARY_MODEL}")
        print(f"Error    : {e}")
        print("=" * 60)

    # ======================================================
    # GROQ
    # ======================================================

    try:

        start = time.time()

        response = groq.chat.completions.create(
            model=GROQ_MODEL,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.2
        )

        end = time.time()

        print("=" * 60)
        print("Provider : Groq")
        print(f"Model    : {GROQ_MODEL}")
        print("Status   : SUCCESS")
        print(f"Time     : {end-start:.2f} sec")
        print("=" * 60)

        return {
            "answer": response.choices[0].message.content,
            "provider": "Groq",
            "model": GROQ_MODEL,
            "status": "success",
            "response_time": round(end - start, 2)
        }

    except Exception as e:

        print("=" * 60)
        print("FALLBACK MODEL FAILED")
        print("Provider : Groq")
        print(f"Model    : {GROQ_MODEL}")
        print(f"Error    : {e}")
        print("=" * 60)

    # ======================================================
    # OPENROUTER
    # ======================================================

    try:

        start = time.time()

        response = openrouter.chat.completions.create(
            model=OPENROUTER_MODEL,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.2
        )

        end = time.time()

        print("=" * 60)
        print("Provider : OpenRouter")
        print(f"Model    : {OPENROUTER_MODEL}")
        print("Status   : SUCCESS")
        print(f"Time     : {end-start:.2f} sec")
        print("=" * 60)

        return {
            "answer": response.choices[0].message.content,
            "provider": "OpenRouter",
            "model": OPENROUTER_MODEL,
            "status": "success",
            "response_time": round(end - start, 2)
        }

    except Exception as e:

        print("=" * 60)
        print("LAST FALLBACK FAILED")
        print("Provider : OpenRouter")
        print(f"Model    : {OPENROUTER_MODEL}")
        print(f"Error    : {e}")
        print("=" * 60)

    # ======================================================
    # ALL FAILED
    # ======================================================

    return {
        "answer": (
            "Maaf, layanan AI sedang tidak tersedia. "
            "Silakan coba kembali beberapa saat lagi."
        ),
        "provider": "Unavailable",
        "model": None,
        "status": "failed",
        "response_time": None
    }