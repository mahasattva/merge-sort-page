import { useState, useRef } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export default function VoiceRecorder({ matchId, onSent, disabled }) {
  const [recording, setRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  async function startRecording() {
    setError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mediaRecorder.onstop = handleStop;
      mediaRecorder.start();

      setRecording(true);
      setDuration(0);
      timerRef.current = setInterval(() => setDuration((d) => d + 1), 1000);
    } catch {
      setError('Microphone access denied. Please allow microphone use in your browser settings.');
    }
  }

  function stopRecording() {
    clearInterval(timerRef.current);
    mediaRecorderRef.current?.stream.getTracks().forEach((t) => t.stop());
    mediaRecorderRef.current?.stop();
    setRecording(false);
  }

  async function handleStop() {
    if (chunksRef.current.length === 0) return;
    setUploading(true);
    try {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
      const formData = new FormData();
      formData.append('audio', blob, 'voice-note.webm');

      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/messages/${matchId}/audio`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      const message = await res.json();
      onSent(message);
    } catch {
      setError('Could not send voice note. Please try again.');
    } finally {
      setUploading(false);
      setDuration(0);
    }
  }

  function formatDuration(s) {
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  }

  return (
    <div className="voice-recorder">
      {error && <p className="voice-error">{error}</p>}
      {recording ? (
        <button
          type="button"
          className="voice-btn recording"
          onClick={stopRecording}
          aria-label="Stop recording"
        >
          <span className="voice-dot" /> Stop &nbsp;{formatDuration(duration)}
        </button>
      ) : (
        <button
          type="button"
          className="voice-btn"
          onClick={startRecording}
          disabled={disabled || uploading}
          aria-label="Record voice note"
          title="Record a voice note"
        >
          {uploading ? 'Sending...' : 'Voice Note'}
        </button>
      )}
    </div>
  );
}
