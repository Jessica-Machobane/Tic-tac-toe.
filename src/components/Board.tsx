import { useGame } from '../context/GameContext';
import { Square } from './Square';

export function Board() {
  const { state, isCpuThinking, makeMove } = useGame();
  const { board, winningLine, winner, isDraw, currentPlayer } = state;

  const isBoardLocked = isCpuThinking || winner !== null || isDraw;

  return (
    <div
      role="grid"
      aria-label="TicTacToe 3 by 3 board"
      className="w-full rounded-2xl bg-[#0e111d]/95 p-2.5 sm:p-3.5 md:p-4 border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.65)]"
    >
      <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-3.5">
        {board.map((cell, idx) => (
          <Square
            key={idx}
            index={idx}
            value={cell}
            isWinningCell={winningLine ? winningLine.includes(idx) : false}
            hasWinner={winner !== null}
            isDisabled={isBoardLocked}
            previewPlayer={currentPlayer}
            onSelect={makeMove}
          />
        ))}
      </div>
    </div>
  );
}
