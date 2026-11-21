export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type GameMode = 'cpu' | 'pvp';
export type Difficulty = 'easy' | 'hard';

export interface ScoreBoard {
  X: number;
  O: number;
  draws: number;
}

export interface HistoryEntry {
  board: CellValue[];
  currentPlayer: Player;
  scores: ScoreBoard;
}

export interface GameState {
  board: CellValue[];
  currentPlayer: Player;
  winner: Player | null;
  winningLine: [number, number, number] | null;
  isDraw: boolean;
  history: HistoryEntry[];
  scores: ScoreBoard;
  mode: GameMode;
  difficulty: Difficulty;
}

export type GameAction =
  | { type: 'MAKE_MOVE'; index: number }
  | { type: 'UNDO' }
  | { type: 'RESTART' }
  | { type: 'RESET' }
  | { type: 'SET_MODE'; mode: GameMode }
  | { type: 'SET_DIFFICULTY'; difficulty: Difficulty };
