import { Code, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 text-center text-slate-400 md:flex-row">
        <div>
          <h3 className="text-4xl font-bold text-white">
            CuraScope
          </h3>

          <p className="mt-2 text-sm">
            AI Gateway & Observability Platform powered by
            OpenTelemetry and SigNoz.
          </p>
        </div>

        <div className="flex gap-4">
          <a
            href="https://github.com/your-repository"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 transition hover:border-cyan-500"
          >
            <Code size={18} />
            GitHub
          </a>

          <a
            href="/dashboard"
            className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-400"
          >
            <ExternalLink size={18} />
            Launch Dashboard
          </a>
        </div>
      </div>
    </footer>
  );
}