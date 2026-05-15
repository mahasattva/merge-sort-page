import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

function MatchRow({ match, myId, onClick }) {
  const other = match.userId1 === myId ? match.user2 : match.user1;
  return (
    <button className="match-row" onClick={() => onClick(match.id, other.name)}>
      <div className="match-avatar">{other.name.charAt(0).toUpperCase()}</div>
      <div className="match-info">
        <p className="match-name">{other.name}, {other.age}</p>
        <p className="match-location">{other.location}</p>
      </div>
      <span className="match-arrow">›</span>
    </button>
  );
}

function RequestRow({ match, myId, onAccept, accepting }) {
  const other = match.userId1 === myId ? match.user2 : match.user1;
  return (
    <div className="match-row request-row">
      <div className="match-avatar">{other.name.charAt(0).toUpperCase()}</div>
      <div className="match-info">
        <p className="match-name">{other.name}, {other.age}</p>
        <p className="match-location">{other.location}</p>
      </div>
      <button
        className="accept-btn"
        onClick={() => onAccept(match, other.id)}
        disabled={accepting}
      >
        {accepting ? '...' : 'Accept'}
      </button>
    </div>
  );
}

export default function MatchesPage() {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState([]);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/matches')
      .then(({ accepted, pending }) => { setAccepted(accepted); setPending(pending); })
      .catch(() => setError('Could not load your matches.'))
      .finally(() => setLoading(false));
  }, []);

  async function handleAccept(match, targetUserId) {
    setAccepting(match.id);
    try {
      await api.post('/matches', { targetUserId });
      setPending((prev) => prev.filter((m) => m.id !== match.id));
      const refreshed = await api.get('/matches');
      setAccepted(refreshed.accepted);
    } catch {
      setError('Could not accept connection. Please try again.');
    } finally {
      setAccepting(null);
    }
  }

  if (loading) return <div className="page-content"><p>Loading your connections...</p></div>;
  if (error) return <div className="page-content"><p className="form-error-banner">{error}</p></div>;

  return (
    <div className="page-content">
      {pending.length > 0 && (
        <section className="matches-section">
          <h3 className="matches-section-title">Connection Requests</h3>
          {pending.map((match) => (
            <RequestRow
              key={match.id}
              match={match}
              myId={userId}
              onAccept={handleAccept}
              accepting={accepting === match.id}
            />
          ))}
        </section>
      )}

      <section className="matches-section">
        <h3 className="matches-section-title">Your Connections</h3>
        {accepted.length === 0 ? (
          <p className="matches-empty">No connections yet. Keep exploring in Discover.</p>
        ) : (
          accepted.map((match) => (
            <MatchRow
              key={match.id}
              match={match}
              myId={userId}
              onClick={(matchId) => navigate(`/messages/${matchId}`)}
            />
          ))
        )}
      </section>
    </div>
  );
}
