import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const QUOTES = ["yêu Bảo Hân nhất trên đời", "anh chỉ yêu mình Bảo Hân", "làm vợ anh nhé Bảo Hân", "cô dâu Bảo Hân xinh nhất của tôi"];

export default function FloatingLoveText() {
  const texts = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    text: QUOTES[Math.floor(Math.random() * QUOTES.length)],
    left: `${Math.random() * 100}vw`,
    top: `${Math.random() * 100}vh`,
    duration: Math.random() * 20 + 20,
    delay: Math.random() * -20,
    opacity: Math.random() * 0.15 + 0.05,
    scale: Math.random() * 0.5 + 0.7,
  })), []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {texts.map((item) => (
        <motion.div key={item.id} className="absolute whitespace-nowrap font-serif italic text-pink-200" style={{ left: item.left, top: item.top, opacity: item.opacity, scale: item.scale }} animate={{ y: ['0vh', '-100vh'], x: [0, Math.random() * 50 - 25, 0] }} transition={{ duration: item.duration, delay: item.delay, repeat: Infinity, ease: 'linear' }}>
          {item.text}
        </motion.div>
      ))}
    </div>
  );
}
