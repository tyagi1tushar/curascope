import { Copy, X } from "lucide-react";

import { Card } from "../ui/Card";

import { useSessionDetails } from "../../hooks/useSessionDetails";
import { RequestPipeline } from "./RequestPipeline";

import { formatLatency } from "../../utils/formatLatency";
import { formatCost } from "../../utils/formatCost";
import { SessionTimeline } from "./SessionTimeline";
import { SessionResponse } from "./SessionResponse";

import { StatusBadge } from "./StatusBadge";
import { RiskBadge } from "./RiskBadge";

type Props = {
    sessionId: string | null;
    onClose: () => void;
};

function MetricCard({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">

            <p className="text-xs uppercase tracking-wide text-slate-300">
                {label}
            </p>

            <p className="mt-2 text-2xl font-bold">
                {value}
            </p>

        </div>
    );
}

export function SessionDrawer({
    sessionId,
    onClose,
}: Props) {
    const { data, isLoading } = useSessionDetails(sessionId);

    if (!sessionId) return null;

    const { traceId, spanId } = data?.telemetry ?? {};

    let signozTraceUrl = null;

    if (traceId && spanId) {
        signozTraceUrl = `${import.meta.env.VITE_SIGNOZ_URL}/trace/${traceId}?levelUp=0&levelDown=0&spanId=${spanId}`;
    }
    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">

            <div className="h-full w-full max-w-xl overflow-y-auto border-l border-slate-800 bg-[#0F172A] p-6 shadow-2xl">

                <div className="mb-8 flex items-center justify-between">

                    <div>
                        <h2 className="text-2xl font-bold">
                            Session Details
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                            AI Request Inspector
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 transition hover:bg-slate-800"
                    >
                        <X />
                    </button>

                </div>

                {isLoading && (
                    <p className="text-slate-400">
                        Loading session...
                    </p>
                )}

                {data && (
                    <div className="space-y-5">

                        <div className="flex gap-3">
                            <StatusBadge
                                status={data.response.status}
                            />

                            <RiskBadge
                                risk={data.security.risk}
                            />
                        </div>

                        <Card>

                            <div className="grid grid-cols-2 gap-4">

                                <MetricCard
                                    label="Latency"
                                    value={formatLatency(data.performance.latency)}
                                />

                                <MetricCard
                                    label="Tokens"
                                    value={data.performance.tokens.total.toString()}
                                />

                                <MetricCard
                                    label="Cost"
                                    value={formatCost(data.performance.estimatedCost)}
                                />

                                <MetricCard
                                    label="Risk"
                                    value={data.security.risk.toUpperCase()}
                                />

                            </div>

                        </Card>

                        <Card>

                            <div className="flex items-center justify-between">

                                <div>

                                    <h3 className="font-semibold">
                                        Prompt
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-400">
                                        User input sent to the AI Gateway
                                    </p>

                                </div>

                                <button
                                    onClick={() =>
                                        navigator.clipboard.writeText(data.request.prompt)
                                    }
                                    className="rounded-lg bg-slate-800 p-2 transition hover:bg-slate-700"
                                >
                                    <Copy size={16} />
                                </button>

                            </div>

                            <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-4">

                                <p className="whitespace-pre-wrap leading-7">
                                    {data.request.prompt}
                                </p>

                            </div>

                            <p className="mt-3 text-right text-xs text-slate-500">
                                {data.request.prompt.length} characters
                            </p>

                        </Card>

                        <Card>

                            <div className="grid grid-cols-2 gap-6">

                                <div>
                                    <p className="text-sm text-slate-400">
                                        Provider
                                    </p>

                                    <p className="mt-1 capitalize">
                                        {data.request.provider}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-slate-400">
                                        Model
                                    </p>

                                    <p className="mt-1">
                                        {data.request.model}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-slate-400">
                                        Service
                                    </p>

                                    <p className="mt-1">
                                        {data.telemetry.serviceName}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-slate-400">
                                        Span
                                    </p>

                                    <p className="mt-1">
                                        {data.telemetry.spanName}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-slate-400">
                                        Latency
                                    </p>

                                    <p className="mt-1">
                                        {formatLatency(
                                            data.performance.latency
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-slate-400">
                                        Estimated Cost
                                    </p>

                                    <p className="mt-1">
                                        {formatCost(
                                            data.performance.estimatedCost
                                        )}
                                    </p>
                                </div>

                            </div>

                        </Card>

                        <Card>

                            <h3 className="mb-4 font-semibold">
                                Tokens
                            </h3>

                            <div className="grid grid-cols-3 gap-6">

                                <div>
                                    <p className="text-sm text-slate-400">
                                        Input
                                    </p>

                                    <p className="mt-1 text-xl font-semibold">
                                        {data.performance.tokens.input}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-slate-400">
                                        Output
                                    </p>

                                    <p className="mt-1 text-xl font-semibold">
                                        {data.performance.tokens.output}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-slate-400">
                                        Total
                                    </p>

                                    <p className="mt-1 text-xl font-semibold">
                                        {data.performance.tokens.total}
                                    </p>
                                </div>

                            </div>

                        </Card>

                        <Card>

                            <div className="flex items-start justify-between">

                                <div>

                                    <h3 className="font-semibold">
                                        Telemetry
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-400">
                                        OpenTelemetry trace information
                                    </p>

                                </div>

                                <button
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            data.telemetry.traceId
                                        )
                                    }
                                    className="rounded-lg bg-slate-800 p-2 transition hover:bg-slate-700"
                                >
                                    <Copy size={18} />
                                </button>

                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-5">

                                <div>
                                    <p className="text-sm text-slate-400">
                                        Provider
                                    </p>

                                    <p className="mt-1 capitalize">
                                        {data.request.provider}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-slate-400">
                                        Model
                                    </p>

                                    <p className="mt-1 break-all">
                                        {data.request.model}
                                    </p>
                                </div>

                                <div className="col-span-2">

                                    <p className="text-sm text-slate-400">
                                        Trace ID
                                    </p>

                                    <p className="mt-1 break-all font-mono text-xs text-slate-300">
                                        {data.telemetry.traceId}
                                    </p>

                                </div>

                                <div className="col-span-2">

                                    <p className="text-sm text-slate-400">
                                        Span ID
                                    </p>

                                    <p className="mt-1 break-all font-mono text-xs text-slate-300">
                                        {data.telemetry.spanId}
                                    </p>

                                </div>

                                <div>
                                    <p className="text-sm text-slate-400">
                                        Latency
                                    </p>

                                    <p className="mt-1">
                                        {formatLatency(data.performance.latency)}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-slate-400">
                                        Export Status
                                    </p>

                                    <span className="mt-1 inline-flex rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
                                        Exported
                                    </span>
                                </div>

                            </div>

                            <div className="mt-6 flex gap-3">

                                <button
                                    onClick={() =>
                                        navigator.clipboard.writeText(data.telemetry.traceId)
                                    }
                                    className="rounded-lg bg-slate-800 px-4 py-2 text-sm transition hover:bg-slate-700"
                                >
                                    Copy Trace
                                </button>

                                {signozTraceUrl && (
                                    <a
                                        href={signozTraceUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-500"
                                    >
                                        View Trace in SigNoz ↗
                                    </a>
                                )}

                            </div>

                        </Card>

                        <Card>

                            <h3 className="mb-4 font-semibold">
                                Security
                            </h3>

                            <div className="grid grid-cols-3 gap-6">

                                <div>

                                    <p className="text-sm text-slate-400">
                                        Score
                                    </p>

                                    <p className="mt-1 text-xl font-semibold">
                                        {data.security.score}
                                    </p>

                                </div>

                                <div>

                                    <p className="text-sm text-slate-400">
                                        Risk
                                    </p>

                                    <RiskBadge
                                        risk={data.security.risk}
                                    />

                                </div>

                                <div>

                                    <p className="text-sm text-slate-400">
                                        Blocked
                                    </p>

                                    <p className="mt-1">
                                        {data.security.blocked
                                            ? "Yes"
                                            : "No"}
                                    </p>

                                </div>

                            </div>

                        </Card>

                        <Card>

                            <RequestPipeline />

                        </Card>

                        <Card>

                            <SessionTimeline
                                events={data.events}
                            />

                        </Card>

                        <Card>

                            <SessionResponse
                                response={data.response.text}
                            />

                        </Card>

                    </div>
                )}

            </div>

        </div>
    );
}