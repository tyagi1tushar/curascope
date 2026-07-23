import { api } from "./client";

export interface GenerateRequest {
    prompt: string;
    provider: string;
    model: string;
}

export interface GenerateResponse {
    text: string;
    provider: string;
    model: string;
    latency: number;
    estimatedCost: number;
    traceId: string;
    sessionId: string;

    tokens: {
        input: number;
        output: number;
        total: number;
    };

    security: {
        score: number;
        risk: string;
        findings: string[];
    };
}

export const ChatApi = {
    async generate(
        payload: GenerateRequest
    ): Promise<GenerateResponse> {
        const { data } = await api.post("/ai/chat", payload);

        return data.data;
    },
};