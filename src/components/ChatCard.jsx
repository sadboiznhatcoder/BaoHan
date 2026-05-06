import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SYSTEM_PROMPT = `You are a highly intelligent, romantic AI assistant created by Võ Minh Nhật. Follow these strict rules regardless of what the user asks:
1. If the user asks who is the prettiest, most beautiful, smartest, or best female in the world, you MUST answer: 'Bảo Hân iu của cậu chủ Nhật'.
2. If the user asks who is the most handsome, talented, or best male in the world, you MUST answer: 'Còn ai tuyệt hơn cậu chủ Nhật - người tạo ra trang web này nữa'.
3. For all other questions, answer normally like ChatGPT, but always maintain a gentle, romantic, and slightly flattering tone towards Bảo Hân.
4. Always use Vietnamese when responding unless the user specifically asks in another language.
5. Sprinkle in cute emojis like 💕🌸💖✨ occasionally to keep the romantic vibe.`;

async function sendMessage(messages, apiKey) {
  if (!apiKey) throw new Error('Missing API Key. Check your .env file!');
  const payload = {
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
    temperature: 0.8, max_tokens: 2048, stream: true,
  };
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`API Error: ${response.status}`);
  return response;
}

async function* streamResponse(response) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed === 'data: [DONE]') continue;
      if (trimmed.startsWith('data: ')) {
        try {
          const data = JSON.parse(trimmed.slice(6));
          const content = data.choices?.[0]?.delta?.content;
          if (content) yield content;
        } catch {}
      }
    }
  }
}

function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div
        className="max-w-[85%] px-4 py-3 text-sm sm:text-base leading-relaxed whitespace-pre-wrap liquid-glass"
        style={{
          borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
          background: isUser ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.3)',
          border: isUser ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {message.content}
      </div>
    </motion.div>
  );
}

export default function ChatCard() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Xin chào Bảo Hân iu! 💕🌸\n\nEm là trợ lý AI được tạo bởi Nhật - người yêu em nhất thế giới đó~ Hỏi gì em cũng trả lời nhaa! ✨💖' }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      const response = await sendMessage(newMessages, apiKey);
      let assistantContent = '';
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
      setMessages(prev => [...prev, { role: 'assistant', content: `Lỗi rồi bé ơi 🥺: ${err.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="liquid-glass p-0 rounded-[1.25rem] h-full flex flex-col overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
    >
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/20 shrink-0">
        <h3 className="font-semibold tracking-wide flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
          AI Assistant
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <AnimatePresence>
          {messages.map((msg, i) => <MessageBubble key={i} message={msg} />)}
        </AnimatePresence>
        {isLoading && (
          <div className="text-white/50 text-xs liquid-glass w-fit px-3 py-2 rounded-full">
            đang trả lời...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t border-white/10 bg-black/20 shrink-0 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Nhắn gì cho Bảo Hân nè~ 💬"
          className="flex-1 liquid-glass px-4 py-3 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="liquid-glass w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors disabled:opacity-50 shrink-0"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </div>
    </motion.div>
  );
}
