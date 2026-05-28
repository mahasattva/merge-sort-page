import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Button from '../components/Button.jsx';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', passwordConfirm: '' });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    if (!form.name.trim()) return '이름을 입력하세요.';
    if (!form.email.trim()) return '이메일을 입력하세요.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return '이메일 형식이 올바르지 않습니다. 예: name@email.com';
    if (form.password.length < 8) return '비밀번호는 8자 이상으로 입력하세요.';
    if (form.password !== form.passwordConfirm) return '비밀번호가 일치하지 않습니다.';
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (v) { setError(v); return; }
    setError(null);
    setSubmitting(true);
    const result = await register({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      password: form.password
    });
    setSubmitting(false);
    if (result.ok) {
      navigate('/', { replace: true });
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit} noValidate>
        <h1 className="form__title">회원가입</h1>

        <div className="form__row">
          <label htmlFor="name" className="form__label">이름 <span className="form__required" aria-hidden="true">*</span><span className="sr-only">(필수)</span></label>
          <input id="name" name="name" className="form__input" value={form.name} onChange={handleChange} autoComplete="name" required />
        </div>

        <div className="form__row">
          <label htmlFor="email" className="form__label">이메일 <span className="form__required" aria-hidden="true">*</span><span className="sr-only">(필수)</span></label>
          <input id="email" name="email" type="email" className="form__input" value={form.email} onChange={handleChange} autoComplete="email" placeholder="name@email.com" required />
        </div>

        <div className="form__row">
          <label htmlFor="phone" className="form__label">전화번호</label>
          <input id="phone" name="phone" type="tel" className="form__input" value={form.phone} onChange={handleChange} autoComplete="tel" placeholder="010-1234-5678" />
        </div>

        <div className="form__row">
          <label htmlFor="password" className="form__label">비밀번호 <span className="form__required" aria-hidden="true">*</span><span className="sr-only">(필수)</span></label>
          <input id="password" name="password" type="password" className="form__input" value={form.password} onChange={handleChange} autoComplete="new-password" required />
          <span className="form__help">8자 이상으로 입력하세요.</span>
        </div>

        <div className="form__row">
          <label htmlFor="passwordConfirm" className="form__label">비밀번호 확인 <span className="form__required" aria-hidden="true">*</span><span className="sr-only">(필수)</span></label>
          <input id="passwordConfirm" name="passwordConfirm" type="password" className="form__input" value={form.passwordConfirm} onChange={handleChange} autoComplete="new-password" required />
        </div>

        {error && <p className="form__error" role="alert">{error}</p>}

        <Button variant="primary" size="lg" block type="submit" disabled={submitting}>
          {submitting ? '가입 중...' : '회원가입'}
        </Button>

        <p className="form__footer">
          이미 회원이신가요? <Link to="/login">로그인</Link>
        </p>
      </form>
    </div>
  );
}
