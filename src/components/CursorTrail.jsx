import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TRAIL_HEARTS = ['💕', '💖', '🩷', '💗', '✨'];

export default function CursorTrail() {
  const [trails, setTrails] = useState([]);
  const [nextId, setNextId] = useState(0);

  const handleMove = useCallback((e) => {
    const x = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    const y = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;

    if (x === 0 && y === 0) return;

    setNextId(prev => {
      const id = prev;
      setTrails(prevTrails => {
        const filtered = prevTrails.length > 12 ? prevTrails.slice(-8) : prevTrails;
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
      setTimeout(() => { throttle = false; }, 60);
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
        {trails.map(trail => (
          <motion.div
            key={trail.id}
            className="fixed pointer-events-none select-none"
            style={{
              left: trail.x,
              top: trail.y,
              fontSize: `${10 + Math.random() * 10}px`,
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
            {TRAIL_HEARTS[Math.floor(Math.random() * TRAIL_HEARTS.length)]}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
