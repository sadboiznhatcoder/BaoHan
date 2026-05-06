import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import FloatingFlowers from './components/FloatingFlowers';
import FloatingLoveText from './components/FloatingLoveText';
import FloatingHearts from './components/FloatingHearts';
import CursorTrail from './components/CursorTrail';
import ClickBurst from './components/ClickBurst';
import IntroLanding from './components/IntroLanding';
import AuthForm from './components/AuthForm';
import ChatApp from './components/ChatApp';
import AngryScreen from './components/AngryScreen';
import './index.css';

export default function App() {
  const [phase, setPhase] = useState('intro');

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-['Inter']">
      <div className="absolute inset-0 z-50 pointer-events-none">
        {phase !== 'angry' && <CursorTrail />}
        {phase !== 'angry' && <ClickBurst />}
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {/* Render love texts globally EXCEPT on angry screen */}
        {phase !== 'angry' && <FloatingLoveText />}
        
        {/* Other specific phase effects */}
        {phase === 'intro' && <FloatingFlowers />}
        {(phase === 'auth' || phase === 'chat') && <FloatingHearts />}
      </div>

      <div className="relative z-20 w-full h-full overflow-y-auto">
        <AnimatePresence mode="wait">
          {phase === 'intro' && <IntroLanding key="intro" onEnterAI={() => setPhase('auth')} />}
          {phase === 'auth' && <div key="auth" className="w-full min-h-screen flex items-center justify-center p-4"><AuthForm onSuccess={() => setPhase('chat')} onFail={() => setPhase('angry')} onBack={() => setPhase('intro')} /></div>}
          {phase === 'chat' && <div key="chat" className="w-full min-h-screen p-4 flex justify-center items-center"><div className="liquid-glass-strong w-full max-w-5xl h-[90vh] rounded-[2rem] overflow-hidden"><ChatApp /></div></div>}
          {phase === 'angry' && <AngryScreen key="angry" />}
        </AnimatePresence>
      </div>
    </div>
  );
}