import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CUTE_ERRORS = [
  'Sai rồi bé ơi~ Thử lại nha 🥺💕',
  'Hmm... không đúng rồi, cố lên nào 🌸',
  'Ôi sai mất, nhớ lại xem nào 💖',
  'Chưa đúng nè, thử lại lần nữa nhaa 🩷',
  'Ai đây nè? Sao trả lời sai vậy 😤💕',
];

function removeAccents(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

export default function AuthForm({ onSuccess, onFail }) {
  const [answers, setAnswers] = useState({
    birthday: '',
    phone: '',
    nickname: '',
    handsome: '',
  });
  const [attempts, setAttempts] = useState(3);
  const [error, setError] = useState('');
  const [shaking, setShaking] = useState(false);

  const handleChange = (field, value) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const validate = () => {
    const { birthday, phone, nickname, handsome } = answers;

    // Validate birthday: must be 08/03/2009
    if (birthday !== '08/03/2009') return false;

    // Validate phone
    if (phone !== '0707080940') return false;

    // Validate nickname (auto-capitalize, compare uppercase)
    if (nickname.toUpperCase().trim() !== 'TINA') return false;

    // Validate handsome (auto-uppercase, remove accents)
    const cleaned = removeAccents(handsome.toUpperCase().trim());
    if (cleaned !== 'VO MINH NHAT') return false;

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

      if (remaining <= 0) {
        onFail();
      } else {
        setError(CUTE_ERRORS[Math.floor(Math.random() * CUTE_ERRORS.length)] + ` (Còn ${remaining} lần)`);
      }
    }
  };

  const inputStyle = {
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    color: 'white',
    outline: 'none',
  };

  const inputFocusClass = 'focus:border-pink-400/50 focus:ring-2 focus:ring-pink-400/20';

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 50 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1a0011 0%, #2d0a1f 30%, #1a0025 60%, #0d001a 100%)',
        }}
      />

      {/* Ambient orbs */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 250,
          height: 250,
          background: 'radial-gradient(circle, rgba(236,72,153,0.12), transparent)',
          top: '15%',
          right: '20%',
          filter: 'blur(60px)',
        }}
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="relative glass-strong rounded-3xl p-6 sm:p-8 w-full max-w-md overflow-y-auto"
        style={{
          maxHeight: '90vh',
          boxShadow: '0 0 60px rgba(244, 63, 94, 0.15), 0 20px 60px rgba(0,0,0,0.3)',
          zIndex: 51,
        }}
        initial={{ scale: 0.8, y: 50 }}
        animate={shaking ? {
          scale: 1,
          y: 0,
          x: [-10, 10, -8, 8, -5, 5, 0],
        } : { scale: 1, y: 0, x: 0 }}
        transition={shaking ? { duration: 0.4 } : { type: 'spring', damping: 20 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="text-4xl mb-3"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🔐
          </motion.div>
          <h2
            className="text-2xl font-bold mb-1"
            style={{
              fontFamily: "'Dancing Script', cursive",
              background: 'linear-gradient(135deg, #f9a8d4, #f472b6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Xác minh danh tính 💕
          </h2>
          <p className="text-white/50 text-sm">
            Trả lời đúng để vào nhaa~ ({attempts} lần thử)
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Q1: Birthday */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-pink-300/80 mb-1.5">
              🎂 Ngày tháng năm sinh của ẻm?
            </label>
            <input
              type="text"
              placeholder="DD/MM/YYYY"
              value={answers.birthday}
              onChange={e => {
                // Strip everything except digits
                const digits = e.target.value.replace(/\D/g, '').slice(0, 8);
                // Auto-format as DD/MM/YYYY
                let formatted = '';
                if (digits.length > 0) formatted = digits.slice(0, 2);
                if (digits.length > 2) formatted += '/' + digits.slice(2, 4);
                if (digits.length > 4) formatted += '/' + digits.slice(4, 8);
                handleChange('birthday', formatted);
              }}
              className={`w-full px-4 py-3.5 rounded-xl text-base ${inputFocusClass} transition-all duration-200`}
              style={inputStyle}
              inputMode="numeric"
              maxLength={10}
            />
          </motion.div>

          {/* Q2: Phone */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-medium text-pink-300/80 mb-1.5">
              📱 Số điện thoại?
            </label>
            <input
              type="tel"
              placeholder="Nhập số điện thoại..."
              value={answers.phone}
              onChange={e => {
                const val = e.target.value.replace(/\D/g, '');
                if (val.length <= 10) handleChange('phone', val);
              }}
              className={`w-full px-4 py-3.5 rounded-xl text-base ${inputFocusClass} transition-all duration-200`}
              style={inputStyle}
              inputMode="tel"
              maxLength={10}
            />
          </motion.div>

          {/* Q3: Nickname */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-medium text-pink-300/80 mb-1.5">
              🏠 Tên gọi ở nhà?
            </label>
            <input
              type="text"
              placeholder="Nhập tên gọi ở nhà..."
              value={answers.nickname}
              onChange={e => handleChange('nickname', e.target.value.toUpperCase())}
              className={`w-full px-4 py-3.5 rounded-xl text-base ${inputFocusClass} transition-all duration-200 uppercase`}
              style={inputStyle}
              autoCapitalize="characters"
            />
          </motion.div>

          {/* Q4: Who's most handsome */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-sm font-medium text-pink-300/80 mb-1.5">
              👑 Ai đẹp trai nhất thế giới?
            </label>
            <input
              type="text"
              placeholder="Nhập câu trả lời..."
              value={answers.handsome}
              onChange={e => handleChange('handsome', e.target.value.toUpperCase())}
              className={`w-full px-4 py-3.5 rounded-xl text-base ${inputFocusClass} transition-all duration-200 uppercase`}
              style={inputStyle}
              autoCapitalize="characters"
            />
          </motion.div>

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="text-center py-3 px-4 rounded-xl"
                style={{
                  background: 'rgba(244, 63, 94, 0.15)',
                  border: '1px solid rgba(244, 63, 94, 0.3)',
                }}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <p className="text-pink-300 text-sm">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit button */}
          <motion.button
            type="submit"
            className="w-full py-4 rounded-2xl text-lg font-semibold text-white cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #ec4899, #f43f5e, #a855f7)',
              backgroundSize: '200% auto',
              boxShadow: '0 4px 25px rgba(244, 63, 94, 0.4)',
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: '0 8px 35px rgba(244, 63, 94, 0.6)',
            }}
            whileTap={{ scale: 0.98 }}
            animate={{
              backgroundPosition: ['0% center', '100% center', '0% center'],
            }}
            transition={{
              backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' },
            }}
          >
            Xác nhận 💖
          </motion.button>
        </form>

        <motion.p
          className="text-center mt-4 text-xs text-white/30"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Chỉ có Bảo Hân mới trả lời được thôi~ 🌸
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
