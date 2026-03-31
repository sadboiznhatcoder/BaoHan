import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BURST_HEARTS = ['💖', '💕', '💗', '💘', '💝', '❤️', '🩷', '✨', '🌸', '💫', '⭐'];

function BurstParticle({ x, y, angle, id, onComplete }) {
  const emoji = BURST_HEARTS[Math.floor(Math.random() * BURST_HEARTS.length)];
  const distance = 40 + Math.random() * 80;
  const size = 12 + Math.random() * 16;
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
      }}
      initial={{ opacity: 1, scale: 0 }}
      animate={{
        opacity: [1, 1, 0],
        scale: [0, 1.2, 0.5],
        x: [0, targetX],
        y: [0, targetY - 20],
        rotate: [0, (Math.random() - 0.5) * 180],
      }}
      transition={{ duration: 0.6 + Math.random() * 0.3, ease: 'easeOut' }}
      onAnimationComplete={() => onComplete(id)}
    >
      {emoji}
    </motion.div>
  );
}

export default function ClickBurst() {
  const [bursts, setBursts] = useState([]);
  const [nextId, setNextId] = useState(0);

  const handleClick = useCallback((e) => {
    const x = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    const y = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
    const count = 8 + Math.floor(Math.random() * 5);
    const particles = [];
    
    setNextId(prev => {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        particles.push({ id: prev + i, x, y, angle });
      }
      setBursts(prevBursts => {
        const filtered = prevBursts.length > 30 ? prevBursts.slice(-15) : prevBursts;
        return [...filtered, ...particles];
      });
      return prev + count;
    });
  }, []);

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
