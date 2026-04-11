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

  // Cursor/click effect mode: 'gay' on linktree portal, 'love' everywhere else
  const effectMode = phase === 'portal' ? 'gay' : 'love';

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* FloatingHearts — ONLY in auth/chat phases, never on portal */}
      {(phase === 'auth' || phase === 'chat') && <FloatingHearts />}

      {/* Cursor trail — gay mode on portal, love mode on auth/chat */}
      {phase !== 'angry' && <CursorTrail mode={effectMode} />}

      {/* Click burst — gay mode on portal, love mode on auth/chat */}
      {phase !== 'angry' && <ClickBurst mode={effectMode} />}

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
