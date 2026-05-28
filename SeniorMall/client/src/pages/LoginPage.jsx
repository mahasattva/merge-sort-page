import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Button from '../components/Button.jsx';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get('next') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password.trim()) {
      setError('이메일과 비밀번호를 모두 입력하세요.');
      return;
    }
    setSubmitting(true);
    const result = await login(email.trim(), password);
    setSubmitting(false);
    if (result.ok) {
      navigate(next, { replace: true });
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit} noValidate>
        <h1 className="form__title">로그인</h1>

        <div className="form__row">
          <label htmlFor="email" className="form__label">
            이메일 <span className="form__required" aria-hidden="true">*</span><span className="sr-only">(필수)</span>
          </label>
          <input
            id="email"
            type="email"
            className="form__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            aria-invalid={error ? 'true' : 'false'}
            placeholder="name@email.com"
            required
          />
        </div>

        <div className="form__row">
          <label htmlFor="password" className="form__label">
            비밀번호 <span className="form__required" aria-hidden="true">*</span><span className="sr-only">(필수)</span>
          </label>
          <input
            id="password"
            type="password"
            className="form__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            aria-invalid={error ? 'true' : 'false'}
            required
          />
        </div>

        {error && <p className="form__error" role="alert">{error}</p>}

        <Button variant="primary" size="lg" block type="submit" disabled={submitting}>
          {submitting ? '로그인 중...' : '로그인'}
        </Button>

        <p className="form__footer">
          아직 회원이 아니신가요? <Link to="/register">회원가입</Link>
        </p>
      </form>
    </div>
  );
}
