import { Player } from '../types/game';

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume = 0.05,
  delay = 0
) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.exponentialRampToValueAtTime(volume, now + 0.012);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(now);
    oscillator.stop(now + duration + 0.02);
  } catch {
    // Ignore audio errors when blocked by browser autoplay policies
  }
}

export function playMoveSound(player: Player) {
  if (player === 'X') {
    playTone(520, 0.09, 'triangle', 0.05);
  } else {
    playTone(415, 0.09, 'sine', 0.055);
  }
}

export function playWinSound() {
  playTone(523.25, 0.12, 'triangle', 0.055, 0);
  playTone(659.25, 0.12, 'triangle', 0.055, 0.09);
  playTone(783.99, 0.24, 'triangle', 0.06, 0.18);
}

export function playDrawSound() {
  playTone(330, 0.12, 'sine', 0.04, 0);
  playTone(293.66, 0.18, 'sine', 0.04, 0.11);
}
