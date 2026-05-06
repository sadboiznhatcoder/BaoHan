import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CUTE_ERRORS = [
  'Sai rồi bé ơi~ Thử lại nha 🥺💕',
  'Hmm... không đúng rồi, cố lên nào 🌸',
  'Ôi sai mất, nhớ lại xem nào 💖',
  'Chưa đúng nè, thử lại lần nữa nhaa 🩷',
  'Ai đây nè? Sao trả lời sai vậy 😤💕',
];

function removeAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

export default function AuthSection({ onSuccess, onFail }) {
  const [answers, setAnswers] = useState({ birthday: '', phone: '', nickname: '', handsome: '' });
  const [attempts, setAttempts] = useState(3);
  const [error, setError] = useState('');
  const [shaking, setShaking] = useState(false);

  const handleChange = (field, value) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const validate = () => {
    if (answers.birthday !== '08/03/2009') return false;
    if (answers.phone !== '0707080940') return false;
    if (answers.nickname.toUpperCase().trim() !== 'TINA') return false;
    if (removeAccents(answers.handsome.toUpperCase().trim()) !== 'VO MINH NHAT') return false;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSuccess();
    } else {
      const remaining = attempts - 1;
      setAttempts(remaining);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);

      if (remaining <= 0) onFail();
      else setError(CUTE_ERRORS[Math.floor(Math.random() * CUTE_ERRORS.length)] + ` (Còn ${remaining} lần)`);
    }
  };

  const inputClass = "w-full px-5 py-3.5 liquid-glass text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all duration-300";

  return (
    <motion.div
      className="w-full max-w-md mx-auto liquid-glass-strong p-8 sm:p-10"
      initial={{ opacity: 0, y: 30 }}
      animate={shaking ? { x: [-10, 10, -8, 8, -5, 5, 0] } : { opacity: 1, y: 0, x: 0 }}
      transition={shaking ? { duration: 0.4 } : { duration: 0.8, delay: 0.5 }}
      style={{ borderRadius: '2rem' }}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold tracking-wide mb-2">Gatekeeper Authentication</h2>
        <p className="text-sm text-white/60">Identify yourself to unlock the universe.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-widest">
            Date of Birth
          </label>
          <input
            type="text"
            placeholder="DD/MM/YYYY"
            value={answers.birthday}
            onChange={e => {
              const digits = e.target.value.replace(/\D/g, '').slice(0, 8);
              let formatted = '';
              if (digits.length > 0) formatted = digits.slice(0, 2);
              if (digits.length > 2) formatted += '/' + digits.slice(2, 4);
              if (digits.length > 4) formatted += '/' + digits.slice(4, 8);
              handleChange('birthday', formatted);
            }}
            className={inputClass}
            style={{ borderRadius: '1rem' }}
            inputMode="numeric"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-widest">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="Enter digits..."
            value={answers.phone}
            onChange={e => {
              const val = e.target.value.replace(/\D/g, '');
              if (val.length <= 10) handleChange('phone', val);
            }}
            className={inputClass}
            style={{ borderRadius: '1rem' }}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-widest">
            Nickname
          </label>
          <input
            type="text"
            placeholder="Home name..."
            value={answers.nickname}
            onChange={e => handleChange('nickname', e.target.value.toUpperCase())}
            className={`${inputClass} uppercase`}
            style={{ borderRadius: '1rem' }}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-widest">
            Most Handsome Person
          </label>
          <input
            type="text"
            placeholder="Full name..."
            value={answers.handsome}
            onChange={e => handleChange('handsome', e.target.value.toUpperCase())}
            className={`${inputClass} uppercase`}
            style={{ borderRadius: '1rem' }}
          />
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-center text-rose-300 text-sm py-2"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          className="w-full py-4 mt-4 text-sm font-bold tracking-widest uppercase text-white cursor-pointer liquid-glass hover:bg-white/10 transition-colors"
          style={{ borderRadius: '1rem' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Unlock Portal
        </motion.button>
      </form>
    </motion.div>
  );
}
