import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import InterestPicker from '../components/InterestPicker';
import FormField from '../components/FormField';
import Button from '../components/Button';

const PROMPTS = [
  { key: 'decade',    question: 'If I could revisit any decade, I would choose...' },
  { key: 'weekend',   question: 'My ideal weekend involves...' },
  { key: 'companion', question: 'Three things I hope to share with a companion are...' },
];

const MIN_INTERESTS = 3;
const MAX_INTERESTS = 5;
const TOTAL_STEPS = 2;

export default function ProfileSetupPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [allInterests, setAllInterests] = useState([]);
  const [selected, setSelected] = useState([]);
  const [answers, setAnswers] = useState({ decade: '', weekend: '', companion: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [interests, me] = await Promise.all([
          api.get('/interests'),
          api.get('/users/me'),
        ]);
        setAllInterests(interests);
        setSelected(me.interests.map((ui) => ui.interestId));
        const existingAnswers = { decade: '', weekend: '', companion: '' };
        for (const p of me.lifeChapterPrompts) {
          if (p.questionKey in existingAnswers) existingAnswers[p.questionKey] = p.answer;
        }
        setAnswers(existingAnswers);
      } catch {
        setError('Could not load your profile. Please try again.');
      } finally {
        setInitialLoading(false);
      }
    }
    load();
  }, []);

  function toggleInterest(id) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  function validateStep() {
    if (step === 1) {
      if (selected.length < MIN_INTERESTS) return `Please choose at least ${MIN_INTERESTS} interests.`;
    }
    if (step === 2) {
      const missing = PROMPTS.find((p) => !answers[p.key].trim());
      if (missing) return 'Please answer all three questions.';
    }
    return null;
  }

  function next() {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError('');
    setStep(2);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validateStep();
    if (err) { setError(err); return; }
    setLoading(true);
    setError('');
    try {
      await Promise.all([
        api.put('/users/me/interests', { interestIds: selected }),
        api.put('/users/me/prompts', {
          prompts: PROMPTS.map(({ key, question }) => ({
            questionKey: key,
            answer: answers[key].trim(),
          })),
        }),
      ]);
      navigate('/discover');
    } catch (err) {
      setError(err.message || 'Could not save your profile. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (initialLoading) {
    return <div className="auth-page"><p>Loading your profile...</p></div>;
  }

  return (
    <div className="auth-page">
      <div className="step-indicator">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div key={i} className={`step-dot ${i + 1 <= step ? 'active' : ''}`} />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {step === 1 && (
          <>
            <h2>Your interests</h2>
            <p className="auth-subtitle">
              Choose {MIN_INTERESTS}–{MAX_INTERESTS} interests. These are how we find your best matches.
            </p>
            <p className="interest-count">
              {selected.length} of {MAX_INTERESTS} selected
            </p>
            <InterestPicker
              interests={allInterests}
              selected={selected}
              onToggle={toggleInterest}
              max={MAX_INTERESTS}
            />
          </>
        )}

        {step === 2 && (
          <>
            <h2>Your story</h2>
            <p className="auth-subtitle">
              These answers help others connect with you on a deeper level.
            </p>

            {PROMPTS.map(({ key, question }) => (
              <FormField key={key} label={question}>
                <textarea
                  className="form-input form-textarea"
                  value={answers[key]}
                  onChange={(e) => setAnswers((a) => ({ ...a, [key]: e.target.value }))}
                  rows={3}
                  placeholder="Share your thoughts..."
                  required
                />
              </FormField>
            ))}
          </>
        )}

        {error && <p className="form-error-banner">{error}</p>}

        <div className="form-actions">
          {step === 2 && (
            <Button variant="secondary" onClick={() => { setError(''); setStep(1); }} disabled={loading}>
              Back
            </Button>
          )}
          {step === 1 ? (
            <Button onClick={next}>Continue</Button>
          ) : (
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Finish Setup'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
