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

export interface ISessionEvent {
  name: string;
  timestamp: Date;
}

export interface IAISession {
  request: {
    prompt: string;
    provider: AIProvider;
    model: string;
    temperature?: number;
    maxTokens?: number;
  };

  response: {
    text: string;
    status: SessionStatus;
    finishReason?: string;
  };

  performance: {
    latency?: number;
    providerLatency?: number;
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
    blocked?: boolean;
    findings: string[];
  };

  events?: {
    name: string;
    timestamp: Date;
  }[];

  createdAt: Date;
  updatedAt: Date;
}