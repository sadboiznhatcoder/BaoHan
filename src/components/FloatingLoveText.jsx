import { useMemo } from 'react';

// ─── Phrase pool ─────────────────────────────────────────────────
const PHRASES = [
  'anh yêu mỗi Bảo Hân đó',
  'Tina của anh',
  'Bảo Hân xinh nhất',
  'Yêu Tina nhất trên đời',
];

// ─── Deterministic seeded random ─────────────────────────────────
function sr(seed) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

// ─── Pre-compute 150 items at module level ───────────────────────
const COUNT = 150;
const ITEMS = Array.from({ length: COUNT }, (_, i) => ({
  id: i,
  text: PHRASES[i % PHRASES.length],
  left: `${sr(i * 7) * 100}%`,
  fontSize: `${13 + sr(i * 7 + 1) * 16}px`,
  rawOpacity: sr(i * 7 + 2),  // 0–1, will be scaled by baseOpacity
  duration: `${10 + sr(i * 7 + 3) * 15}s`,
  delay: `${-(sr(i * 7 + 4) * 20)}s`,
  hue: 320 + sr(i * 7 + 5) * 40,
  lightness: 65 + sr(i * 7 + 6) * 25,
}));

// ─── CSS injected once ───────────────────────────────────────────
const CSS = `
@keyframes flt-rise {
  from { transform: translate3d(0, 110vh, 0); }
  to   { transform: translate3d(0, -20vh, 0); }
}
.flt-layer {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  contain: strict;
}
.flt-item {
  position: absolute;
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
  will-change: transform, opacity;
  font-family: 'Dancing Script', cursive;
  text-shadow: 0 0 12px rgba(244, 63, 94, 0.35);
  animation: flt-rise var(--dur) linear var(--del) infinite;
}
`;

let injected = false;
function injectCSS() {
  if (injected) return;
  injected = true;
  const s = document.createElement('style');
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Reusable 750Hz GPU-accelerated floating love text background.
 *
 * @param {{ baseOpacity?: number, zIndex?: number }} props
 *   - baseOpacity: scales the opacity of all 150 items (default 1.0).
 *     e.g. 0.08 for a faint watermark, 1.0 for full intensity.
 *   - zIndex: CSS z-index of the layer (default 8).
 */
export default function FloatingLoveText({ baseOpacity = 1.0, zIndex = 8 }) {
  useMemo(() => injectCSS(), []);

  const els = useMemo(
    () =>
      ITEMS.map((it) => {
        // Scale raw opacity (0–1) into the 0.2–0.6 range, then multiply by baseOpacity
        const opacity = (0.2 + it.rawOpacity * 0.4) * baseOpacity;
        return (
          <div
            key={it.id}
            className="flt-item"
            style={{
              left: it.left,
              fontSize: it.fontSize,
              opacity,
              color: `hsl(${it.hue}, 80%, ${it.lightness}%)`,
              '--dur': it.duration,
              '--del': it.delay,
            }}
          >
            {it.text}
          </div>
        );
      }),
    [baseOpacity]
  );

  return <div className="flt-layer" style={{ zIndex }}>{els}</div>;
}
