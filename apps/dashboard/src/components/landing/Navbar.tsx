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

        <nav className="hidden items-center gap-8 text-medium text-slate-400 md:flex">
          <a href="#features" className="hover:text-white transition">
            Features
          </a>

          <a href="#architecture" className="hover:text-white transition">
            Architecture
          </a>

          <a href="#observability" className="hover:text-white transition">
            Observability
          </a>

          <a href="#tech-stack" className="hover:text-white transition">
            Tech Stack
          </a>
        </nav>

        <Link
          to="/dashboard"
          className="rounded-lg bg-cyan-500 px-4 py-2 text-medium font-medium text-slate-950 transition hover:bg-cyan-400"
        >
          Launch Dashboard
        </Link>
      </div>
    </header>
  );
}