import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { CursorTrail, ClickBurst, FloatingHearts, FloatingLoveText } from './components/Effects';
import FadingVideo from './components/FadingVideo';
import BlurText from './components/BlurText';
import AuthSection from './components/AuthSection';
import LinkCards from './components/LinkCards';
import ChatCard from './components/ChatCard';
import AngryScreen from './components/AngryScreen';

export default function App() {
  const [phase, setPhase] = useState('auth'); // 'auth' | 'portal' | 'angry'
  const portalRef = useRef(null);

  const handleSuccess = () => {
    setPhase('portal');
  };

  useEffect(() => {
    if (phase === 'portal' && portalRef.current) {
      setTimeout(() => {
        portalRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, [phase]);

  if (phase === 'angry') {
    return <AngryScreen />;
  }

  return (
    <div className="relative w-full h-full min-h-screen bg-black overflow-y-auto overflow-x-hidden">
      <CursorTrail mode="love" />
      <ClickBurst mode="love" />
      <FloatingHearts />
      <FloatingLoveText opacity={0.3} zIndex={1} />

      <AnimatePresence>
        {phase !== 'portal' && (
          <motion.div
            key="section1"
            className="relative w-full min-h-screen flex flex-col items-center justify-center p-4 z-10"
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 z-0">
              <FadingVideo
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
                className="w-full h-full object-cover opacity-60"
                style={{ transform: 'scale(1.2)', transformOrigin: 'top center' }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black"></div>
            </div>

            {/* Navbar */}
            <nav className="absolute top-4 left-0 w-full px-6 flex justify-between items-center z-20">
              <div className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center">
                <span className="font-heading italic text-xl">a</span>
              </div>
              <div className="hidden md:flex gap-6 text-sm tracking-widest uppercase text-white/70">
                <span>Our Story</span>
                <span>Memories</span>
                <span>The Future</span>
              </div>
              <div className="w-10 h-10 rounded-full liquid-glass"></div>
            </nav>

            <div className="relative z-20 w-full max-w-4xl mx-auto text-center mt-20">
              <motion.div 
                className="inline-block px-4 py-1 rounded-full liquid-glass text-xs tracking-widest uppercase mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                New · A Journey of Us Begins Now
              </motion.div>

              <BlurText 
                text="Venture Past The Sky Into My Heart"
                className="font-heading italic text-6xl md:text-7xl lg:text-[5.5rem] leading-tight mb-6"
              />

              <motion.p
                className="text-white/70 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
              >
                Beyond the stars lies a universe created just for us. Identify yourself to unlock the portal.
              </motion.p>

              <AuthSection onSuccess={handleSuccess} onFail={() => setPhase('angry')} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {phase === 'portal' && (
        <motion.div
          key="section2"
          ref={portalRef}
          className="relative w-full min-h-screen p-4 md:p-8 lg:p-12 z-20 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 z-0">
            <video
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4"
              className="w-full h-full object-cover"
              autoPlay muted loop playsInline
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
          </div>

          <div className="relative z-10 w-full max-w-6xl mx-auto flex-1 flex flex-col">
            <header className="mb-12">
              <p className="text-pink-300 tracking-[0.2em] uppercase text-sm mb-2">// Our Universe</p>
              <h2 className="font-heading italic text-6xl md:text-[6rem] leading-none text-white drop-shadow-2xl">
                Love<br/>evolved
              </h2>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
              <div className="lg:col-span-1 h-[600px] lg:h-auto">
                <LinkCards />
              </div>
              <div className="lg:col-span-2 h-[600px] lg:h-auto">
                <ChatCard />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
