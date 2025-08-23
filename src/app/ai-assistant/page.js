'use client';
import { useState } from 'react';

const AIAssistantPage = () => {
  const [messages, setMessages] = useState([
    { from: 'ai', text: '💕こんにちは〜✨ ファッションのことなら何でも聞いてね💖' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { from: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const aiMessage = { from: 'ai', text: data.reply };
      setMessages(prevMessages => [...prevMessages, aiMessage]);

    } catch (error) {
      console.error("Failed to get AI response:", error);
      const errorMessage = { from: 'ai', text: 'ごめんね💦 ちょっと調子が悪いみたい…時間をおいてもう一回試してみて！' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>💕AIファッション相談💕</h2>
      <div className="card">
        <div id="chat-messages" style={{ height: '400px', overflowY: 'auto', border: '1px solid #eee', padding: '15px', borderRadius: '8px', background: '#fafafa', marginBottom: '15px' }}>
          {messages.map((msg, index) => (
            <div key={index} className={`${msg.from}-message`} style={{ textAlign: msg.from === 'ai' ? 'left' : 'right', marginBottom: '10px' }}>
              <div style={{ display: 'inline-block', padding: '10px', borderRadius: '10px', background: msg.from === 'ai' ? '#f1f1f1' : 'var(--primary-color)', color: msg.from === 'ai' ? 'black' : 'white' }}>
                {msg.text}
              </div>
            </div>
          ))}
           {isLoading && (
            <div className="ai-message" style={{ textAlign: 'left', marginBottom: '10px' }}>
              <div style={{ display: 'inline-block', padding: '10px', borderRadius: '10px', background: '#f1f1f1', color: 'black' }}>
                考え中...🤔
              </div>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="何でも聞いて〜💕ファッションの悩みとか..."
            style={{ flex: 1, padding: '12px', border: '1px solid #ccc', borderRadius: '8px' }}
            disabled={isLoading}
          />
          <button onClick={sendMessage} style={{ padding: '12px 20px', background: 'var(--secondary-color)', color: 'white', border: 'none', borderRadius: '8px', cursor: isLoading ? 'not-allowed' : 'pointer' }} disabled={isLoading}>
            {isLoading ? '送信中...' : '💌送信'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;
