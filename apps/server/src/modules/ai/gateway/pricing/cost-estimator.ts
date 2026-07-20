import { AIProvider } from "../../sessions/session.types";

type Pricing = {
  input: number;
  output: number;
};

const PRICING: Record<string, Pricing> = {
  "gemini:gemini-2.5-flash": {
    input: 0.3,
    output: 2.5,
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
      return 0;
    }

    const inputCost = (inputTokens / 1_000_000) * pricing.input;
    const outputCost = (outputTokens / 1_000_000) * pricing.output;

    return Number((inputCost + outputCost).toFixed(6));
  }
}