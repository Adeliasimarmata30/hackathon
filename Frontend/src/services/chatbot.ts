import api from "./api";

export interface ChatResponse {
  answer: string;
  provider: string;
  model: string;
  status: string;
  response_time: number;
  retrieved_documents: number;
}

export async function askAI(question: string): Promise<ChatResponse> {
  const response = await api.post<ChatResponse>("/chat", {
    question,
  });

  return response.data;
}