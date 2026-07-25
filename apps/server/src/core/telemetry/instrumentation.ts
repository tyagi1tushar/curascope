import { NodeSDK } from "@opentelemetry/sdk-node";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { metrics } from "@opentelemetry/api";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { BatchLogRecordProcessor } from "@opentelemetry/sdk-logs";

import { env } from "../config/env";
import { logger } from "../logger/logger";

const telemetryEnabled = !!env.OTEL_EXPORTER_OTLP_ENDPOINT;

const headers =
  env.OTEL_EXPORTER_OTLP_HEADERS?.trim()
    ? {
        "signoz-access-token": env.OTEL_EXPORTER_OTLP_HEADERS.replace(
          "signoz-access-token=",
          ""
        ),
      }
    : undefined;

const sdk = telemetryEnabled
  ? new NodeSDK({
      traceExporter: new OTLPTraceExporter({
        url: `${env.OTEL_EXPORTER_OTLP_ENDPOINT}/v1/traces`,
        headers,
      }),

      metricReader: new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter({
          url: `${env.OTEL_EXPORTER_OTLP_ENDPOINT}/v1/metrics`,
          headers,
        }),
        exportIntervalMillis: 10000,
      }),

      logRecordProcessors: [
        new BatchLogRecordProcessor({
          exporter: new OTLPLogExporter({
            url: `${env.OTEL_EXPORTER_OTLP_ENDPOINT}/v1/logs`,
            headers,
          }),
        }),
      ],

      resource: resourceFromAttributes({
        [SemanticResourceAttributes.SERVICE_NAME]: env.APP_NAME,
        [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]:
          env.NODE_ENV,
      }),

      instrumentations: [getNodeAutoInstrumentations()],
    })
  : null;

export async function startTelemetry() {
  if (!sdk) {
    logger.info("OpenTelemetry disabled");
    return;
  }

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