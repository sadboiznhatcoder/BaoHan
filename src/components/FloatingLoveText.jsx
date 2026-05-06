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
    duration: Math.random() * 30 + 30, // Super smooth slow fall
    delay: -(Math.random() * 60), // Start scattered immediately
    opacity: Math.random() * 0.15 + 0.1, // Dreamy visibility
    scale: Math.random() * 0.5 + 0.7,
    sway: (Math.random() - 0.5) * 60
  })), []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {texts.map((item) => (
        <motion.div 
          key={item.id} 
          className="absolute whitespace-nowrap font-serif italic text-pink-200" 
          style={{ left: item.left, opacity: item.opacity, scale: item.scale }} 
          animate={{ 
            y: ['-20vh', '120vh'], // FALL FROM TOP TO BOTTOM
            x: [0, item.sway, 0] 
          }} 
          transition={{ 
            duration: item.duration, 
            delay: item.delay, 
            repeat: Infinity, // FOREVER
            ease: 'linear' 
          }}
        >
          {item.text}
        </motion.div>
      ))}
    </div>
  );
}
