import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOVE_EMOJIS = ['🤍', '✨', '💫', '🌸', '🩷'];
const GAY_ITEMS = [
  { type: 'text', value: 'GAY' },
  { type: 'text', value: 'GAY' },
  { type: 'emoji', value: '👨‍❤️‍💋‍👨' },
];

export function CursorTrail({ mode = 'love' }) {
  const [trails, setTrails] = useState([]);
  const [nextId, setNextId] = useState(0);
  const isGay = mode === 'gay';

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

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9998 }}>
      <AnimatePresence>
        {trails.map(trail => {
          if (isGay) {
            const item = GAY_ITEMS[Math.floor(Math.random() * GAY_ITEMS.length)];
            const isText = item.type === 'text';
            return (
              <motion.div
                key={trail.id}
                className="fixed pointer-events-none select-none"
                style={{
                  left: trail.x, top: trail.y,
                  fontSize: isText ? `${10 + Math.random() * 6}px` : `${14 + Math.random() * 8}px`,
                  transform: 'translate(-50%, -50%)',
                  fontWeight: isText ? 900 : 400,
                  fontFamily: isText ? "'Inter', sans-serif" : 'inherit',
                  background: isText ? 'linear-gradient(135deg, #fce7f3, #fbcfe8)' : 'none',
                  WebkitBackgroundClip: isText ? 'text' : 'unset',
                  WebkitTextFillColor: isText ? 'transparent' : 'unset',
                  letterSpacing: isText ? '0.12em' : 'normal',
                  filter: isText ? 'drop-shadow(0 0 8px rgba(255,255,255,0.8))' : 'none',
                }}
                initial={{ opacity: 0.8, scale: 1 }}
                animate={{ opacity: 0, scale: 0.2, y: -25 - Math.random() * 25, x: (Math.random() - 0.5) * 30, rotate: (Math.random() - 0.5) * 40 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                onAnimationComplete={() => setTrails(prev => prev.filter(t => t.id !== trail.id))}
              >
                {item.value}
              </motion.div>
            );
          } else {
            const emoji = LOVE_EMOJIS[Math.floor(Math.random() * LOVE_EMOJIS.length)];
            return (
              <motion.div
                key={trail.id}
                className="fixed pointer-events-none select-none"
                style={{
                  left: trail.x, top: trail.y,
                  fontSize: `${12 + Math.random() * 12}px`,
                  transform: 'translate(-50%, -50%)',
                  filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))'
                }}
                initial={{ opacity: 0.6, scale: 1 }}
                animate={{ opacity: 0, scale: 0.3, y: -20 - Math.random() * 20, x: (Math.random() - 0.5) * 20 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                onAnimationComplete={() => setTrails(prev => prev.filter(t => t.id !== trail.id))}
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

export function ClickBurst({ mode = 'love' }) {
  const [bursts, setBursts] = useState([]);
  const [nextId, setNextId] = useState(0);
  const isGay = mode === 'gay';

  const handleClick = useCallback((e) => {
    const x = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    const y = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
    const count = 8 + Math.floor(Math.random() * 5);
    const particles = [];

    setNextId(prev => {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        if (isGay) {
          const item = GAY_ITEMS[Math.floor(Math.random() * GAY_ITEMS.length)];
          particles.push({ id: prev + i, x, y, angle, content: item.value, isText: item.type === 'text' });
        } else {
          const emoji = LOVE_EMOJIS[Math.floor(Math.random() * LOVE_EMOJIS.length)];
          particles.push({ id: prev + i, x, y, angle, content: emoji, isText: false });
        }
      }
      setBursts(prevBursts => {
        const filtered = prevBursts.length > 35 ? prevBursts.slice(-18) : prevBursts;
        return [...filtered, ...particles];
      });
      return prev + count;
    });
  }, [isGay]);

  useEffect(() => {
    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleClick, { passive: true });
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleClick);
    };
  }, [handleClick]);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
      <AnimatePresence>
        {bursts.map(burst => {
          const distance = 45 + Math.random() * 90;
          const size = burst.isText ? (11 + Math.random() * 7) : (14 + Math.random() * 16);
          const targetX = Math.cos(burst.angle) * distance;
          const targetY = Math.sin(burst.angle) * distance;

          return (
            <motion.div
              key={burst.id}
              className="fixed pointer-events-none select-none"
              style={{
                left: burst.x, top: burst.y,
                fontSize: `${size}px`,
                transform: 'translate(-50%, -50%)',
                fontWeight: burst.isText ? 900 : 400,
                fontFamily: burst.isText ? "'Inter', sans-serif" : 'inherit',
                background: burst.isText ? 'linear-gradient(135deg, #ffffff, #fbcfe8)' : 'none',
                WebkitBackgroundClip: burst.isText ? 'text' : 'unset',
                WebkitTextFillColor: burst.isText ? 'transparent' : 'unset',
                letterSpacing: burst.isText ? '0.12em' : 'normal',
                filter: burst.isText ? 'drop-shadow(0 0 10px rgba(255,255,255,0.8))' : 'drop-shadow(0 0 8px rgba(255,255,255,0.4))',
              }}
              initial={{ opacity: 1, scale: 0 }}
              animate={{ opacity: [1, 1, 0], scale: [0, 1.3, 0.4], x: [0, targetX], y: [0, targetY - 20], rotate: [0, (Math.random() - 0.5) * 200] }}
              transition={{ duration: 0.65 + Math.random() * 0.3, ease: 'easeOut' }}
              onAnimationComplete={() => setBursts(prev => prev.filter(b => b.id !== burst.id))}
            >
              {burst.content}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    let nextId = 0;
    const interval = setInterval(() => {
      setHearts(prev => {
        const filtered = prev.length > 20 ? prev.slice(-15) : prev;
        return [...filtered, { id: nextId++ }];
      });
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
      <AnimatePresence>
        {hearts.map(heart => {
          const emoji = LOVE_EMOJIS[Math.floor(Math.random() * LOVE_EMOJIS.length)];
          const startX = Math.random() * 100;
          const size = 16 + Math.random() * 24;
          const duration = 6 + Math.random() * 8;
          const drift = (Math.random() - 0.5) * 80;

          return (
            <motion.div
              key={heart.id}
              className="fixed pointer-events-none select-none"
              style={{
                left: `${startX}%`, bottom: '-40px', fontSize: `${size}px`, zIndex: 5,
                filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))'
              }}
              initial={{ y: 0, x: 0, opacity: 0, rotate: 0 }}
              animate={{
                y: [0, -window.innerHeight - 100],
                x: [0, drift * 0.3, drift, drift * 0.7, drift * 0.5],
                opacity: [0, 0.4, 0.5, 0.3, 0],
                rotate: [0, 15, -10, 20, -5],
              }}
              transition={{ duration, delay: Math.random() * 2, ease: 'linear' }}
              onAnimationComplete={() => setHearts(prev => prev.filter(h => h.id !== heart.id))}
            >
              {emoji}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

const PHRASES = ['anh yêu mỗi Bảo Hân đó', 'Tina của anh', 'Bảo Hân xinh nhất', 'Yêu Tina nhất trên đời'];
function sr(seed) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}
const ITEMS = Array.from({ length: 150 }, (_, i) => ({
  id: i,
  text: PHRASES[i % PHRASES.length],
  left: `${sr(i * 7) * 100}%`,
  fontSize: `${13 + sr(i * 7 + 1) * 16}px`,
  rawOpacity: sr(i * 7 + 2),
  duration: `${10 + sr(i * 7 + 3) * 15}s`,
  delay: `${-(sr(i * 7 + 4) * 20)}s`,
}));

export function FloatingLoveText({ opacity = 0.5, zIndex = 8 }) {
  const els = useMemo(() => ITEMS.map((it) => {
    const itemOpacity = (0.1 + it.rawOpacity * 0.3) * opacity;
    return (
      <div
        key={it.id}
        className="flt-item"
        style={{
          left: it.left,
          fontSize: it.fontSize,
          opacity: itemOpacity,
          color: 'rgba(255, 240, 245, 0.9)', 
          '--dur': it.duration,
          '--del': it.delay,
        }}
      >
        {it.text}
      </div>
    );
  }), [opacity]);

  return <div className="flt-layer" style={{ zIndex }}>{els}</div>;
}
