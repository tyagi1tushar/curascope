export type AIProvider =
  | "gemini"
  | "openai"
  | "claude"
  | "grok"
  | "ollama"
  | "deepseek"
  | "other";

export type SessionStatus = "success" | "error";

export type SecurityRisk = "low" | "medium" | "high";

export interface IAISession {
  request: {
    prompt: string;
    provider: AIProvider;
    model: string;
  };

  response: {
    text: string;
    status: SessionStatus;
  };

  performance: {
    latency?: number;
    tokens?: {
      input?: number;
      output?: number;
      total?: number;
    };
    estimatedCost?: number;
  };

 telemetry: {
    traceId?: string;
    spanId?: string;
    spanName?: string;
    serviceName?: string;
};

  security: {
    score: number;
    risk: SecurityRisk;
    findings: string[];
  };

  createdAt: Date;
  updatedAt: Date;
}