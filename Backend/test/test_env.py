import os
from dotenv import load_dotenv

# Membaca file .env
load_dotenv()

print("=" * 40)
print("TEST ENVIRONMENT")
print("=" * 40)

print("SUPABASE_URL:")
print(os.getenv("SUPABASE_URL"))

print()

print("GEMINI_API_KEY:")
print(os.getenv("GEMINI_API_KEY"))

print()

print("GROQ_API_KEY:")
print(os.getenv("GROQ_API_KEY"))

print()

print("OPENROUTER_API_KEY:")
print(os.getenv("OPENROUTER_API_KEY"))