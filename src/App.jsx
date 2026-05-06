import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import CursorTrail from './components/CursorTrail';
import ClickBurst from './components/ClickBurst';
import FloatingHearts from './components/FloatingHearts';
import FloatingLoveText from './components/FloatingLoveText';
import FadingVideo from './components/FadingVideo';
import BlurText from './components/BlurText';
import AuthForm from './components/AuthForm';
import LinktreePortal from './components/LinktreePortal';
import ChatApp from './components/ChatApp';
import AngryScreen from './components/AngryScreen';

import './index.css';

export default function App() {
  const [phase, setPhase] = useState('intro'); // 'intro' -> 'auth' -> 'portal' -> 'chat' -> 'angry'
  const effectMode = (phase === 'portal' || phase === 'chat') ? 'gay' : 'love';

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      
      {/* GLOBAL EFFECTS */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        {phase !== 'angry' && <CursorTrail mode={effectMode} />}
        {phase !== 'angry' && <ClickBurst mode={effectMode} />}
      </div>
      {(phase === 'intro' || phase === 'auth' || phase === 'chat') && <FloatingHearts />}
      <FloatingLoveText opacity={0.3} zIndex={1} />

      <div className="relative z-20 w-full h-full overflow-y-auto">
        <AnimatePresence mode="wait">
          
          {phase === 'intro' && (
            <motion.div
              key="intro"
              className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 z-0">
                <FadingVideo
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
                  className="w-full h-full object-cover opacity-60"
                  style={{ transform: 'scale(1.2)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black z-10"></div>
              </div>

              <nav className="absolute top-4 left-0 w-full px-6 flex justify-between items-center z-20">
                <div className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center">
                  <span className="font-serif italic text-xl text-white">a</span>
                </div>
                <div className="hidden md:flex gap-6 text-sm tracking-widest uppercase text-white/70 font-sans">
                  <span>Our Story</span>
                  <span>Memories</span>
                  <span>The Future</span>
                </div>
                <button className="px-5 py-2 rounded-full liquid-glass text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">
                  Contact
                </button>
              </nav>

              <div className="relative z-20 w-full max-w-4xl mx-auto text-center mt-12">
                <BlurText 
                  text="Venture Past Our Sky Across the Universe"
                  className="font-serif italic text-5xl md:text-7xl leading-tight mb-6 text-white drop-shadow-2xl"
                />
                <motion.p
                  className="text-white/70 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto font-sans"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                >
                  A digital universe curated specifically for the one I love. Connect with me or dive deep into the AI experience.
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                >
                  <a 
                    href="tel:0707080940"
                    className="px-8 py-4 rounded-full liquid-glass-strong text-white font-medium uppercase tracking-widest text-sm hover:scale-105 transition-transform"
                  >
                    Liên lạc Bảo Hân
                  </a>
                  <button 
                    onClick={() => setPhase('auth')}
                    className="px-8 py-4 rounded-full bg-white text-black font-medium uppercase tracking-widest text-sm hover:bg-gray-200 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                  >
                    Khám phá AI
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {phase === 'auth' && (
            <motion.div
              key="auth"
              className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 z-0">
                <FadingVideo
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
                  className="w-full h-full object-cover opacity-60"
                  style={{ transform: 'scale(1.2)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black z-10"></div>
              </div>

              <div className="relative z-20 w-full max-w-md mx-auto">
                <div className="liquid-glass-strong p-2 sm:p-4 rounded-3xl w-full">
                  <AuthForm 
                    onSuccess={() => setPhase('portal')} 
                    onFail={() => setPhase('angry')} 
                  />
                </div>
              </div>
            </motion.div>
          )}

          {phase === 'portal' && (
            <motion.div
              key="portal"
              className="absolute inset-0 z-10 p-4 md:p-8 lg:p-12 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 z-0">
                <FadingVideo
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
              </div>

              <div className="relative z-10 w-full max-w-6xl mx-auto flex-1 flex flex-col items-center justify-center">
                <div className="liquid-glass rounded-[1.25rem] w-full max-w-md h-full max-h-[85vh] overflow-hidden relative shadow-2xl">
                   <LinktreePortal onUnlock={() => setPhase('chat')} />
                </div>
              </div>
            </motion.div>
          )}

          {phase === 'chat' && (
            <motion.div
              key="chat"
              className="absolute inset-0 z-10 p-4 md:p-10 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 z-0">
                <FadingVideo
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
              </div>

              <div className="relative z-10 liquid-glass-strong w-full max-w-4xl h-[85vh] rounded-[2rem] overflow-hidden shadow-2xl">
                 <ChatApp />
              </div>
            </motion.div>
          )}

          {phase === 'angry' && (
            <div key="angry" className="absolute inset-0 z-50">
              <AngryScreen />
            </div>
          )}
          
        </AnimatePresence>
      </div>
    </div>
  );
}