from functools import lru_cache
import os

from dotenv import load_dotenv

from sentence_transformers import SentenceTransformer
from supabase import create_client, Client

from google import genai
from groq import Groq
from openai import OpenAI


# ==========================================================
# LOAD ENVIRONMENT
# ==========================================================

load_dotenv()


# ==========================================================
# API KEYS
# ==========================================================

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SECRET_KEY = os.getenv("SUPABASE_SECRET_KEY")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")


# ==========================================================
# MODEL CONFIGURATION
# ==========================================================

PRIMARY_MODEL = "gemini-2.5-flash"

GROQ_MODEL = "llama-3.3-70b-versatile"

OPENROUTER_MODEL = "nvidia/nemotron-3-ultra-550b-a55b:free"


# ==========================================================
# CLIENTS
# ==========================================================

supabase: Client = create_client(
    SUPABASE_URL,
    SUPABASE_SECRET_KEY
)

gemini = genai.Client(
    api_key=GEMINI_API_KEY
)

groq = Groq(
    api_key=GROQ_API_KEY
)

openrouter = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY
)


# ==========================================================
# EMBEDDING MODEL
# ==========================================================

@lru_cache(maxsize=1)
def get_embedding_model():

    return SentenceTransformer(
        "Qwen/Qwen3-Embedding-0.6B",
        trust_remote_code=True
    )