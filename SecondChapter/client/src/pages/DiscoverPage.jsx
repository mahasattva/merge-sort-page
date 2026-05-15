import { useState, useEffect } from 'react';
import { api } from '../api/client';
import CompatibilityCard from '../components/CompatibilityCard';

export default function DiscoverPage() {
  const [candidates, setCandidates] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    api.get('/users/discover')
      .then((data) => { setCandidates(data); setLoading(false); })
      .catch(() => { setError('Could not load profiles. Please try again.'); setLoading(false); });
  }, []);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  function advance() {
    setIndex((i) => i + 1);
  }

  async function handleConnect() {
    const candidate = candidates[index];
    setConnecting(true);
    try {
      await api.post('/matches', { targetUserId: candidate.id });
      showToast(`Connection request sent to ${candidate.name}.`);
      advance();
    } catch {
      showToast('Could not send connection. Please try again.');
    } finally {
      setConnecting(false);
    }
  }

  function handlePass() {
    advance();
  }

  if (loading) {
    return <div className="page-content"><p>Finding your matches...</p></div>;
  }

  if (error) {
    return <div className="page-content"><p className="form-error-banner">{error}</p></div>;
  }

  const current = candidates[index];

  return (
    <div className="discover-page">
      {toast && <div className="toast">{toast}</div>}

      {current ? (
        <>
          <div className="discover-progress">
            <span>{index + 1} of {candidates.length}</span>
          </div>
          <CompatibilityCard
            candidate={current}
            onConnect={handleConnect}
            onPass={handlePass}
            connecting={connecting}
          />
        </>
      ) : (
        <div className="discover-empty">
          <h2>You are all caught up</h2>
          <p>Check back soon — new members join every day.</p>
        </div>
      )}
    </div>
  );
}
