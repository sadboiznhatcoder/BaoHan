import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HEART_EMOJIS = ['💕', '💖', '💗', '💘', '💝', '❤️', '🩷', '🌸', '✨', '💫'];

function FloatingHeart({ id, onComplete }) {
  const emoji = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
  const startX = Math.random() * 100;
  const size = 16 + Math.random() * 24;
  const duration = 6 + Math.random() * 8;
  const delay = Math.random() * 2;
  const drift = (Math.random() - 0.5) * 80;

  return (
    <motion.div
      className="fixed pointer-events-none select-none"
      style={{
        left: `${startX}%`,
        bottom: '-40px',
        fontSize: `${size}px`,
        zIndex: 5,
      }}
      initial={{ y: 0, x: 0, opacity: 0, rotate: 0 }}
      animate={{
        y: [0, -window.innerHeight - 100],
        x: [0, drift * 0.3, drift, drift * 0.7, drift * 0.5],
        opacity: [0, 0.8, 0.9, 0.7, 0],
        rotate: [0, 15, -10, 20, -5],
      }}
      transition={{
        duration,
        delay,
        ease: 'linear',
      }}
      onAnimationComplete={() => onComplete(id)}
    >
      {emoji}
    </motion.div>
  );
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    let nextId = 0;
    const interval = setInterval(() => {
      setHearts(prev => {
        // Keep max 20 hearts at once for performance
        const filtered = prev.length > 20 ? prev.slice(-15) : prev;
        return [...filtered, { id: nextId++ }];
      });
    }, 600);

    return () => clearInterval(interval);
  }, []);

  const removeHeart = (id) => {
    setHearts(prev => prev.filter(h => h.id !== id));
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
      <AnimatePresence>
        {hearts.map(heart => (
          <FloatingHeart key={heart.id} id={heart.id} onComplete={removeHeart} />
        ))}
      </AnimatePresence>
    </div>
  );
}
