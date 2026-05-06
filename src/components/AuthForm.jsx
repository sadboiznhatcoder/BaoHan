import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CUTE_ERRORS = [
  'Sai rồi bé ơi~ Thử lại nha 🥺💕',
  'Hmm... không đúng rồi, cố lên nào 🌸',
  'Ôi sai mất, nhớ lại xem nào 💖',
  'Chưa đúng nè, thử lại lần nữa nhaa 🩷',
];

export default function AuthForm({ onSuccess, onFail, onBack }) {
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(3);
  const [error, setError] = useState('');
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '08032009' || password.toUpperCase() === 'TINA') {
      onSuccess();
    } else {
      const remaining = attempts - 1;
      setAttempts(remaining);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);

      if (remaining <= 0) {
        onFail(); // Triggers AngryScreen
      } else {
        setError(CUTE_ERRORS[Math.floor(Math.random() * CUTE_ERRORS.length)] + ` (Còn ${remaining} lần)`);
      }
    }
  };

  return (
    <motion.div className="w-full flex items-center justify-center p-4 relative z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        className="relative liquid-glass-strong rounded-3xl p-6 sm:p-8 w-full max-w-md"
        initial={{ scale: 0.9, y: 20 }}
        animate={shaking ? { scale: 1, y: 0, x: [-10, 10, -8, 8, -5, 5, 0] } : { scale: 1, y: 0, x: 0 }}
        transition={shaking ? { duration: 0.4 } : { type: 'spring', damping: 20 }}
      >
        {onBack && <button onClick={onBack} className="absolute top-4 left-4 text-white/50 hover:text-white transition-colors text-sm">← Back</button>}
        
        <div className="text-center mb-8 mt-4">
          <motion.div className="text-5xl mb-4" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>🔐</motion.div>
          <h2 className="text-3xl font-bold mb-2 font-serif italic text-pink-300">Xác minh danh tính 💕</h2>
          <p className="text-white/70 text-sm">Nhập mật khẩu bí mật để vào thế giới của chúng ta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="password"
            placeholder="Nhập mật khẩu..."
            value={password}
            onChange={e => { setPassword(e.target.value); setError(''); }}
            className="w-full px-5 py-4 rounded-xl text-lg text-center tracking-widest text-white transition-all duration-300 outline-none"
            style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
          />

          <AnimatePresence>
            {error && (
              <motion.div className="text-center py-3 px-4 rounded-xl" style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)' }} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <p className="text-pink-300 text-sm">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button type="submit" className="w-full py-4 rounded-2xl text-lg font-semibold text-white uppercase" style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.8), rgba(244, 63, 94, 0.8))' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Mở Khóa
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
