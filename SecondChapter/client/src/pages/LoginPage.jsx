import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormField from '../components/FormField';
import Button from '../components/Button';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/discover');
    } catch (err) {
      setError(err.message || 'Could not sign in. Please check your email and password.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <h2>Welcome back</h2>
      <p className="auth-subtitle">Sign in to continue your journey.</p>

      <form onSubmit={handleSubmit} className="auth-form">
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
            autoComplete="current-password"
            required
          />
        </FormField>

        {error && <p className="form-error-banner">{error}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <p className="auth-link">
        New here?{' '}
        <Link to="/register">Create your profile</Link>
      </p>
    </div>
  );
}
