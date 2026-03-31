import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import FloatingHearts from './components/FloatingHearts';
import CursorTrail from './components/CursorTrail';
import ClickBurst from './components/ClickBurst';
import GatekeeperScreen from './components/GatekeeperScreen';
import AngryScreen from './components/AngryScreen';
import AuthForm from './components/AuthForm';
import ChatApp from './components/ChatApp';
import './index.css';

// Phases: 'gatekeeper' | 'auth' | 'chat' | 'angry'
function App() {
  const [phase, setPhase] = useState('gatekeeper');

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Global effects - active in all phases */}
      {phase !== 'angry' && <FloatingHearts />}
      <CursorTrail />
      <ClickBurst />

      {/* Phase rendering */}
      <AnimatePresence mode="wait">
        {phase === 'gatekeeper' && (
          <GatekeeperScreen
            key="gatekeeper"
            onYes={() => setPhase('auth')}
            onNo={() => setPhase('angry')}
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
