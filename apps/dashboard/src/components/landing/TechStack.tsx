import { Atom, Server, Database, BarChart3, Activity, Brain, Shield, Cloud } from "lucide-react";

const stack = [
    {
        name: "React",
        description: "Frontend",
        icon: Atom,
    },
    {
        name: "Express",
        description: "Backend API",
        icon: Server,
    },
    {
        name: "MongoDB",
        description: "Database",
        icon: Database,
    },
    {
        name: "Gemini",
        description: "AI Provider",
        icon: Brain,
    },
    {
        name: "OpenTelemetry",
        description: "Distributed Tracing",
        icon: Activity,
    },
    {
        name: "SigNoz",
        description: "Observability",
        icon: Cloud,
    },
    {
        name: "Tailwind CSS",
        description: "UI Framework",
        icon: Shield,
    },
    {
        name: "Recharts",
        description: "Analytics",
        icon: BarChart3,
    },
];

export function TechStack() {
    return (
        <section
            id="tech-stack"
            className="border-y border-slate-800 bg-slate-900/40 py-28"
        >
            <div className="mx-auto max-w-7xl px-6">
                <div className="text-center">
                    <p className="font-bold text-cyan-400 text-4xl">
                        Technology Stack
                    </p>

                    <h2 className="mt-5 text-3xl font-semibold">
                        Built with modern developer tools
                    </h2>

                    <p className="mx-auto mt-5 max-w-3xl text-slate-400">
                        CuraScope combines proven technologies to build a secure,
                        observable, and production-ready AI Gateway.
                    </p>
                </div>

                <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {stack.map(({ name, description, icon: Icon }) => (
                        <div
                            key={name}
                            className="rounded-2xl border border-slate-800 bg-slate-950 p-6 transition hover:border-cyan-500/40 hover:-translate-y-1"
                        >
                            <div className="mb-5 inline-flex rounded-xl bg-cyan-500/10 p-3">
                                <Icon
                                    className="text-cyan-400"
                                    size={24}
                                />
                            </div>

                            <h3 className="text-lg font-semibold">
                                {name}
                            </h3>

                            <p className="mt-2 text-sm text-slate-400">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}