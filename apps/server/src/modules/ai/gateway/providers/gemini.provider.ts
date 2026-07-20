import { GoogleGenAI } from "@google/genai";

import { env } from "../../../../core/config/env";
import {
    ChatRequest,
    ProviderResponse,
} from "../gateway.types";

export class GeminiProvider {
    private static readonly client = new GoogleGenAI({
        apiKey: env.GEMINI_API_KEY,
    });

    static async generate(
        request: ChatRequest
    ): Promise<ProviderResponse> {
        console.log("Using model:", request.model);

        const response = await this.client.models.generateContent({
            model: request.model,
            contents: request.prompt,
        });

        return {
            text: response.text ?? "",
            tokens: {
                input: response.usageMetadata?.promptTokenCount ?? 0,
                output: response.usageMetadata?.candidatesTokenCount ?? 0,
                total: response.usageMetadata?.totalTokenCount ?? 0,
            },
        };
    }
}