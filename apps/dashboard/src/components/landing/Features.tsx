import { Activity, Brain, ShieldCheck, ChartColumn, Database, Radar } from "lucide-react";

const features = [
    {
        title: "AI Gateway",
        description:
            "Route AI requests through a centralized gateway with unified telemetry.",
        icon: Brain,
    },
    {
        title: "Prompt Security",
        description:
            "Detect prompt injection attempts and classify request risk before execution.",
        icon: ShieldCheck,
    },
    {
        title: "Observability",
        description:
            "Capture distributed traces using OpenTelemetry for every AI interaction.",
        icon: Activity,
    },
    {
        title: "Analytics",
        description:
            "Monitor requests, latency, costs, and token usage from a single dashboard.",
        icon: ChartColumn,
    },
    {
        title: "Session History",
        description:
            "Inspect every AI conversation with telemetry, timelines, and responses.",
        icon: Database,
    },
    {
        title: "SigNoz Integration",
        description:
            "Jump directly from a session into its distributed trace in SigNoz.",
        icon: Radar,
    },
];

export function Features() {
    return (
        <section
            id="features"
            className="mx-auto max-w-7xl px-6 py-28"
        >
            <div className="mb-14 text-center">
            <p className="text-cyan-400 font-bold text-4xl">Features</p>

                <h2 className="mt-5 text-4xl font-bold">
                    Everything you need to observe AI systems
                </h2>

                <p className="mx-auto mt-5 max-w-3xl text-slate-400">
                    CuraScope combines an AI Gateway with modern observability so every
                    request is secure, traceable, and measurable.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {features.map(({ title, description, icon: Icon }) => (
                    <div
                        key={title}
                        className="rounded-2xl border border-slate-800 bg-slate-900/60 p-7 transition hover:border-cyan-500/40"
                    >
                        <div className="mb-5 inline-flex rounded-xl bg-cyan-500/10 p-3">
                            <Icon className="text-cyan-400" size={24} />
                        </div>

                        <h3 className="text-xl font-semibold">
                            {title}
                        </h3>

                        <p className="mt-3 text-slate-400 leading-7">
                            {description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}