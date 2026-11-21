import { Player } from '../types/game';

interface MarkIconProps {
  player: Player;
  size?: 'sm' | 'lg';
  ghost?: boolean;
  dimmed?: boolean;
}

export function MarkIcon({
  player,
  size = 'lg',
  ghost = false,
  dimmed = false,
}: MarkIconProps) {
  const sizeClass =
    size === 'sm'
      ? 'w-4 h-4 sm:w-5 sm:h-5'
      : 'w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16';
  const opacityClass = ghost ? 'opacity-20' : dimmed ? 'opacity-50' : 'opacity-100';

  if (player === 'X') {
    return (
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        className={`${sizeClass} ${opacityClass} ${
          !ghost ? 'animate-mark-in drop-shadow-[0_0_10px_rgba(255,46,122,0.65)]' : ''
        } text-[#ff2e7a] transition-opacity duration-150`}
        fill="none"
      >
        <path
          d="M24 24L76 76M76 24L24 76"
          stroke="currentColor"
          strokeWidth={size === 'sm' ? 16 : 14}
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={`${sizeClass} ${opacityClass} ${
        !ghost ? 'animate-mark-in drop-shadow-[0_0_10px_rgba(0,229,255,0.65)]' : ''
      } text-[#00e5ff] transition-opacity duration-150`}
      fill="none"
    >
      <rect
        x="21"
        y="21"
        width="58"
        height="58"
        rx="22"
        stroke="currentColor"
        strokeWidth={size === 'sm' ? 16 : 14}
      />
    </svg>
  );
}
