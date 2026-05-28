import { useEffect, useRef, useState } from 'react';
import api from '../api/client.js';

const GREETING = '안녕하세요, 고객님. 무엇을 도와드릴까요?';

export default function AIChatModal({ onClose }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: GREETING }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const { data } = await api.post('/api/ai/chat', {
        messages: next.filter((m) => m.role !== 'assistant' || m.content !== GREETING)
          .map((m) => ({ role: m.role, content: m.content }))
      });
      setMessages([...next, { role: 'assistant', content: data.content }]);
    } catch {
      setMessages([...next, { role: 'assistant', content: '죄송합니다. 잠시 후 다시 시도해 주세요.' }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="chat-modal-overlay" role="dialog" aria-modal="true" aria-label="AI 상담 채팅">
      <div className="chat-modal">
        <div className="chat-modal__header">
          <span className="chat-modal__title">🤖 은빛장터 AI 상담</span>
          <button className="chat-modal__close" onClick={onClose} aria-label="채팅 닫기">✕</button>
        </div>

        <ul className="chat-messages" aria-live="polite">
          {messages.map((m, i) => (
            <li key={i} className={`chat-bubble chat-bubble--${m.role}`}>
              {m.role === 'assistant' && (
                <span className="chat-bubble__avatar" aria-hidden="true">🤖</span>
              )}
              <p className="chat-bubble__text">{m.content}</p>
            </li>
          ))}
          {loading && (
            <li className="chat-bubble chat-bubble--assistant">
              <span className="chat-bubble__avatar" aria-hidden="true">🤖</span>
              <p className="chat-bubble__text chat-bubble__typing">
                <span>●</span><span>●</span><span>●</span>
              </p>
            </li>
          )}
          <li ref={bottomRef} />
        </ul>

        <div className="chat-input-area">
          <textarea
            ref={inputRef}
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="궁금한 점을 입력하세요..."
            rows={2}
            disabled={loading}
            aria-label="메시지 입력"
          />
          <button
            className="btn btn--primary chat-send-btn"
            onClick={handleSend}
            disabled={loading || !input.trim()}
            aria-label="전송"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
