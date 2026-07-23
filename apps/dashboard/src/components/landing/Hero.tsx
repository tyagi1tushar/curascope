import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Activity, Database } from "lucide-react";

import dashboardPreview from "../../assets/dashboard-preview.png";

export function Hero() {
    return (
        <section className="relative overflow-hidden">

            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-1/2 top-24 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

                <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />
            </div>

            <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">

                <div>

                    <h1 className="mt-4 text-6xl font-bold leading-tight">
                        AI Gateway
                        <br />
                        Observability Platform
                    </h1>

                    <p className="mt-6 text-xl leading-8 text-slate-400">
                        Real-time monitoring of AI requests, security posture,
                        cost analysis, OpenTelemetry traces and AI performance.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-7 py-4 font-bold text-slate-950 transition hover:bg-cyan-400"
                        >
                            See Observability

                            <ArrowRight size={18} />
                        </Link>

                        <a
                            href="https://github.com/tyagi1tushar/curascope.git"
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-xl border border-slate-700 px-7 py-4 font-medium transition hover:border-cyan-400"
                        >
                            GitHub
                        </a>
                    </div>

                    <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
                        <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 p-3">
                            <Activity size={18} className="text-cyan-400" />
                            <span className="text-sm">Tracing</span>
                        </div>

                        <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 p-3">
                            <ShieldCheck size={18} className="text-cyan-400" />
                            <span className="text-sm">Security</span>
                        </div>

                        <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 p-3">
                            <Database size={18} className="text-cyan-400" />
                            <span className="text-sm">Analytics</span>
                        </div>

                        <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 p-3">
                            <ArrowRight size={18} className="text-cyan-400" />
                            <span className="text-sm">SigNoz</span>
                        </div>
                    </div>
                </div>

                <div className="relative hidden lg:block">
                    <div className="absolute -left-8 -top-8 h-44 w-44 rounded-full bg-cyan-500/20 blur-3xl" />

                    <div className="absolute -top-5 right-6 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 shadow-xl">
                        <p className="text-xs text-slate-400">
                            OpenTelemetry
                        </p>

                        <p className="font-semibold text-cyan-400">
                            Live Traces
                        </p>
                    </div>

                    <div className="absolute -bottom-5 -left-6 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 shadow-xl">
                        <p className="text-xs text-slate-400">
                            Sessions
                        </p>

                        <p className="font-semibold text-white">
                            AI Gateway
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
                        <img
                            src={dashboardPreview}
                            alt="CuraScope Dashboard"
                            className="w-full transition duration-500 hover:scale-[1.02]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}