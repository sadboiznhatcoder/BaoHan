import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   EMOJI / TEXT POOLS — Strictly separated
   ═══════════════════════════════════════════════════════════════ */

// LOVE mode: cute hearts only (auth / chat phases)
const LOVE_EMOJIS = ['💖', '💕', '💗', '💘', '💝', '❤️', '🩷', '✨', '🌸', '💫', '⭐'];

// GAY mode: "GAY" text + 👨‍❤️‍💋‍👨 — absolutely NO hearts
const GAY_ITEMS = [
  { type: 'text', value: 'GAY' },
  { type: 'text', value: 'GAY' },
  { type: 'emoji', value: '👨‍❤️‍💋‍👨' },
  { type: 'text', value: 'GAY' },
  { type: 'text', value: 'GAY' },
  { type: 'emoji', value: '👨‍❤️‍💋‍👨' },
  { type: 'text', value: 'GAY' },
  { type: 'text', value: 'GAY' },
];

/* ═══════════════════════════════════════════════════════════════
   BURST PARTICLE
   ═══════════════════════════════════════════════════════════════ */
function BurstParticle({ x, y, angle, id, onComplete, content, isText }) {
  const distance = 45 + Math.random() * 90;
  const size = isText ? (11 + Math.random() * 7) : (14 + Math.random() * 16);
  const targetX = Math.cos(angle) * distance;
  const targetY = Math.sin(angle) * distance;

  return (
    <motion.div
      className="fixed pointer-events-none select-none"
      style={{
        left: x,
        top: y,
        fontSize: `${size}px`,
        transform: 'translate(-50%, -50%)',
        fontWeight: isText ? 900 : 400,
        fontFamily: isText ? "'Inter', sans-serif" : 'inherit',
        background: isText
          ? 'linear-gradient(135deg, #7c3aed, #8b5cf6, #a78bfa)'
          : 'none',
        WebkitBackgroundClip: isText ? 'text' : 'unset',
        WebkitTextFillColor: isText ? 'transparent' : 'unset',
        textShadow: 'none',
        letterSpacing: isText ? '0.12em' : 'normal',
        filter: isText ? 'drop-shadow(0 0 8px rgba(124,58,237,0.6))' : 'none',
      }}
      initial={{ opacity: 1, scale: 0 }}
      animate={{
        opacity: [1, 1, 0],
        scale: [0, 1.3, 0.4],
        x: [0, targetX],
        y: [0, targetY - 20],
        rotate: [0, (Math.random() - 0.5) * 200],
      }}
      transition={{ duration: 0.65 + Math.random() * 0.3, ease: 'easeOut' }}
      onAnimationComplete={() => onComplete(id)}
    >
      {content}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CLICK BURST — Phase-aware
   ═══════════════════════════════════════════════════════════════ */
export default function ClickBurst({ mode = 'love' }) {
  const [bursts, setBursts] = useState([]);
  const [nextId, setNextId] = useState(0);

  const isGay = mode === 'gay';
  const lovePool = useMemo(() => LOVE_EMOJIS, []);
  const gayPool = useMemo(() => GAY_ITEMS, []);

  const handleClick = useCallback((e) => {
    const x = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    const y = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
    const count = 8 + Math.floor(Math.random() * 5);
    const particles = [];

    setNextId(prev => {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;

        if (isGay) {
          const item = gayPool[Math.floor(Math.random() * gayPool.length)];
          particles.push({
            id: prev + i,
            x, y, angle,
            content: item.value,
            isText: item.type === 'text',
          });
        } else {
          const emoji = lovePool[Math.floor(Math.random() * lovePool.length)];
          particles.push({
            id: prev + i,
            x, y, angle,
            content: emoji,
            isText: false,
          });
        }
      }
      setBursts(prevBursts => {
        const filtered = prevBursts.length > 35 ? prevBursts.slice(-18) : prevBursts;
        return [...filtered, ...particles];
      });
      return prev + count;
    });
  }, [isGay, gayPool, lovePool]);

  useEffect(() => {
    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleClick, { passive: true });
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleClick);
    };
  }, [handleClick]);

  const removeBurst = (id) => {
    setBursts(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
      <AnimatePresence>
        {bursts.map(burst => (
          <BurstParticle
            key={burst.id}
            {...burst}
            onComplete={removeBurst}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
