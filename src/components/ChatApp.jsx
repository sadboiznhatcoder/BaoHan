import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessage, streamResponse } from '../services/groqApi';

function TypingIndicator() {
  return (
    <motion.div
      className="flex items-center gap-2 px-5 py-3 rounded-2xl w-fit"
      style={{
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '20px 20px 20px 4px',
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex gap-1.5">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ background: '#f472b6' }}
            animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
      <span className="text-pink-300/60 text-xs ml-1">đang trả lời...</span>
    </motion.div>
  );
}

function MessageBubble({ message, index }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.05 }}
    >
      {!isUser && (
        <motion.div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-2 mt-1 text-sm"
          style={{
            background: 'linear-gradient(135deg, #ec4899, #a855f7)',
            boxShadow: '0 2px 10px rgba(236, 72, 153, 0.3)',
          }}
        >
          💕
        </motion.div>
      )}

      <div
        className={`max-w-[80%] sm:max-w-[70%] px-4 py-3 text-sm sm:text-base leading-relaxed whitespace-pre-wrap`}
        style={{
          background: isUser
            ? 'linear-gradient(135deg, rgba(236,72,153,0.3), rgba(168,85,247,0.25))'
            : 'rgba(255, 255, 255, 0.08)',
          border: isUser
            ? '1px solid rgba(236,72,153,0.3)'
            : '1px solid rgba(255,255,255,0.1)',
          borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
          color: isUser ? '#fce7f3' : 'rgba(255,255,255,0.9)',
        }}
      >
        {message.content}
      </div>

      {isUser && (
        <motion.div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ml-2 mt-1 text-sm"
          style={{
            background: 'linear-gradient(135deg, #f472b6, #ec4899)',
            boxShadow: '0 2px 10px rgba(244, 114, 182, 0.3)',
          }}
        >
          🌸
        </motion.div>
      )}
    </motion.div>
  );
}

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey] = useState(import.meta.env.VITE_GROQ_API_KEY || '');
  const [error, setError] = useState('');
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setMessages([{
      role: 'assistant',
      content: 'Xin chào Bảo Hân iu! 💕🌸\n\nEm là trợ lý AI được tạo bởi Nhật - người yêu em nhất thế giới đó~ Hỏi gì em cũng trả lời nhaa! ✨💖',
    }]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      const response = await sendMessage(newMessages, apiKey);
      let assistantContent = '';

      // Add empty assistant message to stream into
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      for await (const chunk of streamResponse(response)) {
        assistantContent += chunk;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: assistantContent };
          return updated;
        });
      }
    } catch (err) {
      setError(err.message);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `Ôi có lỗi rồi bé ơi 🥺: ${err.message}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex flex-col"
      style={{
        zIndex: 50,
        background: 'linear-gradient(135deg, #1a0011 0%, #2d0a1f 30%, #1a0025 60%, #0d001a 100%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <motion.div
        className="flex-shrink-0 glass px-4 sm:px-6 py-3 flex items-center justify-between"
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          zIndex: 52,
        }}
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
            style={{
              background: 'linear-gradient(135deg, #ec4899, #a855f7)',
              boxShadow: '0 2px 15px rgba(236, 72, 153, 0.4)',
            }}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            💕
          </motion.div>
          <div>
            <h1 className="text-base font-semibold text-white/90">
              AI Assistant cho Bảo Hân 🌸
            </h1>
            <p className="text-xs text-pink-300/50">by Võ Minh Nhật 💖</p>
          </div>
        </div>

        <motion.div
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.5)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Messages area */}
      <div
        className="flex-1 overflow-y-auto px-4 sm:px-6 py-4"
        style={{ scrollBehavior: 'smooth' }}
      >
        <AnimatePresence>
          {messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} index={i} />
          ))}
        </AnimatePresence>

        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="w-8 h-8 mr-2" />
            <TypingIndicator />
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <motion.div
        className="flex-shrink-0 glass px-4 sm:px-6 py-3"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          zIndex: 52,
        }}
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <div className="max-w-3xl mx-auto flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhắn gì cho Bảo Hân nè~ 💬"
              rows={1}
              className="w-full px-4 py-3 rounded-2xl text-base resize-none focus:ring-2 focus:ring-pink-400/30 transition-all"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: 'white',
                outline: 'none',
                maxHeight: '120px',
                minHeight: '48px',
              }}
              onInput={e => {
                e.target.style.height = '48px';
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
              }}
            />
          </div>

          <motion.button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
              boxShadow: '0 4px 15px rgba(244, 63, 94, 0.4)',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </motion.button>
        </div>

        {error && (
          <motion.p
            className="text-red-400/70 text-xs text-center mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}
