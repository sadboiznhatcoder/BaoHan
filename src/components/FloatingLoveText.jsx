import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const QUOTES = [
  "yêu Bảo Hân nhất trên đời", 
  "anh chỉ yêu mình Bảo Hân", 
  "làm vợ anh nhé Bảo Hân", 
  "cô dâu Bảo Hân xinh nhất của tôi"
];

export default function FloatingLoveText() {
  const texts = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      text: QUOTES[Math.floor(Math.random() * QUOTES.length)],
      left: `${Math.random() * 100}vw`,
      // Rơi rất chậm và mượt: từ 25s đến 60s cho một vòng
      duration: Math.random() * 35 + 25,
      // Delay âm cực lớn (-60s) để vừa mở web chữ đã rải kín màn hình
      delay: -(Math.random() * 60),
      // Opacity mờ mờ ảo ảo (từ 0.1 đến 0.2)
      opacity: Math.random() * 0.1 + 0.1,
      // Kích thước to nhỏ khác nhau tạo chiều sâu
      scale: Math.random() * 0.5 + 0.6,
      // Độ đung đưa nhẹ sang hai bên
      sway: (Math.random() - 0.5) * 50
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {texts.map((item) => (
        <motion.div 
          key={item.id} 
          className="absolute whitespace-nowrap font-serif italic text-pink-200" 
          style={{ left: item.left, opacity: item.opacity, scale: item.scale }} 
          initial={{ y: '-20vh' }}
          animate={{ 
            y: ['-20vh', '120vh'], // TRÔI TỪ TRÊN (âm) XUỐNG DƯỚI (dương)
            x: [0, item.sway, 0] // Đung đưa nhẹ
          }} 
          transition={{ 
            duration: item.duration, 
            delay: item.delay, 
            repeat: Infinity, // LẶP LẠI VÔ TẬN KHÔNG BAO GIỜ DỪNG
            ease: 'linear' 
          }}
        >
          {item.text}
        </motion.div>
      ))}
    </div>
  );
}
