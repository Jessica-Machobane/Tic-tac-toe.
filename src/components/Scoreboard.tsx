import { useGame } from '../context/GameContext';

export function Scoreboard() {
  const { state } = useGame();
  const { scores, mode, currentPlayer, winner, isDraw } = state;
  const isRoundActive = !winner && !isDraw;

  const xLabel = mode === 'cpu' ? 'YOU · X' : 'P1 · X';
  const oLabel = mode === 'cpu' ? 'CPU · O' : 'P2 · O';

  return (
    <section
      aria-label="Scoreboard"
      className="grid grid-cols-3 gap-2 sm:gap-3 w-full"
    >
      <div
        className={`flex flex-col items-center justify-center rounded-xl bg-[#111524]/95 px-2.5 py-2 sm:px-4 sm:py-2.5 border transition-colors duration-150 ${
          isRoundActive && currentPlayer === 'X'
            ? 'border-[#ff2e7a]/50 shadow-[0_0_18px_rgba(255,46,122,0.12)]'
            : 'border-white/8'
        }`}
      >
        <span className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-[0.12em] sm:tracking-[0.14em] text-slate-400 uppercase whitespace-nowrap">
          {xLabel}
        </span>
        <span className="mt-0.5 text-lg sm:text-2xl md:text-[26px] font-bold font-mono tabular-nums text-[#ff2e7a]">
          {scores.X}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl bg-[#111524]/95 px-2.5 py-2 sm:px-4 sm:py-2.5 border border-white/8">
        <span className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-[0.12em] sm:tracking-[0.14em] text-slate-400 uppercase whitespace-nowrap">
          DRAWS
        </span>
        <span className="mt-0.5 text-lg sm:text-2xl md:text-[26px] font-bold font-mono tabular-nums text-slate-200">
          {scores.draws}
        </span>
      </div>

      <div
        className={`flex flex-col items-center justify-center rounded-xl bg-[#111524]/95 px-2.5 py-2 sm:px-4 sm:py-2.5 border transition-colors duration-150 ${
          isRoundActive && currentPlayer === 'O'
            ? 'border-[#00e5ff]/50 shadow-[0_0_18px_rgba(0,229,255,0.12)]'
            : 'border-white/8'
        }`}
      >
        <span className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-[0.12em] sm:tracking-[0.14em] text-slate-400 uppercase whitespace-nowrap">
          {oLabel}
        </span>
        <span className="mt-0.5 text-lg sm:text-2xl md:text-[26px] font-bold font-mono tabular-nums text-[#00e5ff]">
          {scores.O}
        </span>
      </div>
    </section>
  );
}
