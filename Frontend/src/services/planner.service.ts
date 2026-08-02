import type {
    PlannerRequest,
    PlannerResponse
} from "../types/planner";

const API_URL = "http://127.0.0.1:8000";

// ==========================================
// GENERATE TRIP
// ==========================================

export async function generateTrip(
    payload: PlannerRequest
): Promise<PlannerResponse> {

    const response = await fetch(
        `${API_URL}/trip-planner`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to generate itinerary.");
    }

    return response.json();
}

// ==========================================
// GET DESTINATION NAMES
// ==========================================

export async function getDestinationNames(): Promise<string[]> {

    const response = await fetch(
        `${API_URL}/destination-names`
    );

    if (!response.ok) {
        throw new Error("Failed to load destinations.");
    }

    return response.json();
}