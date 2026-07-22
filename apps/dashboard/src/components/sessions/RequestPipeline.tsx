import { Brain, Database, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";

const steps = [
    {
        icon: MessageSquare,
        title: "Prompt Received",
        description: "Incoming AI request",
    },
    {
        icon: ShieldCheck,
        title: "Security Scan",
        description: "Prompt analyzed",
    },
    {
        icon: Sparkles,
        title: "Gemini Processing",
        description: "Model generated response",
    },
    {
        icon: Brain,
        title: "Response Ready",
        description: "Returned to client",
    },
    {
        icon: Database,
        title: "Stored & Traced",
        description: "MongoDB + OpenTelemetry",
    },
];

export function RequestPipeline() {
    return (
        <div>
            <h3 className="font-semibold">
                Request Pipeline
            </h3>

            <p className="mt-1 text-sm text-slate-400">
                Complete lifecycle of this AI request.
            </p>

            <div className="mt-6 space-y-4">
                {steps.map((step, index) => {
                    const Icon = step.icon;

                    return (
                        <div
                            key={step.title}
                            className="flex gap-4"
                        >
                            <div className="flex flex-col items-center">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                                    <Icon size={18} />
                                </div>

                                {index !== steps.length - 1 && (
                                    <div className="mt-2 h-10 w-px bg-slate-700" />
                                )}
                            </div>

                            <div className="pb-4">
                                <p className="font-medium">
                                    {step.title}
                                </p>

                                <p className="text-sm text-slate-400">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}