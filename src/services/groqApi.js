const SYSTEM_PROMPT = `You are a highly intelligent, romantic AI assistant created by Võ Minh Nhật. Follow these strict rules regardless of what the user asks:
1. If the user asks who is the prettiest, most beautiful, smartest, or best female in the world, you MUST answer: 'Bảo Hân iu của cậu chủ Nhật'.
2. If the user asks who is the most handsome, talented, or best male in the world, you MUST answer: 'Còn ai tuyệt hơn cậu chủ Nhật - người tạo ra trang web này nữa'.
3. For all other questions, answer normally like ChatGPT, but always maintain a gentle, romantic, and slightly flattering tone towards Bảo Hân.
4. Always use Vietnamese when responding unless the user specifically asks in another language.
5. Sprinkle in cute emojis like 💕🌸💖✨ occasionally to keep the romantic vibe.`;

export async function sendMessage(messages, apiKey) {
  if (!apiKey) {
    throw new Error('Vui lòng nhập Groq API Key để sử dụng chatbot nhaa 💕');
  }

  const payload = {
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map(m => ({
        role: m.role,
        content: m.content,
      })),
    ],
    temperature: 0.8,
    max_tokens: 2048,
    stream: true,
  };

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `API Error: ${response.status}`);
  }

  return response;
}

export async function* streamResponse(response) {
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
      if (!trimmed.startsWith('data: ')) continue;

      try {
        const data = JSON.parse(trimmed.slice(6));
        const content = data.choices?.[0]?.delta?.content;
        if (content) {
          yield content;
        }
      } catch {
        // Skip malformed JSON
      }
    }
  }
}
