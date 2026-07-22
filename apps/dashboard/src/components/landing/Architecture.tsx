import { Brain, Database, ShieldCheck, Cloud, Monitor, Activity, } from "lucide-react";

export function Architecture() {
    return (
        <section
            id="architecture"
            className="border-y border-slate-800 bg-slate-900/40 py-28"
        >
            <div className="mx-auto max-w-7xl px-6">
                <div className="text-center">
                    <p className="font-medium text-cyan-400">
                        Architecture
                    </p>

                    <h2 className="mt-3 text-4xl font-bold">
                        AI Request Lifecycle
                    </h2>

                    <p className="mx-auto mt-5 max-w-3xl text-slate-400">
                        CuraScope secures, processes, stores, and observes every AI request
                        through an end-to-end pipeline powered by OpenTelemetry.
                    </p>
                </div>

                <div className="mt-20 flex flex-col items-center">

                    <Node
                        icon={<Monitor size={24} />}
                        title="Client Dashboard"
                        subtitle="React Application"
                    />

                    <Line />

                    <Node
                        icon={<ShieldCheck size={24} />}
                        title="CuraScope Gateway"
                        subtitle="Express API"
                    />

                    <Line />

                    <Node
                        icon={<Brain size={24} />}
                        title="Gemini AI"
                        subtitle="LLM Provider"
                    />

                    <div className="relative mt-12 flex w-full max-w-5xl justify-between">

                        <div className="absolute left-1/2 top-0 h-12 w-px -translate-x-1/2 bg-slate-700" />

                        <div className="absolute left-1/2 top-12 h-px w-[42%] -translate-x-full bg-slate-700" />

                        <div className="absolute left-1/2 top-12 h-px w-[42%] bg-slate-700" />

                        <div className="pt-16">
                            <Node
                                icon={<Database size={24} />}
                                title="MongoDB"
                                subtitle="Sessions & Analytics"
                            />
                        </div>

                        <div className="pt-16">
                            <Node
                                icon={<Activity size={24} />}
                                title="OpenTelemetry"
                                subtitle="Distributed Tracing"
                            />

                            <Line />

                            <Node
                                icon={<Cloud size={24} />}
                                title="SigNoz Cloud"
                                subtitle="Observability"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

interface NodeProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}

function Node({ icon, title, subtitle }: NodeProps) {
    return (
        <div className="flex w-80 items-center gap-5 rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-lg">
            <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
                {icon}
            </div>

            <div>
                <h3 className="font-semibold">
                    {title}
                </h3>

                <p className="text-sm text-slate-400">
                    {subtitle}
                </p>
            </div>
        </div>
    );
}

function Line() {
    return (
        <div className="my-5 h-10 w-px bg-slate-700" />
    );
}