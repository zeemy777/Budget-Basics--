import './confetti.css';

const COLORS = ['#34d399', '#a7f3d0', '#fbbf24', '#38bdf8', '#f472b6', '#ffffff'];

export function celebrate(count = 120) {
  if (typeof document === 'undefined') return;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

  const layer = document.createElement('div');
  layer.className = 'bb-confetti-layer';

  for (let index = 0; index < count; index += 1) {
    const piece = document.createElement('span');
    piece.className = 'bb-confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = COLORS[index % COLORS.length];
    piece.style.animationDelay = `${Math.random() * 0.6}s`;
    piece.style.animationDuration = `${2.2 + Math.random() * 1.6}s`;
    piece.style.width = `${5 + Math.random() * 6}px`;
    piece.style.height = `${8 + Math.random() * 9}px`;
    piece.style.setProperty('--drift', `${(Math.random() - 0.5) * 140}px`);
    piece.style.setProperty('--spin', `${240 + Math.random() * 540}deg`);
    layer.appendChild(piece);
  }

  document.body.appendChild(layer);
  window.setTimeout(() => layer.remove(), 4400);
}
