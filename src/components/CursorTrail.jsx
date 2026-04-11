import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   EMOJI / TEXT POOLS — Strictly separated, zero crossover
   ═══════════════════════════════════════════════════════════════ */

// LOVE mode: cute hearts only (auth / chat phases)
const LOVE_EMOJIS = ['💕', '💖', '🩷', '💗', '✨', '💘', '💝'];

// GAY mode: "GAY" text + kiss emoji ONLY — absolutely NO hearts
const GAY_ITEMS = [
  { type: 'text', value: 'GAY' },
  { type: 'text', value: 'GAY' },
  { type: 'text', value: 'GAY' },
  { type: 'emoji', value: '👨‍❤️‍💋‍👨' },
  { type: 'text', value: 'GAY' },
  { type: 'emoji', value: '👨‍❤️‍💋‍👨' },
  { type: 'text', value: 'GAY' },
];

export default function CursorTrail({ mode = 'love' }) {
  const [trails, setTrails] = useState([]);
  const [nextId, setNextId] = useState(0);

  const isGay = mode === 'gay';

  // Pre-compute pools so we don't recalculate every render
  const lovePool = useMemo(() => LOVE_EMOJIS, []);
  const gayPool = useMemo(() => GAY_ITEMS, []);

  const handleMove = useCallback((e) => {
    const x = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    const y = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;

    if (x === 0 && y === 0) return;

    setNextId(prev => {
      const id = prev;
      setTrails(prevTrails => {
        const filtered = prevTrails.length > 14 ? prevTrails.slice(-10) : prevTrails;
        return [...filtered, { id, x, y }];
      });
      return prev + 1;
    });
  }, []);

  useEffect(() => {
    let throttle = false;
    const throttledMove = (e) => {
      if (throttle) return;
      throttle = true;
      setTimeout(() => { throttle = false; }, 55);
      handleMove(e);
    };

    window.addEventListener('mousemove', throttledMove);
    window.addEventListener('touchmove', throttledMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', throttledMove);
      window.removeEventListener('touchmove', throttledMove);
    };
  }, [handleMove]);

  const removeTrail = (id) => {
    setTrails(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9998 }}>
      <AnimatePresence>
        {trails.map(trail => {
          if (isGay) {
            // GAY MODE — "GAY" text and 👨‍❤️‍💋‍👨 emoji
            const item = gayPool[Math.floor(Math.random() * gayPool.length)];
            const isText = item.type === 'text';

            return (
              <motion.div
                key={trail.id}
                className="fixed pointer-events-none select-none"
                style={{
                  left: trail.x,
                  top: trail.y,
                  fontSize: isText
                    ? `${10 + Math.random() * 6}px`
                    : `${14 + Math.random() * 8}px`,
                  transform: 'translate(-50%, -50%)',
                  fontWeight: isText ? 900 : 400,
                  fontFamily: isText ? "'Inter', sans-serif" : 'inherit',
                  background: isText
                    ? 'linear-gradient(135deg, #8b5cf6, #6366f1, #a78bfa)'
                    : 'none',
                  WebkitBackgroundClip: isText ? 'text' : 'unset',
                  WebkitTextFillColor: isText ? 'transparent' : 'unset',
                  textShadow: 'none',
                  letterSpacing: isText ? '0.12em' : 'normal',
                  filter: isText ? 'drop-shadow(0 0 6px rgba(139,92,246,0.5))' : 'none',
                }}
                initial={{ opacity: 1, scale: 1 }}
                animate={{
                  opacity: 0,
                  scale: 0.2,
                  y: -25 - Math.random() * 25,
                  x: (Math.random() - 0.5) * 30,
                  rotate: (Math.random() - 0.5) * 40,
                }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                onAnimationComplete={() => removeTrail(trail.id)}
              >
                {item.value}
              </motion.div>
            );
          } else {
            // LOVE MODE — cute hearts
            const emoji = lovePool[Math.floor(Math.random() * lovePool.length)];

            return (
              <motion.div
                key={trail.id}
                className="fixed pointer-events-none select-none"
                style={{
                  left: trail.x,
                  top: trail.y,
                  fontSize: `${12 + Math.random() * 12}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ opacity: 1, scale: 1 }}
                animate={{
                  opacity: 0,
                  scale: 0.3,
                  y: -20 - Math.random() * 20,
                  x: (Math.random() - 0.5) * 20,
                }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                onAnimationComplete={() => removeTrail(trail.id)}
              >
                {emoji}
              </motion.div>
            );
          }
        })}
      </AnimatePresence>
    </div>
  );
}
