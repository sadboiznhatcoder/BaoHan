import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import FloatingHearts from './components/FloatingHearts';
import CursorTrail from './components/CursorTrail';
import ClickBurst from './components/ClickBurst';
import LinktreePortal from './components/LinktreePortal';
import AngryScreen from './components/AngryScreen';
import AuthForm from './components/AuthForm';
import ChatApp from './components/ChatApp';
import './index.css';

// Phases: 'portal' | 'auth' | 'chat' | 'angry'
function App() {
  const [phase, setPhase] = useState('portal');

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Global effects - active in all phases */}
      {phase !== 'angry' && phase !== 'portal' && <FloatingHearts />}
      <CursorTrail />
      <ClickBurst />

      {/* Phase rendering */}
      <AnimatePresence mode="wait">
        {phase === 'portal' && (
          <LinktreePortal
            key="portal"
            onUnlock={() => setPhase('auth')}
          />
        )}

        {phase === 'auth' && (
          <AuthForm
            key="auth"
            onSuccess={() => setPhase('chat')}
            onFail={() => setPhase('angry')}
          />
        )}

        {phase === 'chat' && (
          <ChatApp key="chat" />
        )}

        {phase === 'angry' && (
          <AngryScreen key="angry" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
