import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const QUOTES = [
  "yêu Bảo Hân nhất trên đời", 
  "anh chỉ yêu mình Bảo Hân", 
  "làm vợ anh nhé Bảo Hân", 
  "cô dâu Bảo Hân xinh nhất của tôi"
];

export default function FloatingLoveText() {
  const texts = useMemo(() => Array.from({ length: 80 }).map((_, i) => ({
    id: i,
    text: QUOTES[Math.floor(Math.random() * QUOTES.length)],
    left: `${Math.random() * 100}vw`,
    // Pre-scatter heavily across vertical space
    top: `${Math.random() * 200 - 50}vh`,
    // Very slow and smooth duration (30s to 60s)
    duration: Math.random() * 30 + 30,
    // Negative delay ensures they are already moving when the page loads
    delay: Math.random() * -40,
    // Slightly more visible: between 0.1 and 0.25 opacity
    opacity: Math.random() * 0.15 + 0.1,
    scale: Math.random() * 0.6 + 0.6,
  })), []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {texts.map((item) => (
        <motion.div 
          key={item.id} 
          className="absolute whitespace-nowrap font-serif italic text-pink-200" 
          style={{ left: item.left, top: item.top, opacity: item.opacity, scale: item.scale }} 
          animate={{ 
            y: ['0vh', '-150vh'], 
            x: [0, Math.random() * 60 - 30, 0] 
          }} 
          transition={{ 
            duration: item.duration, 
            delay: item.delay, 
            repeat: Infinity, 
            ease: 'linear' 
          }}
        >
          {item.text}
        </motion.div>
      ))}
    </div>
  );
}
