import { CheckCircle2, Activity, ShieldCheck, Database, ChartColumn, ExternalLink } from "lucide-react";

const capabilities = [
    {
        icon: Activity,
        title: "Distributed Tracing",
        description:
            "Every AI request is instrumented with OpenTelemetry and correlated using trace IDs.",
    },
    {
        icon: ShieldCheck,
        title: "Prompt Security",
        description:
            "Detect prompt injection attempts and classify request risk before model execution.",
    },
    {
        icon: ChartColumn,
        title: "AI Analytics",
        description:
            "Track latency, requests, token usage, and estimated costs from a unified dashboard.",
    },
    {
        icon: Database,
        title: "Session Inspection",
        description:
            "Inspect prompts, responses, telemetry, timelines, and request pipelines for every interaction.",
    },
];

export function Observability() {
    return (
        <section
            id="observability"
            className="mx-auto max-w-7xl px-6 py-28"
        >
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                <div>
                    <p className="font-bold text-cyan-400 text-4xl">
                        Observability
                    </p>

                    <h2 className="mt-5 text-3xl font-semibold">
                        Built for AI operations
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-slate-400">
                        CuraScope combines AI request processing with modern observability,
                        making every interaction traceable, inspectable, and measurable.
                    </p>

                    <div className="mt-10 space-y-4">
                        {[
                            "OpenTelemetry Traces",
                            "SigNoz Integration",
                            "Request Pipeline",
                            "Session Timeline",
                            "Risk Analysis",
                            "Telemetry Viewer",
                        ].map((item) => (
                            <div
                                key={item}
                                className="flex items-center gap-3"
                            >
                                <CheckCircle2
                                    size={20}
                                    className="text-cyan-400"
                                />

                                <span className="text-slate-300">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 inline-flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-cyan-300">
                        <ExternalLink size={18} />
                        Deep link directly from CuraScope to SigNoz traces
                    </div>
                </div>

                <div className="grid gap-5">
                    {capabilities.map(({ title, description, icon: Icon }) => (
                        <div
                            key={title}
                            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
                        >
                            <div className="mb-4 inline-flex rounded-xl bg-cyan-500/10 p-3">
                                <Icon
                                    className="text-cyan-400"
                                    size={22}
                                />
                            </div>

                            <h3 className="text-xl font-semibold">
                                {title}
                            </h3>

                            <p className="mt-3 leading-7 text-slate-400">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}