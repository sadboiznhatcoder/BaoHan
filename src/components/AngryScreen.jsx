import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ANGRY_EMOJIS = ['😡', '🤬', '👿', '💢', '🔥', '⛔', '🚫', '😤'];

function FloatingAngryEmoji({ delay }) {
  const emoji = ANGRY_EMOJIS[Math.floor(Math.random() * ANGRY_EMOJIS.length)];
  const x = Math.random() * 100;
  const size = 30 + Math.random() * 40;

  return (
    <motion.div
      className="fixed pointer-events-none select-none"
      style={{
        left: `${x}%`, top: `${Math.random() * 100}%`, fontSize: `${size}px`, zIndex: 100,
      }}
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={{
        opacity: [0, 1, 1, 0.8], scale: [0, 1.5, 1, 1.2],
        rotate: [0, -20, 20, -15, 15, -10, 10, 0], x: [0, -10, 10, -8, 8, -5, 5, 0],
      }}
      transition={{ duration: 1.5, delay: delay, repeat: Infinity, repeatType: 'mirror' }}
    >
      {emoji}
    </motion.div>
  );
}

export default function AngryScreen() {
  const [emojis] = useState(() => Array.from({ length: 25 }, (_, i) => ({ id: i, delay: Math.random() * 0.8 })));

  const handleLeave = () => {
    try { window.location.href = 'https://google.com'; } 
    catch { window.close(); }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ zIndex: 9990 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Aggressive cinematic red background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #450a0a, #7f1d1d, #450a0a)',
          backgroundSize: '400% 400%',
        }}
        animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 100%', '100% 0%', '0% 0%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Dark overlay for cinematic feel */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Red pulsing overlay */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'rgba(255, 0, 0, 0.15)' }}
        animate={{ opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />

      {emojis.map(e => <FloatingAngryEmoji key={e.id} delay={e.delay} />)}

      <motion.div
        className="relative text-center px-6 liquid-glass-strong p-10 rounded-3xl"
        style={{ zIndex: 101, border: '1px solid rgba(255,0,0,0.3)' }}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.1, 1] }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-8 leading-tight tracking-wider"
          style={{ textShadow: '0 0 30px rgba(255,0,0,0.9), 0 0 60px rgba(255,0,0,0.5)', fontFamily: "'Inter', sans-serif" }}
          animate={{ x: [-5, 5, -5, 5, 0], rotate: [-1, 1, -1, 1, 0] }}
          transition={{ duration: 0.4, repeat: Infinity }}
        >
          CÚT NGAY 😡
          <br />
          <span className="text-2xl sm:text-3xl font-medium tracking-normal text-white/80 mt-4 block">
            Đây là web cho <span className="text-rose-400 font-bold">Tina iu</span> của taoo 💕
          </span>
        </motion.h1>

        <motion.button
          onClick={handleLeave}
          className="px-10 py-4 rounded-full text-xl font-bold text-white cursor-pointer mt-4"
          style={{
            background: 'rgba(255,0,0,0.2)',
            border: '1px solid rgba(255, 100, 100, 0.5)',
            backdropFilter: 'blur(10px)',
          }}
          whileHover={{ scale: 1.05, background: 'rgba(255,0,0,0.4)', boxShadow: '0 0 30px rgba(255, 0, 0, 0.6)' }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          🚪 Rời khỏi trang
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
