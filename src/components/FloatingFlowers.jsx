import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function FloatingFlowers() {
  const flowers = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      top: `-${Math.random() * 20 + 10}vh`,
      size: Math.random() * 15 + 10,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 15,
      drift: (Math.random() - 0.5) * 100,
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {flowers.map(f => (
        <motion.div
          key={f.id}
          className="absolute rounded-full"
          style={{
            width: f.size,
            height: f.size,
            background: 'radial-gradient(circle at center, rgba(255,192,203,0.8), rgba(255,255,255,0.2))',
            filter: 'blur(2px)',
          }}
          initial={{ x: 0, y: f.top, opacity: 0 }}
          animate={{
            x: [0, f.drift, 0],
            y: ['0vh', '110vh'],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
