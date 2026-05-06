import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function FloatingFlowers() {
  const flowers = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => {
      const size = Math.random() * 20 + 10;
      return {
        id: i,
        left: `${Math.random() * 100}vw`,
        top: `-${Math.random() * 20 + 10}vh`,
        size,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.5 + 0.3,
        drift: (Math.random() - 0.5) * 100,
        rotation: Math.random() * 360,
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {flowers.map((f) => (
        <motion.div
          key={f.id}
          className="absolute"
          style={{
            left: f.left,
            top: f.top,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
          }}
          animate={{
            y: ['0vh', '120vh'],
            x: [0, f.drift, f.drift * 2],
            rotate: [f.rotation, f.rotation + 180, f.rotation + 360],
          }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* A simple glowing petal representation using radial gradient */}
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50% 0 50% 50%',
              background: 'radial-gradient(circle at top left, rgba(255,200,220,0.8), rgba(255,255,255,0.2))',
              boxShadow: '0 0 10px rgba(255,180,200,0.5)',
              transform: 'rotate(45deg)',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
