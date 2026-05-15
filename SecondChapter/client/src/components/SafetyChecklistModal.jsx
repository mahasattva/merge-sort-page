import { useState } from 'react';

const CHECKLIST = [
  'Meet in a public place, such as a coffee shop or park.',
  'Tell a trusted friend or family member where you are going and when to expect you back.',
  'Keep your phone fully charged and with you at all times.',
  'Do not share your home address until you feel completely comfortable.',
  'Trust your instincts — it is always okay to leave if something feels wrong.',
];

export default function SafetyChecklistModal({ personName, onClose }) {
  const [checked, setChecked] = useState(Array(CHECKLIST.length).fill(false));

  function toggle(i) {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  }

  const allChecked = checked.every(Boolean);

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <h2 className="modal-title">Before you meet {personName}</h2>
        <p className="modal-subtitle">
          Your safety is our priority. Please review each point before planning your meeting.
        </p>

        <ul className="safety-list">
          {CHECKLIST.map((item, i) => (
            <li key={i} className="safety-item">
              <label className={`safety-label ${checked[i] ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={checked[i]}
                  onChange={() => toggle(i)}
                  className="safety-checkbox"
                />
                {item}
              </label>
            </li>
          ))}
        </ul>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button
            className="btn btn-primary"
            disabled={!allChecked}
            onClick={onClose}
          >
            I Understand — Plan to Meet
          </button>
        </div>
      </div>
    </div>
  );
}
