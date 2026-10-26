import { AIProvider } from "../../sessions/session.types";

type Pricing = {
  input: number;
  output: number;
};

const PRICING: Record<string, Pricing> = {
  "groq:openai/gpt-oss-20b": {
    input: 0.075,
    output: 0.30,
  },
};

export class CostEstimator {
  static estimate(
    provider: AIProvider,
    model: string,
    inputTokens: number,
    outputTokens: number
  ): number {
    const pricing = PRICING[`${provider}:${model}`];

    if (!pricing) {
      throw new Error(
        `Pricing unavailable for provider "${provider}" and model "${model}"`
      );
    }

    const inputCost = (inputTokens / 1_000_000) * pricing.input;
    const outputCost = (outputTokens / 1_000_000) * pricing.output;

    return Number((inputCost + outputCost).toFixed(6));
  }
}