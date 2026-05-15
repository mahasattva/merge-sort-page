import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormField from '../components/FormField';
import Button from '../components/Button';

const LIFESTYLE_OPTIONS = [
  { value: 'ACTIVE_OUTDOORSY', label: 'Active & Outdoorsy' },
  { value: 'HOMEBODY_READER', label: 'Homebody & Reader' },
  { value: 'SOCIAL_COMMUNITY', label: 'Social & Community-Focused' },
  { value: 'TRAVEL_EXPLORER', label: 'Travel & Explorer' },
  { value: 'ARTS_CULTURE', label: 'Arts & Culture' },
];

const TOTAL_STEPS = 3;

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    age: '',
    location: '',
    bio: '',
    lifestyleType: '',
  });

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function validateStep() {
    if (step === 1) {
      if (!form.email || !form.password || !form.confirmPassword) return 'Please fill in all fields.';
      if (form.password.length < 8) return 'Password must be at least 8 characters.';
      if (form.password !== form.confirmPassword) return 'Passwords do not match.';
    }
    if (step === 2) {
      if (!form.name || !form.age || !form.location) return 'Please fill in all fields.';
      const age = parseInt(form.age);
      if (isNaN(age) || age < 55 || age > 120) return 'Please enter a valid age (55 or older).';
    }
    if (step === 3) {
      if (!form.lifestyleType) return 'Please select your lifestyle type.';
    }
    return null;
  }

  function next() {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError('');
    setStep((s) => s + 1);
  }

  function back() {
    setError('');
    setStep((s) => s - 1);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validateStep();
    if (err) { setError(err); return; }
    setLoading(true);
    setError('');
    try {
      await register({
        email: form.email,
        password: form.password,
        name: form.name,
        age: parseInt(form.age),
        location: form.location,
        bio: form.bio,
        lifestyleType: form.lifestyleType,
      });
      navigate('/profile/setup');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
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
            <h2>Create your account</h2>
            <p className="auth-subtitle">Start by choosing a secure email and password.</p>

            <FormField label="Email address">
              <input
                type="email"
                className="form-input"
                value={form.email}
                onChange={set('email')}
                autoComplete="email"
                required
              />
            </FormField>

            <FormField label="Password">
              <input
                type="password"
                className="form-input"
                value={form.password}
                onChange={set('password')}
                autoComplete="new-password"
                required
              />
              <span className="form-hint">At least 8 characters</span>
            </FormField>

            <FormField label="Confirm password">
              <input
                type="password"
                className="form-input"
                value={form.confirmPassword}
                onChange={set('confirmPassword')}
                autoComplete="new-password"
                required
              />
            </FormField>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Tell us about yourself</h2>
            <p className="auth-subtitle">This is what others will see on your profile.</p>

            <FormField label="Your name">
              <input
                type="text"
                className="form-input"
                value={form.name}
                onChange={set('name')}
                autoComplete="name"
                required
              />
            </FormField>

            <FormField label="Your age">
              <input
                type="number"
                className="form-input"
                value={form.age}
                onChange={set('age')}
                min="55"
                max="120"
                required
              />
            </FormField>

            <FormField label="Your city or town">
              <input
                type="text"
                className="form-input"
                value={form.location}
                onChange={set('location')}
                placeholder="e.g. Miami, FL"
                required
              />
            </FormField>

            <FormField label="A short bio (optional)">
              <textarea
                className="form-input form-textarea"
                value={form.bio}
                onChange={set('bio')}
                placeholder="A few words about who you are..."
                rows={3}
              />
            </FormField>
          </>
        )}

        {step === 3 && (
          <>
            <h2>Your lifestyle</h2>
            <p className="auth-subtitle">Choose what best describes how you like to spend your time.</p>

            <div className="lifestyle-options">
              {LIFESTYLE_OPTIONS.map(({ value, label }) => (
                <label key={value} className={`lifestyle-option ${form.lifestyleType === value ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="lifestyleType"
                    value={value}
                    checked={form.lifestyleType === value}
                    onChange={set('lifestyleType')}
                  />
                  {label}
                </label>
              ))}
            </div>
          </>
        )}

        {error && <p className="form-error-banner">{error}</p>}

        <div className="form-actions">
          {step > 1 && (
            <Button variant="secondary" onClick={back} disabled={loading}>
              Back
            </Button>
          )}
          {step < TOTAL_STEPS ? (
            <Button onClick={next}>Continue</Button>
          ) : (
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating your profile...' : 'Create Profile'}
            </Button>
          )}
        </div>
      </form>

      {step === 1 && (
        <p className="auth-link">
          Already have an account?{' '}
          <Link to="/login">Sign in</Link>
        </p>
      )}
    </div>
  );
}
