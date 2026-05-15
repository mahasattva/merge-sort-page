import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import VoiceRecorder from '../components/VoiceRecorder';
import SafetyChecklistModal from '../components/SafetyChecklistModal';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function MessageBubble({ message, isMine }) {
  return (
    <div className={`bubble-row ${isMine ? 'mine' : 'theirs'}`}>
      <div className={`bubble ${isMine ? 'bubble-mine' : 'bubble-theirs'}`}>
        {message.type === 'VOICE_NOTE' ? (
          <audio
            controls
            src={`${API_BASE}${message.content}`}
            className="voice-playback"
          />
        ) : (
          <p className="bubble-text">{message.content}</p>
        )}
        <span className="bubble-time">{formatTime(message.createdAt)}</span>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const { matchId } = useParams();
  const { userId } = useAuth();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [otherName, setOtherName] = useState('');
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [showSafety, setShowSafety] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    async function load() {
      try {
        const [msgs, match] = await Promise.all([
          api.get(`/messages/${matchId}`),
          api.get('/matches'),
        ]);
        setMessages(msgs);
        const found = match.accepted.find((m) => m.id === parseInt(matchId));
        if (found) {
          const other = found.userId1 === userId ? found.user2 : found.user1;
          setOtherName(other.name);
        }
      } catch {
        setError('Could not load messages.');
      }
    }
    load();
  }, [matchId, userId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendText(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setSending(true);
    try {
      const message = await api.post(`/messages/${matchId}`, { content: text.trim() });
      setMessages((prev) => [...prev, message]);
      setText('');
    } catch {
      setError('Could not send message. Please try again.');
    } finally {
      setSending(false);
    }
  }

  function handleVoiceSent(message) {
    setMessages((prev) => [...prev, message]);
  }

  return (
    <div className="chat-page">
      {/* Header */}
      <div className="chat-header">
        <button className="chat-back" onClick={() => navigate('/matches')} aria-label="Back">
          ‹ Back
        </button>
        <h2 className="chat-name">{otherName || 'Chat'}</h2>
        <button
          className="chat-meetup-btn"
          onClick={() => setShowSafety(true)}
          title="Plan to meet safely"
        >
          Plan to Meet
        </button>
      </div>

      {error && <p className="form-error-banner" style={{ margin: '0 1rem' }}>{error}</p>}

      {/* Messages */}
      <div className="chat-messages">
        {messages.length === 0 && (
          <p className="chat-empty">
            Say hello! Use the suggested icebreaker from your Discover card to get started.
          </p>
        )}
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} isMine={msg.senderId === userId} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form className="chat-input-bar" onSubmit={sendText}>
        <input
          type="text"
          className="chat-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          disabled={sending}
          aria-label="Message input"
        />
        <button
          type="submit"
          className="chat-send-btn"
          disabled={!text.trim() || sending}
        >
          Send
        </button>
        <VoiceRecorder
          matchId={parseInt(matchId)}
          onSent={handleVoiceSent}
          disabled={sending}
        />
      </form>

      {showSafety && (
        <SafetyChecklistModal
          personName={otherName}
          onClose={() => setShowSafety(false)}
        />
      )}
    </div>
  );
}
