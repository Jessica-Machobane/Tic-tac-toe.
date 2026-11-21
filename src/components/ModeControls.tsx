import { useGame } from '../context/GameContext';

export function ModeControls() {
  const { state, setMode, setDifficulty } = useGame();

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 w-full">
      <div
        role="group"
        aria-label="Game Mode"
        className="inline-flex items-center gap-1 rounded-xl bg-[#111524] p-1 border border-white/10"
      >
        <button
          type="button"
          onClick={() => setMode('cpu')}
          aria-pressed={state.mode === 'cpu'}
          className={`px-2.5 sm:px-3.5 py-2 sm:py-1.5 min-h-[38px] sm:min-h-0 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-[0.08em] uppercase whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
            state.mode === 'cpu'
              ? 'bg-[#00e5ff] text-[#061018] shadow-[0_0_16px_rgba(0,229,255,0.45)]'
              : 'text-slate-400 hover:text-slate-100'
          }`}
        >
          VS Computer
        </button>
        <button
          type="button"
          onClick={() => setMode('pvp')}
          aria-pressed={state.mode === 'pvp'}
          className={`px-2.5 sm:px-3.5 py-2 sm:py-1.5 min-h-[38px] sm:min-h-0 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-[0.08em] uppercase whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
            state.mode === 'pvp'
              ? 'bg-[#00e5ff] text-[#061018] shadow-[0_0_16px_rgba(0,229,255,0.45)]'
              : 'text-slate-400 hover:text-slate-100'
          }`}
        >
          2 Players
        </button>
      </div>

      {state.mode === 'cpu' && (
        <div
          role="group"
          aria-label="Computer Difficulty"
          className="inline-flex items-center gap-1 rounded-xl bg-[#111524] p-1 border border-white/10"
        >
          <button
            type="button"
            onClick={() => setDifficulty('easy')}
            aria-pressed={state.difficulty === 'easy'}
            className={`px-2.5 sm:px-3.5 py-2 sm:py-1.5 min-h-[38px] sm:min-h-0 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-[0.08em] uppercase whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
              state.difficulty === 'easy'
                ? 'bg-[#00e5ff] text-[#061018] shadow-[0_0_16px_rgba(0,229,255,0.45)]'
                : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            Easy
          </button>
          <button
            type="button"
            onClick={() => setDifficulty('hard')}
            aria-pressed={state.difficulty === 'hard'}
            className={`px-2.5 sm:px-3.5 py-2 sm:py-1.5 min-h-[38px] sm:min-h-0 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-[0.08em] uppercase whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
              state.difficulty === 'hard'
                ? 'bg-[#00e5ff] text-[#061018] shadow-[0_0_16px_rgba(0,229,255,0.45)]'
                : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            Hard
          </button>
        </div>
      )}
    </div>
  );
}
