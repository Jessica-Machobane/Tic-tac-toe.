import { useGame } from '../context/GameContext';
import { MarkIcon } from './MarkIcon';

export function StatusBanner() {
  const { state, isCpuThinking } = useGame();
  const { winner, isDraw, currentPlayer, mode } = state;

  let subText = 'Click any empty square';
  if (winner || isDraw) {
    subText = 'Hit Restart for another round';
  } else if (isCpuThinking) {
    subText = 'CPU is thinking...';
  } else if (mode === 'cpu') {
    subText = 'Your turn';
  } else {
    subText = currentPlayer === 'X' ? "Player 1's turn" : "Player 2's turn";
  }

  return (
    <div
      aria-live="polite"
      className="flex flex-col items-center justify-center text-center min-h-[46px] sm:min-h-[54px]"
    >
      {winner ? (
        <div className="flex items-center gap-2 sm:gap-2.5 text-base sm:text-xl md:text-[22px] font-bold tracking-[0.14em] uppercase text-slate-100">
          <span>Winner:</span>
          <span className="inline-flex items-center gap-1.5">
            <MarkIcon player={winner} size="sm" />
            <span className="sr-only">{winner}</span>
          </span>
        </div>
      ) : isDraw ? (
        <div className="text-base sm:text-xl md:text-[22px] font-bold tracking-[0.14em] uppercase text-slate-100">
          Draw!
        </div>
      ) : (
        <div className="flex items-center gap-2 sm:gap-2.5 text-base sm:text-xl md:text-[22px] font-bold tracking-[0.14em] uppercase text-slate-100">
          <span>Next Player:</span>
          <span className="inline-flex items-center gap-1.5">
            <MarkIcon player={currentPlayer} size="sm" />
            <span className="sr-only">{currentPlayer}</span>
          </span>
        </div>
      )}

      <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-[11px] font-medium tracking-[0.16em] uppercase text-slate-400">
        {subText}
      </p>
    </div>
  );
}
