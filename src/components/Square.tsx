import { CellValue, Player } from '../types/game';
import { MarkIcon } from './MarkIcon';

interface SquareProps {
  value: CellValue;
  index: number;
  isWinningCell: boolean;
  hasWinner: boolean;
  isDisabled: boolean;
  previewPlayer: Player;
  onSelect: (index: number) => void;
}

export function Square({
  value,
  index,
  isWinningCell,
  hasWinner,
  isDisabled,
  previewPlayer,
  onSelect,
}: SquareProps) {
  const row = Math.floor(index / 3) + 1;
  const col = (index % 3) + 1;
  const canClick = value === null && !isDisabled;

  const winningStyle =
    isWinningCell && value === 'O'
      ? 'border-2 border-[#00e5ff] bg-[#0e2230]/80 shadow-[0_0_24px_rgba(0,229,255,0.45),inset_0_0_16px_rgba(0,229,255,0.2)]'
      : isWinningCell && value === 'X'
        ? 'border-2 border-[#ff2e7a] bg-[#2a1020]/80 shadow-[0_0_24px_rgba(255,46,122,0.45),inset_0_0_16px_rgba(255,46,122,0.2)]'
        : 'border border-white/6 bg-[#161a29]';

  const hoverStyle = canClick
    ? previewPlayer === 'X'
      ? 'hover:bg-[#1c2135] hover:border-[#ff2e7a]/45 active:scale-[0.97] cursor-pointer'
      : 'hover:bg-[#1c2135] hover:border-[#00e5ff]/45 active:scale-[0.97] cursor-pointer'
    : 'cursor-default';

  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      disabled={!canClick}
      aria-label={`Row ${row}, Column ${col}: ${value ?? 'empty'}`}
      className={`group relative aspect-square w-full min-h-[72px] rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${winningStyle} ${hoverStyle}`}
    >
      {value !== null ? (
        <MarkIcon
          player={value}
          size="lg"
          dimmed={hasWinner && !isWinningCell}
        />
      ) : canClick ? (
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
          <MarkIcon player={previewPlayer} size="lg" ghost />
        </span>
      ) : null}
    </button>
  );
}
