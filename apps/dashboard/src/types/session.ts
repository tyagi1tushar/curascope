export interface Session {
  id: string;
  prompt: string;
  provider: string;
  model: string;
  latency: number;
  estimatedCost: number;
  risk: string;
  status: string;
  traceId: string;
  createdAt: string;
}

export interface SessionsResponse {
  sessions: Session[];
  total: number;
  page: number;
  limit: number;
}

export interface SessionDetails {
  _id: string;

  request: {
    prompt: string;
    provider: string;
    model: string;
    temperature: number;
    maxTokens: number;
  };

  response: {
    text: string;
    status: string;
    finishReason: string;
  };

  performance: {
    latency: number;
    providerLatency: number;

    estimatedCost: number;

    tokens: {
      input: number;
      output: number;
      total: number;
    };
  };

  security: {
    score: number;
    risk: string;
    blocked: boolean;
    findings: string[];
  };

  telemetry: {
    traceId: string;
    spanId: string;
    spanName: string;
    serviceName: string;
  };

  events: {
    name: string;
    timestamp: string;
  }[];

  createdAt: string;
}