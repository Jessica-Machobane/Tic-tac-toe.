import React, { createContext, useCallback, useContext, useEffect, useReducer, useRef, useState } from 'react';
import { gameReducer, initialGameState } from '../state/gameReducer';
import { Difficulty, GameMode, GameState } from '../types/game';
import { getBestCpuMove, getEasyCpuMove } from '../utils/gameLogic';
import { playDrawSound, playMoveSound, playWinSound } from '../utils/sound';

interface GameContextValue {
  state: GameState;
  isCpuThinking: boolean;
  canUndo: boolean;
  soundEnabled: boolean;
  toggleSound: () => void;
  makeMove: (index: number) => void;
  undoMove: () => void;
  restartRound: () => void;
  resetGame: () => void;
  setMode: (mode: GameMode) => void;
  setDifficulty: (difficulty: Difficulty) => void;
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const prevOutcomeRef = useRef<{ winner: string | null; isDraw: boolean }>({
    winner: null,
    isDraw: false,
  });

  const isCpuThinking =
    state.mode === 'cpu' &&
    state.currentPlayer === 'O' &&
    state.winner === null &&
    !state.isDraw;

  const canUndo =
    !isCpuThinking &&
    (state.mode === 'pvp'
      ? state.history.length > 0
      : state.history.some((entry) => entry.currentPlayer === 'X'));

  useEffect(() => {
    if (!soundEnabled) {
      prevOutcomeRef.current = { winner: state.winner, isDraw: state.isDraw };
      return;
    }

    if (state.winner && !prevOutcomeRef.current.winner) {
      playWinSound();
    } else if (state.isDraw && !prevOutcomeRef.current.isDraw) {
      playDrawSound();
    }

    prevOutcomeRef.current = { winner: state.winner, isDraw: state.isDraw };
  }, [state.winner, state.isDraw, soundEnabled]);

  useEffect(() => {
    if (!isCpuThinking) return;

    const timer = window.setTimeout(() => {
      const moveIndex =
        state.difficulty === 'hard'
          ? getBestCpuMove(state.board, 'O')
          : getEasyCpuMove(state.board);

      if (moveIndex !== null) {
        if (soundEnabled) {
          playMoveSound('O');
        }
        dispatch({ type: 'MAKE_MOVE', index: moveIndex });
      }
    }, 420);

    return () => window.clearTimeout(timer);
  }, [isCpuThinking, state.board, state.difficulty, soundEnabled]);

  const makeMove = useCallback(
    (index: number) => {
      if (isCpuThinking) return;
      if (state.board[index] !== null || state.winner !== null || state.isDraw) return;

      if (soundEnabled) {
        playMoveSound(state.currentPlayer);
      }
      dispatch({ type: 'MAKE_MOVE', index });
    },
    [isCpuThinking, state.board, state.winner, state.isDraw, state.currentPlayer, soundEnabled]
  );

  const undoMove = useCallback(() => {
    if (!canUndo) return;
    dispatch({ type: 'UNDO' });
  }, [canUndo]);

  const restartRound = useCallback(() => {
    dispatch({ type: 'RESTART' });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const setMode = useCallback((mode: GameMode) => {
    dispatch({ type: 'SET_MODE', mode });
  }, []);

  const setDifficulty = useCallback((difficulty: Difficulty) => {
    dispatch({ type: 'SET_DIFFICULTY', difficulty });
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  return (
    <GameContext.Provider
      value={{
        state,
        isCpuThinking,
        canUndo,
        soundEnabled,
        toggleSound,
        makeMove,
        undoMove,
        restartRound,
        resetGame,
        setMode,
        setDifficulty,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextValue {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
