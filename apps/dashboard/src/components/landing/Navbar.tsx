import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-cyan-400 transition hover:text-cyan-300"
        >
          CuraScope
        </Link>

        <nav className="hidden items-center gap-12 text-medium text-slate-400 md:flex">
          <a href="#features" className="hover:text-cyan-400 hover:font-semibold transition">
            Features
          </a>

          <a href="#architecture" className="hover:text-cyan-400 hover:font-semibold transition">
            Architecture
          </a>

          <a href="#observability" className="hover:text-cyan-400 hover:font-semibold transition">
            Observability
          </a>

          <a href="#tech-stack" className="hover:text-cyan-400 hover:font-semibold transition">
            Tech Stack
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="text-slate-300 transition hover:text-cyan-400 hover:font-semibold"
          >
            Dashboard
          </Link>

          <Link
            to="/chat"
            className="rounded-lg bg-cyan-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-400"
          >
            Chat
          </Link>
        </div>
      </div>
    </header>
  );
}