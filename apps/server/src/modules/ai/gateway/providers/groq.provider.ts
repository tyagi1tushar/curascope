import Groq from "groq-sdk";

import { env } from "../../../../core/config/env";
import { ChatRequest, ProviderResponse } from "../gateway.types";

export class GroqProvider {
    private static readonly client = new Groq({
        apiKey: env.GROQ_API_KEY,
        timeout: 30_000,
        maxRetries: 1,
    });

    static async generate(
        request: ChatRequest
    ): Promise<ProviderResponse> {
        const response = await this.client.chat.completions.create({
            model: request.model,
            messages: [
                {
                    role: "user",
                    content: request.prompt,
                },
            ],
        });

        const usage = response.usage;

        return {
            text: response.choices[0]?.message?.content ?? "",
            tokens: {
                input: usage?.prompt_tokens ?? 0,
                output: usage?.completion_tokens ?? 0,
                total: usage?.total_tokens ?? 0,
            },
        };
    }
}