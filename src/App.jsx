import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { CursorTrail, ClickBurst, FloatingHearts, FloatingLoveText } from './components/Effects';
import FadingVideo from './components/FadingVideo';
import BlurText from './components/BlurText';
import AuthForm from './components/AuthForm';
import LinktreePortal from './components/LinktreePortal';
import ChatApp from './components/ChatApp';
import GatekeeperScreen from './components/GatekeeperScreen'; // Or AngryScreen if that's what was used

export default function App() {
  const [phase, setPhase] = useState('auth'); // 'auth' | 'portal' | 'chat' | 'angry'

  return (
    <div className="relative w-full h-full min-h-screen bg-black overflow-hidden">
      {/* Global Elements */}
      <div className="z-50 pointer-events-none absolute inset-0">
        <CursorTrail mode="love" />
        <ClickBurst mode="love" />
      </div>
      <FloatingHearts />
      <FloatingLoveText opacity={0.3} zIndex={1} />

      <AnimatePresence mode="wait">
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

            {/* Cinematic Navbar */}
            <nav className="absolute top-4 left-0 w-full px-6 flex justify-between items-center z-20">
              <div className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center">
                <span className="font-serif italic text-xl text-white">a</span>
              </div>
              <div className="hidden md:flex gap-6 text-sm tracking-widest uppercase text-white/70 font-sans">
                <span>Our Story</span>
                <span>Memories</span>
                <span>The Future</span>
              </div>
              <div className="w-10 h-10 rounded-full liquid-glass"></div>
            </nav>

            <div className="relative z-20 w-full max-w-4xl mx-auto text-center mt-12">
              <BlurText 
                text="Venture Past The Sky Into My Heart"
                className="font-serif italic text-5xl md:text-7xl leading-tight mb-8 text-white drop-shadow-2xl"
              />
              
              <div className="liquid-glass-strong p-2 sm:p-4 rounded-3xl max-w-lg mx-auto relative">
                {/* Embed AuthForm */}
                {/* Note: If AuthForm still has fixed positioning inside, it will need to be changed to relative to sit inside this div */}
                <AuthForm onSuccess={() => setPhase('portal')} onFail={() => setPhase('angry')} />
              </div>
            </div>
          </motion.div>
        )}

        {(phase === 'portal' || phase === 'chat') && (
          <motion.div
            key="portal-chat"
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

            <div className="relative z-10 w-full max-w-6xl mx-auto flex-1 flex flex-col">
              <div className="liquid-glass rounded-[1.25rem] w-full flex-1 overflow-hidden relative shadow-2xl">
                 {phase === 'portal' ? (
                   <LinktreePortal onUnlock={() => setPhase('chat')} />
                 ) : (
                   <ChatApp />
                 )}
              </div>
            </div>
          </motion.div>
        )}

        {phase === 'angry' && (
           <GatekeeperScreen key="angry" onUnlock={() => setPhase('portal')} />
        )}
      </AnimatePresence>
    </div>
  );
}
