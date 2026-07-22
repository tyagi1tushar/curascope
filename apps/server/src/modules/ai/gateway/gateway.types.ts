import { AIProvider } from "../sessions/session.types";

export interface ChatRequest {
  prompt: string;
  provider: AIProvider;
  model: string;
}

export interface TokenUsage {
  input: number;
  output: number;
  total: number;
}

export interface SecurityResult {
  score: number;
  risk: "low" | "medium" | "high";
  findings: string[];
}

export interface ProviderResponse {
  text: string;
  tokens: TokenUsage;
}

export interface ChatResponse {
  text: string;
  provider: string;
  model: string;

  latency: number;

  tokens: {
    input: number;
    output: number;
    total: number;
  };

  estimatedCost: number;

  security: {
    score: number;
    risk: string;
    findings: string[];
  };

  traceId: string;

  sessionId: string;
}