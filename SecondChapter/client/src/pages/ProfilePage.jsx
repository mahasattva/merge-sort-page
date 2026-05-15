import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const LIFESTYLE_LABELS = {
  ACTIVE_OUTDOORSY: 'Active & Outdoorsy',
  HOMEBODY_READER: 'Homebody & Reader',
  SOCIAL_COMMUNITY: 'Social & Community-Focused',
  TRAVEL_EXPLORER: 'Travel & Explorer',
  ARTS_CULTURE: 'Arts & Culture',
};

const PROMPT_LABELS = {
  decade:    'If I could revisit any decade, I would choose...',
  weekend:   'My ideal weekend involves...',
  companion: 'Three things I hope to share with a companion are...',
};

export default function ProfilePage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/users/me')
      .then(setUser)
      .catch(() => setError('Could not load your profile.'));
  }, []);

  if (error) return <div className="profile-page"><p className="form-error-banner">{error}</p></div>;
  if (!user) return <div className="profile-page"><p>Loading...</p></div>;

  const interests = user.interests.map((ui) => ui.interest.name);
  const prompts = Object.fromEntries(user.lifeChapterPrompts.map((p) => [p.questionKey, p.answer]));

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">{user.name.charAt(0).toUpperCase()}</div>
        <div>
          <h2 className="profile-name">{user.name}, {user.age}</h2>
          <p className="profile-location">{user.location}</p>
          {user.isVerified && <span className="verified-badge">Verified</span>}
        </div>
      </div>

      {user.bio && (
        <section className="profile-section">
          <h3>About</h3>
          <p>{user.bio}</p>
        </section>
      )}

      <section className="profile-section">
        <h3>Lifestyle</h3>
        <p>{LIFESTYLE_LABELS[user.lifestyleType] || user.lifestyleType}</p>
      </section>

      {interests.length > 0 && (
        <section className="profile-section">
          <h3>Interests</h3>
          <div className="interest-grid">
            {interests.map((name) => (
              <span key={name} className="interest-tag selected static">{name}</span>
            ))}
          </div>
        </section>
      )}

      {user.lifeChapterPrompts.length > 0 && (
        <section className="profile-section">
          <h3>Life Chapter</h3>
          <div className="prompt-list">
            {user.lifeChapterPrompts.map(({ questionKey, answer }) => (
              <div key={questionKey} className="prompt-card">
                <p className="prompt-question">{PROMPT_LABELS[questionKey] || questionKey}</p>
                <p className="prompt-answer">{answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="profile-actions">
        <Button onClick={() => navigate('/profile/setup')}>Edit Profile</Button>
        <Button variant="secondary" onClick={logout}>Sign Out</Button>
      </div>
    </div>
  );
}
