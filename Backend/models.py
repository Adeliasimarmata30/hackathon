from typing import Optional, Dict
from pydantic import BaseModel, Field


# ==========================================================
# CHAT REQUEST
# ==========================================================

class ChatRequest(BaseModel):

    question: str = Field(
        ...,
        min_length=3,
        max_length=1000,
        description="User question"
    )


# ==========================================================
# RETRIEVED DOCUMENT
# ==========================================================

class RetrievedContext(BaseModel):

    content: str

    similarity: float

    metadata: Optional[Dict] = None


# ==========================================================
# CHAT RESPONSE
# ==========================================================

class ChatResponse(BaseModel):

    answer: str

    provider: str

    model: Optional[str] = None

    status: str

    response_time: Optional[float] = None

    retrieved_documents: int


# ==========================================================
# HEALTH RESPONSE
# ==========================================================

class HealthResponse(BaseModel):

    status: str

    message: str

# ==========================================================
# TRIP PLANNER REQUEST
# ==========================================================

class PlannerRequest(BaseModel):

    destination: str = Field(
        ...,
        min_length=2,
        description="Selected tourist destination"
    )

    duration: int = Field(
        ...,
        ge=1,
        le=5,
        description="Trip duration in days"
    )

    budget: int = Field(
        ...,
        ge=0,
        description="Maximum budget per night in Rupiah, e.g. 700000"
    )

    hotel_rating: int = Field(
        ...,
        ge=0,
        le=5,
        description="Preferred hotel rating (0 = no hotel)"
    )


# ==========================================================
# TRIP PLANNER RESPONSE
# ==========================================================

class PlannerResponse(BaseModel):

    itinerary: str

    provider: str

    model: Optional[str] = None

    status: str

    response_time: Optional[float] = None