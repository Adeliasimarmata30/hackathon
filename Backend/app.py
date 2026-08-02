from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models import (
    ChatRequest,
    ChatResponse,
    HealthResponse,
    PlannerRequest,
    PlannerResponse
)

from rag import build_prompt
from ai_router import generate_answer
from planner import (
    get_destinations,
    get_destination_names,
    get_hotels,
    get_restaurants,
)
from planner_engine import build_trip_prompt
# ==========================================================
# FASTAPI APP
# ==========================================================

app = FastAPI(
    title="TOBA INFINITY AI API",
    description="AI-powered Smart Tourism API for Lake Toba",
    version="1.0.0"
)


# ==========================================================
# CORS
# ==========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================================
# ROOT
# ==========================================================

@app.get("/")
def root():
    return {
        "message": "TOBA INFINITY AI Backend is running."
    }


# ==========================================================
# HEALTH CHECK
# ==========================================================

@app.get(
    "/health",
    response_model=HealthResponse
)
def health():

    return HealthResponse(
        status="OK",
        message="Backend is running."
    )


# ==========================================================
# CHAT
# ==========================================================

@app.post(
    "/chat",
    response_model=ChatResponse
)
def chat(request: ChatRequest):

    prompt, retrieved = build_prompt(request.question)

    if prompt is None:

        return ChatResponse(
            answer=(
                "Maaf, saya tidak menemukan informasi yang relevan "
                "pada basis pengetahuan Toba Infinity."
            ),
            provider="Knowledge Base",
            model=None,
            status="not_found",
            response_time=None,
            retrieved_documents=0
        )

    result = generate_answer(prompt)

    return ChatResponse(
        answer=result["answer"],
        provider=result["provider"],
        model=result["model"],
        status=result["status"],
        response_time=result["response_time"],
        retrieved_documents=retrieved
    )

# ==========================================================
# DESTINATIONS
# ==========================================================

@app.get("/destinations")
def destinations():

    return get_destinations()

# ==========================================================
# DESTINATION NAMES
# ==========================================================

@app.get("/destination-names")
def destination_names():

    return get_destination_names()

# ==========================================================
# HOTELS
# ==========================================================

@app.get("/hotels")
def hotels():

    return get_hotels()

# ==========================================================
# HOTELS
# ==========================================================

@app.get("/hotels")
def hotels():

    return get_hotels()

# ==========================================================
# TRIP PLANNER
# ==========================================================

@app.post(
    "/trip-planner",
    response_model=PlannerResponse
)
def trip_planner(request: PlannerRequest):

    prompt = build_trip_prompt(

        destination=request.destination,
        duration=request.duration,
        budget=request.budget,
        hotel_rating=request.hotel_rating

    )


    # ======================================================
    # VALIDASI PROMPT
    # ======================================================

    if not prompt:

        return PlannerResponse(

            itinerary="Destination not found or prompt could not be generated.",

            provider="Planner",

            model=None,

            status="failed",

            response_time=None

        )

    # ======================================================
    # DEBUG
    # ======================================================

    print("=" * 60)
    print(prompt)
    print("=" * 60)

    # ======================================================
    # GENERATE AI
    # ======================================================

    result = generate_answer(prompt)

    return PlannerResponse(

        itinerary=result["answer"],

        provider=result["provider"],

        model=result["model"],

        status=result["status"],

        response_time=result["response_time"]

    )