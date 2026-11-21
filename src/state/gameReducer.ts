import { CellValue, GameAction, GameState, ScoreBoard } from '../types/game';
import { checkWinner, isBoardFull } from '../utils/gameLogic';

export const EMPTY_BOARD: CellValue[] = Array(9).fill(null);

export const INITIAL_SCORES: ScoreBoard = {
  X: 0,
  O: 0,
  draws: 0,
};

export const initialGameState: GameState = {
  board: [...EMPTY_BOARD],
  currentPlayer: 'X',
  winner: null,
  winningLine: null,
  isDraw: false,
  history: [],
  scores: { ...INITIAL_SCORES },
  mode: 'cpu',
  difficulty: 'hard',
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'MAKE_MOVE': {
      const { index } = action;

      if (
        index < 0 ||
        index > 8 ||
        state.board[index] !== null ||
        state.winner !== null ||
        state.isDraw
      ) {
        return state;
      }

      const nextBoard = [...state.board];
      nextBoard[index] = state.currentPlayer;

      const winResult = checkWinner(nextBoard);
      const draw = !winResult && isBoardFull(nextBoard);

      const nextScores: ScoreBoard = { ...state.scores };
      if (winResult) {
        nextScores[winResult.winner] += 1;
      } else if (draw) {
        nextScores.draws += 1;
      }

      return {
        ...state,
        board: nextBoard,
        currentPlayer:
          winResult || draw
            ? state.currentPlayer
            : state.currentPlayer === 'X'
              ? 'O'
              : 'X',
        winner: winResult ? winResult.winner : null,
        winningLine: winResult ? winResult.line : null,
        isDraw: draw,
        scores: nextScores,
        history: [
          ...state.history,
          {
            board: state.board,
            currentPlayer: state.currentPlayer,
            scores: state.scores,
          },
        ],
      };
    }

    case 'UNDO': {
      if (state.history.length === 0) {
        return state;
      }

      let targetIndex = state.history.length - 1;
      if (state.mode === 'cpu') {
        while (targetIndex > 0 && state.history[targetIndex].currentPlayer !== 'X') {
          targetIndex -= 1;
        }
        if (state.history[targetIndex].currentPlayer !== 'X') {
          return state;
        }
      }

      const previousEntry = state.history[targetIndex];
      return {
        ...state,
        board: [...previousEntry.board],
        currentPlayer: previousEntry.currentPlayer,
        scores: { ...previousEntry.scores },
        winner: null,
        winningLine: null,
        isDraw: false,
        history: state.history.slice(0, targetIndex),
      };
    }

    case 'RESTART': {
      return {
        ...state,
        board: [...EMPTY_BOARD],
        currentPlayer: 'X',
        winner: null,
        winningLine: null,
        isDraw: false,
        history: [],
      };
    }

    case 'RESET': {
      return {
        ...state,
        board: [...EMPTY_BOARD],
        currentPlayer: 'X',
        winner: null,
        winningLine: null,
        isDraw: false,
        history: [],
        scores: { ...INITIAL_SCORES },
      };
    }

    case 'SET_MODE': {
      if (action.mode === state.mode) return state;
      return {
        ...state,
        mode: action.mode,
        board: [...EMPTY_BOARD],
        currentPlayer: 'X',
        winner: null,
        winningLine: null,
        isDraw: false,
        history: [],
        scores: { ...INITIAL_SCORES },
      };
    }

    case 'SET_DIFFICULTY': {
      if (action.difficulty === state.difficulty) return state;
      return {
        ...state,
        difficulty: action.difficulty,
        board: [...EMPTY_BOARD],
        currentPlayer: 'X',
        winner: null,
        winningLine: null,
        isDraw: false,
        history: [],
      };
    }

    default:
      return state;
  }
}
