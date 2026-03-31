import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ANGRY_EMOJIS = ['😡', '🤬', '👿', '💢', '🔥', '⛔', '🚫', '😤'];

function FloatingAngryEmoji({ delay }) {
  const emoji = ANGRY_EMOJIS[Math.floor(Math.random() * ANGRY_EMOJIS.length)];
  const x = Math.random() * 100;
  const size = 30 + Math.random() * 40;

  return (
    <motion.div
      className="fixed pointer-events-none select-none"
      style={{
        left: `${x}%`,
        top: `${Math.random() * 100}%`,
        fontSize: `${size}px`,
        zIndex: 100,
      }}
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={{
        opacity: [0, 1, 1, 0.8],
        scale: [0, 1.5, 1, 1.2],
        rotate: [0, -20, 20, -15, 15, -10, 10, 0],
        x: [0, -10, 10, -8, 8, -5, 5, 0],
      }}
      transition={{
        duration: 1.5,
        delay: delay,
        repeat: Infinity,
        repeatType: 'mirror',
      }}
    >
      {emoji}
    </motion.div>
  );
}

export default function AngryScreen() {
  const [emojis] = useState(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      delay: Math.random() * 0.8,
    }))
  );

  const handleLeave = () => {
    try {
      window.location.href = 'https://google.com';
    } catch {
      window.close();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ zIndex: 9990 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Aggressive red background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #7f0000, #cc0000, #990000, #ff0000)',
          backgroundSize: '400% 400%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 100%', '100% 0%', '0% 0%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Red pulsing overlay */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'rgba(255, 0, 0, 0.3)' }}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />

      {/* Floating angry emojis */}
      {emojis.map(e => (
        <FloatingAngryEmoji key={e.id} delay={e.delay} />
      ))}

      {/* Central message */}
      <motion.div
        className="relative text-center px-6"
        style={{ zIndex: 101 }}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <motion.h1
          className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-8 leading-tight"
          style={{
            textShadow: '0 0 20px rgba(255,0,0,0.8), 0 0 40px rgba(255,0,0,0.5)',
          }}
          animate={{
            x: [-5, 5, -5, 5, 0],
            rotate: [-1, 1, -1, 1, 0],
          }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
          }}
        >
          cút ngay 😡
          <br />
          đây là web cho
          <br />
          <span className="text-pink-300">Tina iu</span> của taoo 💕
        </motion.h1>

        <motion.button
          onClick={handleLeave}
          className="px-8 py-4 rounded-2xl text-xl font-bold text-white cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #4a0000, #800000)',
            border: '2px solid rgba(255, 100, 100, 0.5)',
            boxShadow: '0 0 30px rgba(255, 0, 0, 0.5)',
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: '0 0 50px rgba(255, 0, 0, 0.8)',
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -5, 0],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          🚪 Rời khỏi trang
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
