import type { ReactNode } from "react";
import { Activity, ArrowRight, Brain, Cloud, Database, Monitor, ShieldCheck } from "lucide-react";

const nodes = [
    {
        title: "AI Playground",
        subtitle: "React + Vite",
        icon: <Monitor size={26} />,
        color: "cyan",
    },
    {
        title: "AI Gateway",
        subtitle: "Express API",
        icon: <ShieldCheck size={26} />,
        color: "emerald",
    },
    {
        title: "Prompt Security",
        subtitle: "Risk Assessment",
        icon: <ShieldCheck size={26} />,
        color: "amber",
    },
    {
        title: "Gemini",
        subtitle: "LLM Provider",
        icon: <Brain size={26} />,
        color: "violet",
    },
    {
        title: "MongoDB",
        subtitle: "Sessions",
        icon: <Database size={26} />,
        color: "green",
    },
    {
        title: "OpenTelemetry",
        subtitle: "Traces • Metrics • Logs",
        icon: <Activity size={26} />,
        color: "orange",
    },
    {
        title: "SigNoz",
        subtitle: "Observability",
        icon: <Cloud size={26} />,
        color: "cyan",
    },
];

function HorizontalConnector() {
    return (
        <div className="flex items-center">
            <div className="relative w-6">
                <div className="h-px bg-cyan-400/40" />

                <div className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-400 animate-pulse" />
            </div>

            <ArrowRight
                size={12}
                className="text-cyan-400"
            />
        </div>
    );
}

export function Architecture() {
    return (
        <section
            id="architecture"
            className="relative overflow-hidden border-y border-slate-800 bg-slate-900/40 py-28"
        >
            <div className="absolute inset-0">
                <div className="absolute left-1/2 top-20 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[180px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6">

                <div className="text-center">

                    <p className="font-bold text-cyan-400 text-4xl">
                        Platform Architecture
                    </p>

                    <h2 className="mt-3 text-3xl font-semibold">
                        Observable AI Request Lifecycle
                    </h2>

                    <p className="mx-auto mt-4 max-w-3xl text-slate-400">
                        Every prompt travels through CuraScope's AI Gateway,
                        where it is secured, processed, stored, instrumented,
                        and visualized with complete observability.
                    </p>

                </div>

                <div className="relative mt-20 flex flex-col items-center gap-12">

                    <div className="hidden lg:flex justify-center items-center gap-5">

                        <ArchitectureNode {...nodes[0]} />
                        <HorizontalConnector />

                        <ArchitectureNode {...nodes[1]} />
                        <HorizontalConnector />

                        <ArchitectureNode {...nodes[2]} />
                        <HorizontalConnector />

                        <div className="scale-110">
                            <ArchitectureNode {...nodes[3]} />
                        </div>

                    </div>

                    <div className="flex justify-center">
                        <div className="h-11 w-px bg-gradient-to-b from-cyan-400 via-cyan-500 to-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
                    </div>

                    <div className="flex justify-center">

                        <div className="scale-105">
                            <ArchitectureNode
                                icon={nodes[4].icon}
                                title={nodes[4].title}
                                subtitle={nodes[4].subtitle}
                                color={nodes[4].color}
                            />
                        </div>

                    </div>

                    <div className="relative h-11 w-px bg-cyan-700">

                        <div className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-400 animate-pulse" />

                    </div>

                    <div className="flex flex-wrap justify-center gap-8">

                        <ArchitectureNode {...nodes[5]} />
                        <HorizontalConnector />
                        <ArchitectureNode {...nodes[6]} />

                    </div>

                </div>

                <div className="mt-20 grid gap-4 md:grid-cols-5">

                    <Feature text="AI Request" />
                    <Feature text="Risk Analysis" />
                    <Feature text="Session Storage" />
                    <Feature text="Telemetry Export" />
                    <Feature text="Observability" />

                </div>

            </div>
        </section>
    );
}

interface NodeProps {
    icon: ReactNode;
    title: string;
    subtitle: string;
    color: string;
}

function ArchitectureNode({
    icon,
    title,
    subtitle,
    color,
}: NodeProps) {

    const colors: Record<
        string,
        { bg: string; text: string; border: string }
    > = {
        cyan: {
            bg: "bg-cyan-500/10",
            text: "text-cyan-400",
            border: "hover:border-cyan-500/40",
        },
        emerald: {
            bg: "bg-emerald-500/10",
            text: "text-emerald-400",
            border: "hover:border-emerald-500/40",
        },
        amber: {
            bg: "bg-amber-500/10",
            text: "text-amber-400",
            border: "hover:border-amber-500/40",
        },
        violet: {
            bg: "bg-violet-500/10",
            text: "text-violet-400",
            border: "hover:border-violet-500/40",
        },
        green: {
            bg: "bg-green-500/10",
            text: "text-green-400",
            border: "hover:border-green-500/40",
        },
        orange: {
            bg: "bg-orange-500/10",
            text: "text-orange-400",
            border: "hover:border-orange-500/40",
        },
    };

    const theme = colors[color];

    return (
        <div
            className={`w-56 rounded-2xl border border-slate-800 bg-slate-950 p-4 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] ${theme.border}`}
        >
            <div className={`inline-flex rounded-xl p-3 ${theme.bg} ${theme.text}`}>
                {icon}
            </div>

            <h3 className="mt-4 text-lg font-semibold">
                {title}
            </h3>

            <p className="mt-2 text-sm text-slate-400">
                {subtitle}
            </p>
        </div>
    );
}

function Feature({ text }: { text: string }) {
    return (
        <div className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-center transition hover:border-cyan-500/30">

            <div className="mb-2 flex justify-center">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>

            <p className="text-xs text-slate-300">
                {text}
            </p>

        </div>
    );
}