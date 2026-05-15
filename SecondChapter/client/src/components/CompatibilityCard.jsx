const LIFESTYLE_LABELS = {
  ACTIVE_OUTDOORSY:  'Active & Outdoorsy',
  HOMEBODY_READER:   'Homebody & Reader',
  SOCIAL_COMMUNITY:  'Social & Community-Focused',
  TRAVEL_EXPLORER:   'Travel & Explorer',
  ARTS_CULTURE:      'Arts & Culture',
};

const PROMPT_QUESTIONS = {
  decade:    'If I could revisit any decade, I would choose...',
  weekend:   'My ideal weekend involves...',
  companion: 'Three things I hope to share with a companion are...',
};

export default function CompatibilityCard({ candidate, onConnect, onPass, connecting }) {
  const { name, age, location, bio, compatibilityScore, sharedInterests,
          allInterests, lifestyleMatch, lifestyleType, icebreaker, promptPreview } = candidate;

  return (
    <div className="compat-card">
      {/* Header */}
      <div className="compat-card-header">
        <div className="compat-avatar">{name.charAt(0).toUpperCase()}</div>
        <div className="compat-identity">
          <h2 className="compat-name">{name}, {age}</h2>
          <p className="compat-location">{location}</p>
        </div>
        <div className="compat-score-badge">
          <span className="compat-score-number">{compatibilityScore}%</span>
          <span className="compat-score-label">match</span>
        </div>
      </div>

      {/* Why you match */}
      <div className="compat-why">
        <p className="compat-why-title">Why you match</p>
        <ul className="compat-why-list">
          {sharedInterests.length > 0 && (
            <li>{sharedInterests.length} shared interest{sharedInterests.length > 1 ? 's' : ''}</li>
          )}
          {lifestyleMatch && (
            <li>Same lifestyle — {LIFESTYLE_LABELS[lifestyleType]}</li>
          )}
        </ul>
      </div>

      {/* Shared interests */}
      {sharedInterests.length > 0 && (
        <div className="compat-section">
          <p className="compat-section-label">Interests in common</p>
          <div className="interest-grid">
            {allInterests.map((name) => (
              <span
                key={name}
                className={`interest-tag static ${sharedInterests.includes(name) ? 'selected' : ''}`}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Bio */}
      {bio && (
        <div className="compat-section">
          <p className="compat-section-label">About</p>
          <p className="compat-bio">{bio}</p>
        </div>
      )}

      {/* Life Chapter prompt preview */}
      {promptPreview && (
        <div className="compat-section">
          <p className="compat-section-label">From their story</p>
          <div className="prompt-card">
            <p className="prompt-question">
              {PROMPT_QUESTIONS[promptPreview.questionKey] || promptPreview.questionKey}
            </p>
            <p className="prompt-answer">{promptPreview.answer}</p>
          </div>
        </div>
      )}

      {/* Icebreaker */}
      {icebreaker && (
        <div className="compat-icebreaker">
          <p className="compat-icebreaker-label">Suggested icebreaker</p>
          <p className="compat-icebreaker-text">{icebreaker}</p>
        </div>
      )}

      {/* Actions */}
      <div className="compat-actions">
        <button className="compat-btn compat-btn-pass" onClick={onPass}>
          Pass
        </button>
        <button className="compat-btn compat-btn-connect" onClick={onConnect} disabled={connecting}>
          {connecting ? 'Connecting...' : 'Connect'}
        </button>
      </div>
    </div>
  );
}
