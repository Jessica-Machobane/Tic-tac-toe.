import { useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { ActionButtons } from './components/ActionButtons';
import { Board } from './components/Board';
import { ModeControls } from './components/ModeControls';
import { Scoreboard } from './components/Scoreboard';
import { StatusBanner } from './components/StatusBanner';
import { GameProvider, useGame } from './context/GameContext';

function TicTacToeArena() {
  const { soundEnabled, toggleSound, undoMove, restartRound } = useGame();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const key = event.key.toLowerCase();
      if (key === 'z') {
        undoMove();
      } else if (key === 'r') {
        restartRound();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undoMove, restartRound]);

  return (
    <div className="arcade-grid-bg relative min-h-dvh w-full flex flex-col items-center justify-center px-3.5 py-5 sm:px-6 sm:py-8 lg:py-6">
      <button
        type="button"
        onClick={toggleSound}
        aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
        title={soundEnabled ? 'Sound On' : 'Sound Off'}
        className="fixed top-3 right-3 sm:top-5 sm:right-5 z-10 inline-flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 rounded-xl bg-[#111524]/90 border border-white/10 text-slate-400 hover:text-slate-100 hover:border-white/20 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      >
        {soundEnabled ? (
          <Volume2 className="w-4 h-4" aria-hidden="true" />
        ) : (
          <VolumeX className="w-4 h-4" aria-hidden="true" />
        )}
      </button>

      <main className="w-full max-w-[360px] sm:max-w-[min(68dvh,410px)] md:max-w-[min(54dvh,440px)] lg:max-w-[min(48dvh,450px)] flex flex-col items-center gap-3.5 sm:gap-4 md:gap-5 lg:gap-4 pt-9 sm:pt-0">
        <header className="text-center">
          <h1 className="text-2xl sm:text-4xl md:text-[40px] font-extrabold tracking-[0.2em] uppercase bg-gradient-to-r from-[#ff2e7a] via-[#a78bfa] to-[#00e5ff] bg-clip-text text-transparent select-none">
            TICTACTOE
          </h1>
        </header>

        <ModeControls />

        <Scoreboard />

        <StatusBanner />

        <Board />

        <ActionButtons />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <TicTacToeArena />
    </GameProvider>
  );
}
