import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import IntroLanding from './components/IntroLanding';
import AuthForm from './components/AuthForm';
import ChatApp from './components/ChatApp';
import AngryScreen from './components/AngryScreen';
import './index.css';

export default function App() {
  const [phase, setPhase] = useState('intro'); // 'intro', 'auth', 'chat', 'angry'

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-['Inter']">
      <div className="relative z-20 w-full h-full overflow-y-auto">
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <IntroLanding key="intro" onEnterAI={() => setPhase('auth')} />
          )}
          {phase === 'auth' && (
             <div key="auth" className="w-full min-h-screen flex items-center justify-center p-4">
                <AuthForm onSuccess={() => setPhase('chat')} onFail={() => setPhase('angry')} onBack={() => setPhase('intro')} />
             </div>
          )}
          {phase === 'chat' && (
             <div key="chat" className="w-full min-h-screen p-4 md:p-10 flex justify-center items-center">
                <div className="liquid-glass-strong w-full max-w-4xl h-[85vh] rounded-[2rem] overflow-hidden">
                   <ChatApp />
                </div>
             </div>
          )}
          {phase === 'angry' && <AngryScreen key="angry" />}
        </AnimatePresence>
      </div>
    </div>
  );
}