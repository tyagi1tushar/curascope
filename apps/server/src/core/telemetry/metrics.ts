import { metrics } from "@opentelemetry/api";

const meter = metrics.getMeter("curascope");

console.log(
  "Meter Provider:",
  metrics.getMeterProvider().constructor.name
);

export const aiRequestsCounter = meter.createCounter("ai.requests.total", {
  description: "Total AI requests",
});

export const aiErrorsCounter = meter.createCounter(
  "ai.errors.total",
  {
    description: "Total AI request errors",
  }
);

export const aiInputTokensCounter = meter.createCounter(
  "ai.tokens.input",
  {
    description: "Total input tokens",
  }
);

export const aiOutputTokensCounter = meter.createCounter(
  "ai.tokens.output",
  {
    description: "Total output tokens",
  }
);

export const aiCostCounter = meter.createCounter(
  "ai.cost.estimated",
  {
    description: "Estimated AI cost in USD",
  }
);

export const aiLatencyHistogram = meter.createHistogram(
  "ai.latency",
  {
    description: "AI request latency",
    unit: "ms",
  }
);

export const aiSecurityCounter = meter.createCounter(
  "ai.security.requests.total",
  {
    description: "AI requests grouped by security risk",
  }
);