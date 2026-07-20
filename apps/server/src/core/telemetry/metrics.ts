import { metrics } from "@opentelemetry/api";

const meter = metrics.getMeter("curascope");

console.log("Recording AI metrics");

export const aiRequestsCounter = meter.createCounter("ai.requests", {
  description: "Total AI requests",
});

export const aiErrorsCounter = meter.createCounter(
  "ai_errors_total",
  {
    description: "Total AI request errors",
  }
);

export const aiInputTokensCounter = meter.createCounter(
  "ai_input_tokens_total",
  {
    description: "Total input tokens",
  }
);

export const aiOutputTokensCounter = meter.createCounter(
  "ai_output_tokens_total",
  {
    description: "Total output tokens",
  }
);

export const aiCostCounter = meter.createCounter(
  "ai_estimated_cost_total",
  {
    description: "Estimated AI cost in USD",
  }
);

export const aiLatencyHistogram = meter.createHistogram(
  "ai_latency_ms",
  {
    description: "AI request latency",
    unit: "ms",
  }
);