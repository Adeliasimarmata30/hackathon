export interface PlannerRequest {
    destination: string;
    duration: number;
    budget: number;
    hotel_rating: number;
}

export interface PlannerResponse {
    itinerary: string;
    provider: string;
    model: string | null;
    status: string;
    response_time: number | null;
}