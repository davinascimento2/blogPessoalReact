import { Github, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentSlug: string | null;
  onNavigateHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentSlug, onNavigateHome }) => {
  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950 px-4 py-3 sticky top-0 z-40">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Author Brand */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-6 h-6 rounded bg-zinc-100 text-zinc-950 flex items-center justify-center font-bold text-xs">
            D
          </div>
          <div>
            <h1 className="text-xs font-semibold text-zinc-100 tracking-tight group-hover:text-zinc-300 transition-colors">
              Davi Nascimento
            </h1>
            <p className="text-[10px] text-zinc-500 font-mono">Systems & Software Architecture</p>
          </div>
        </button>

        {/* Links */}
        <div className="flex items-center gap-3 text-xs">
          {currentSlug && (
            <button
              onClick={onNavigateHome}
              className="text-zinc-400 hover:text-zinc-100 flex items-center gap-1 font-mono text-[11px]"
            >
              ← All Essays
            </button>
          )}

          <a
            href="https://github.com/davinascimento2"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors font-mono text-[11px]"
          >
            <Github className="w-3 h-3" />
            <span>GitHub</span>
            <ArrowUpRight className="w-2.5 h-2.5 text-zinc-500" />
          </a>
        </div>
      </div>
    </header>
  );
};
