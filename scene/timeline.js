// Scroll timeline. Progress p runs 0..1 across the sticky build section.
// Every part is a pure function of p so jumps in scroll position never
// leave the scene in a half state.

export const T = {
  outline:   [0.00, 0.05],
  posts:     [0.00, 0.07],
  rails:     [0.04, 0.12],
  shelves:   [0.12, 0.17],
  busbar:    [0.13, 0.19],
  manifolds: [0.16, 0.24],
  trays:     [0.24, 0.46],
  switches:  [0.46, 0.56],
  loops:     [0.56, 0.70],
  cdu:       [0.70, 0.76],
  trunks:    [0.74, 0.80],
  flow:      [0.78, 0.84],
  leds:      [0.84, 0.90],
  row:       [0.90, 1.00],
};

export const STAGES = [
  { start: 0.00, end: 0.12 },
  { start: 0.12, end: 0.24 },
  { start: 0.24, end: 0.46 },
  { start: 0.46, end: 0.56 },
  { start: 0.56, end: 0.70 },
  { start: 0.70, end: 0.84 },
  { start: 0.84, end: 1.01 },
];

export const clamp01 = (v) => Math.min(1, Math.max(0, v));
export const remap = (p, a, b) => clamp01((p - a) / (b - a));
export const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
export const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const lerp = (a, b, t) => a + (b - a) * t;

// Eased local progress for a window [start, end].
export function local(p, win, ease = easeOutCubic) {
  return ease(remap(p, win[0], win[1]));
}

// Eased local progress for item i of n inside window [start, end].
// spanFrac is the share of the window each item takes to animate.
export function stagger(p, win, i, n, spanFrac = 0.45, ease = easeOutCubic) {
  const total = win[1] - win[0];
  const span = total * spanFrac;
  const offset = n > 1 ? (total - span) * (i / (n - 1)) : 0;
  const s = win[0] + offset;
  return ease(remap(p, s, s + span));
}

export function stageAt(p) {
  for (let i = 0; i < STAGES.length; i++) {
    if (p >= STAGES[i].start && p < STAGES[i].end) return i;
  }
  return STAGES.length - 1;
}
