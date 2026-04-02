import { motion } from 'framer-motion';
import FloatingLoveText from './FloatingLoveText';
import HightechTerminal from './HightechTerminal';

export default function GatekeeperScreen({ onYes, onNo }) {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 50 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #1a0011 0%, #2d0a1f 30%, #1a0025 60%, #0d001a 100%)',
        }}
      />

      {/* Ambient orbs */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(244,63,94,0.15), transparent)',
          top: '20%',
          left: '10%',
          filter: 'blur(60px)',
        }}
        animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(168,85,247,0.1), transparent)',
          bottom: '10%',
          right: '10%',
          filter: 'blur(80px)',
        }}
        animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ★ Full-intensity floating love text */}
      <FloatingLoveText baseOpacity={1.0} zIndex={8} />

      <HightechTerminal />

      {/* Central modal */}
      <motion.div
        className="relative rounded-3xl p-8 sm:p-10 mx-4 max-w-md w-full text-center"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow:
            '0 0 60px rgba(244, 63, 94, 0.2), 0 20px 60px rgba(0,0,0,0.4)',
          zIndex: 60,
        }}
        initial={{ scale: 0, rotate: -5 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.3 }}
      >
        <motion.div
          className="absolute -top-6 left-1/2 text-4xl"
          style={{ transform: 'translateX(-50%)' }}
          animate={{ y: [0, -8, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💕
        </motion.div>

        <motion.h2
          className="text-2xl sm:text-3xl font-bold mb-2"
          style={{
            fontFamily: "'Dancing Script', cursive",
            background: 'linear-gradient(135deg, #f9a8d4, #f472b6, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Xin chào! 🌸
        </motion.h2>

        <p className="text-white/80 text-lg sm:text-xl mb-8 mt-4 font-medium">
          Bạn có phải{' '}
          <span style={{ color: '#f9a8d4' }}>Bảo Hân</span> không? 🤔
        </p>

        <div className="flex gap-4 justify-center">
          <motion.button
            onClick={onYes}
            className="px-8 py-3.5 rounded-2xl text-lg font-semibold text-white cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
              boxShadow: '0 4px 20px rgba(244, 63, 94, 0.4)',
            }}
            whileHover={{
              scale: 1.08,
              boxShadow: '0 8px 30px rgba(244, 63, 94, 0.6)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            Có 💕
          </motion.button>

          <motion.button
            onClick={onNo}
            className="px-8 py-3.5 rounded-2xl text-lg font-semibold cursor-pointer"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'rgba(255, 255, 255, 0.7)',
            }}
            whileHover={{
              scale: 1.08,
              background: 'rgba(255, 255, 255, 0.15)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            Không 🙅
          </motion.button>
        </div>

        <motion.p
          className="mt-6 text-sm"
          style={{
            fontFamily: "'Dancing Script', cursive",
            color: 'rgba(249, 168, 212, 0.6)',
          }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          made with 💖 by Nhật
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
