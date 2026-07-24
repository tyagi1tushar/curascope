import { NodeSDK } from "@opentelemetry/sdk-node";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { metrics } from "@opentelemetry/api";

import { env } from "../config/env";
import { logger } from "../logger/logger";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { BatchLogRecordProcessor } from "@opentelemetry/sdk-logs/build/src/platform/node/export/BatchLogRecordProcessor";

const headers =
  env.OTEL_EXPORTER_OTLP_HEADERS?.trim()
    ? {
        "signoz-access-token":
          env.OTEL_EXPORTER_OTLP_HEADERS.replace(
            "signoz-access-token=",
            ""
          ),
      }
    : undefined;

const traceExporter = new OTLPTraceExporter({
  url: `${env.OTEL_EXPORTER_OTLP_ENDPOINT}/v1/traces`,
  headers,
});

const metricExporter = new OTLPMetricExporter({
  url: `${env.OTEL_EXPORTER_OTLP_ENDPOINT}/v1/metrics`,
  headers,
});

const logExporter = new OTLPLogExporter({
  url: `${env.OTEL_EXPORTER_OTLP_ENDPOINT}/v1/logs`,
  headers,
});

const metricReader = new PeriodicExportingMetricReader({
  exporter: metricExporter,
  exportIntervalMillis: 10000,
});

export const sdk = new NodeSDK({
  traceExporter,
  metricReader,

  logRecordProcessors: [
    new BatchLogRecordProcessor({
      exporter: logExporter,
    }),
  ],

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

    console.log(
      "Meter Provider:",
      metrics.getMeterProvider().constructor.name
    );

    logger.info("✅ OpenTelemetry initialized");
  } catch (error) {
    logger.error(error, "Failed to initialize OpenTelemetry");
  }
}