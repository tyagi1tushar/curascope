import { logs, SeverityNumber } from "@opentelemetry/api-logs";
import { context, trace } from "@opentelemetry/api";

const otelLogger = logs.getLogger("curascope");

type AttributeValue = string | number | boolean;

type Attributes = Record<string, AttributeValue>;

function emit(
    severityNumber: SeverityNumber,
    severityText: string,
    event: string,
    attributes: Attributes = {}
) {
    otelLogger.emit({
        severityNumber,
        severityText,
        body: event,
        attributes: {
            ...getTraceAttributes(),
            ...attributes,
        },
    });
}

function getTraceAttributes(): Attributes {
    const span = trace.getSpan(context.active());

    if (!span) {
        return {};
    }

    const spanContext = span.spanContext();

    return {
        traceId: spanContext.traceId,
        spanId: spanContext.spanId,
    };
}

export const observability = {
    info(event: string, attributes?: Attributes) {
        emit(SeverityNumber.INFO, "INFO", event, attributes);
    },

    warn(event: string, attributes?: Attributes) {
        emit(SeverityNumber.WARN, "WARN", event, attributes);
    },

    error(event: string, attributes?: Attributes) {
        emit(SeverityNumber.ERROR, "ERROR", event, attributes);
    },
};