import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";

import { env } from "../config/env";
import { logger } from "../logger/logger";

const traceExporter = new OTLPTraceExporter({
  url: `${env.OTEL_EXPORTER_OTLP_ENDPOINT}/v1/traces`,

  headers: {
    "signoz-access-token":
      env.OTEL_EXPORTER_OTLP_HEADERS.replace(
        "signoz-access-token=",
        ""
      ),
  },
});

export const sdk = new NodeSDK({
  traceExporter,

  resource: resourceFromAttributes({
    [SemanticResourceAttributes.SERVICE_NAME]: env.APP_NAME,
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]:
      env.NODE_ENV,
  }),

  instrumentations: [getNodeAutoInstrumentations()],
});

export async function startTelemetry() {
  try {
    await sdk.start();
    logger.info("✅ OpenTelemetry initialized");
  } catch (error) {
    logger.error(error, "Failed to initialize OpenTelemetry");
  }
}