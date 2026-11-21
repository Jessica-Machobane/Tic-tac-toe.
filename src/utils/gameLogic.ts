import { CellValue, Player } from '../types/game';

export const WINNING_LINES: ReadonlyArray<[number, number, number]> = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Main diagonal
  [2, 4, 6], // Anti-diagonal
];

export interface WinResult {
  winner: Player;
  line: [number, number, number];
}

export function checkWinner(board: CellValue[]): WinResult | null {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    const cellA = board[a];
    if (cellA && cellA === board[b] && cellA === board[c]) {
      return { winner: cellA, line };
    }
  }
  return null;
}

export function isBoardFull(board: CellValue[]): boolean {
  return board.every((cell) => cell !== null);
}

export function getAvailableIndices(board: CellValue[]): number[] {
  const indices: number[] = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      indices.push(i);
    }
  }
  return indices;
}

/**
 * Easy AI: chooses a random available square.
 */
export function getEasyCpuMove(board: CellValue[]): number | null {
  const available = getAvailableIndices(board);
  if (available.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
}

/**
 * Minimax evaluation for Hard AI (unbeatable).
 */
function minimax(
  board: CellValue[],
  depth: number,
  isMaximizing: boolean,
  cpuPlayer: Player,
  humanPlayer: Player
): number {
  const result = checkWinner(board);
  if (result) {
    return result.winner === cpuPlayer ? 10 - depth : depth - 10;
  }
  if (isBoardFull(board)) {
    return 0;
  }

  const available = getAvailableIndices(board);

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const idx of available) {
      board[idx] = cpuPlayer;
      const score = minimax(board, depth + 1, false, cpuPlayer, humanPlayer);
      board[idx] = null;
      if (score > bestScore) {
        bestScore = score;
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (const idx of available) {
      board[idx] = humanPlayer;
      const score = minimax(board, depth + 1, true, cpuPlayer, humanPlayer);
      board[idx] = null;
      if (score < bestScore) {
        bestScore = score;
      }
    }
    return bestScore;
  }
}

/**
 * Hard AI: computes the optimal move using Minimax with randomized tie-breaking
 * among equally optimal squares so games feel natural while remaining unbeatable.
 */
export function getBestCpuMove(board: CellValue[], cpuPlayer: Player = 'O'): number | null {
  const available = getAvailableIndices(board);
  if (available.length === 0) return null;

  // Fast opening shortcut if board is completely empty
  if (available.length === 9) {
    const openings = [0, 2, 4, 6, 8];
    return openings[Math.floor(Math.random() * openings.length)];
  }

  const humanPlayer: Player = cpuPlayer === 'O' ? 'X' : 'O';
  const boardCopy = [...board];
  let bestScore = -Infinity;
  let bestMoves: number[] = [];

  for (const idx of available) {
    boardCopy[idx] = cpuPlayer;
    const score = minimax(boardCopy, 0, false, cpuPlayer, humanPlayer);
    boardCopy[idx] = null;

    if (score > bestScore) {
      bestScore = score;
      bestMoves = [idx];
    } else if (score === bestScore) {
      bestMoves.push(idx);
    }
  }

  return bestMoves[Math.floor(Math.random() * bestMoves.length)];
}
