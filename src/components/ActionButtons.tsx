import { RotateCcw, Trophy, Undo2 } from 'lucide-react';
import { useGame } from '../context/GameContext';

export function ActionButtons() {
  const { canUndo, undoMove, restartRound, resetGame } = useGame();

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
      <button
        type="button"
        onClick={undoMove}
        disabled={!canUndo}
        title="Undo last move"
        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#131726] px-2.5 sm:px-3 py-3 sm:py-2.5 min-h-[44px] text-[10px] sm:text-[11px] font-bold tracking-[0.08em] sm:tracking-[0.1em] uppercase border border-white/10 whitespace-nowrap shrink-0 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 enabled:text-slate-200 enabled:hover:bg-[#1a2035] enabled:hover:border-white/20 enabled:active:scale-[0.98] enabled:cursor-pointer disabled:text-slate-600 disabled:border-white/5 disabled:cursor-not-allowed"
      >
        <Undo2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span>Undo</span>
      </button>

      <button
        type="button"
        onClick={restartRound}
        title="Restart current round (keeps scores)"
        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#131726] px-2.5 sm:px-3 py-3 sm:py-2.5 min-h-[44px] text-[10px] sm:text-[11px] font-bold tracking-[0.08em] sm:tracking-[0.1em] uppercase text-slate-200 border border-white/10 whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-[#1a2035] hover:border-cyan-400/40 active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      >
        <RotateCcw className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span>Restart</span>
      </button>

      <button
        type="button"
        onClick={resetGame}
        title="Reset board and clear all scores"
        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#131726] px-2.5 sm:px-3 py-3 sm:py-2.5 min-h-[44px] text-[10px] sm:text-[11px] font-bold tracking-[0.08em] sm:tracking-[0.1em] uppercase text-slate-200 border border-white/10 whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-[#1a2035] hover:border-pink-400/40 active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      >
        <Trophy className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span>Reset</span>
      </button>
    </div>
  );
}
