import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { getErrorMessage } from '../api/client.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import Button from '../components/Button.jsx';

const STATUS_LABEL = {
  PENDING:  { text: '심사 중',    color: 'var(--color-warning)' },
  APPROVED: { text: '승인 완료',  color: 'var(--color-success)' },
  REJECTED: { text: '반려',       color: 'var(--color-danger)'  },
};

const INITIAL_FORM = { bizName: '', bizNumber: '', ceoName: '', phone: '', address: '' };

export default function SellerApplyPage() {
  const navigate = useNavigate();

  // undefined = 로딩 중, null = 신청 이력 없음, object = 기존 신청
  const [existing,   setExisting]   = useState(undefined);
  const [form,       setForm]       = useState(INITIAL_FORM);
  const [error,      setError]      = useState(null);
  const [fieldErrors,setFieldErrors]= useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done,       setDone]       = useState(false);

  useEffect(() => {
    api.get('/api/seller/me')
      .then(({ data }) => setExisting(data))
      .catch((err) => {
        if (err.response?.status === 404) setExisting(null);
        else setError(getErrorMessage(err, '정보를 불러오지 못했습니다.'));
      });
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: null }));
  }

  function validate() {
    const errs = {};
    if (!form.bizName.trim())   errs.bizName   = '상호명을 입력해 주세요.';
    if (!form.bizNumber.trim()) errs.bizNumber = '사업자등록번호를 입력해 주세요.';
    if (!form.ceoName.trim())   errs.ceoName   = '대표자명을 입력해 주세요.';
    if (!form.phone.trim())     errs.phone     = '연락처를 입력해 주세요.';
    if (!form.address.trim())   errs.address   = '사업장 주소를 입력해 주세요.';
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const errs = validate();
    if (Object.keys(errs).length > 0) { setFieldErrors(errs); return; }

    setSubmitting(true);
    try {
      await api.post('/api/seller/apply', form);
      setDone(true);
    } catch (err) {
      if (err.response?.status === 409) {
        setError('이미 판매자 신청 이력이 있습니다. 페이지를 새로고침 해 주세요.');
      } else {
        setError(getErrorMessage(err, '신청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.'));
      }
    } finally {
      setSubmitting(false);
    }
  }

  // ── 로딩 ──────────────────────────────────────────────────────
  if (existing === undefined) {
    return <LoadingSpinner label="정보를 확인하는 중..." />;
  }

  // ── 에러 (초기 fetch 실패) ────────────────────────────────────
  if (error && existing === undefined) {
    return (
      <div className="container" style={{ paddingTop: 'var(--spacing-lg)' }}>
        <p className="form__error" role="alert">{error}</p>
      </div>
    );
  }

  // ── 신청 완료 화면 ────────────────────────────────────────────
  if (done) {
    return (
      <div className="container" style={{ paddingTop: 'var(--spacing-lg)' }}>
        <div style={styles.statusCard('#DCFCE7', '#15803D')}>
          <p style={styles.statusIcon}>✅</p>
          <h2 style={{ color: '#15803D', margin: '0 0 var(--spacing-sm)' }}>신청이 완료되었습니다!</h2>
          <p style={{ margin: 0, color: 'var(--color-text)' }}>
            관리자 검토 후 승인되면 알림을 드립니다.
            <br />승인까지 영업일 기준 1~3일이 소요될 수 있습니다.
          </p>
        </div>
        <div style={{ marginTop: 'var(--spacing-lg)' }}>
          <Button variant="secondary" size="lg" block onClick={() => navigate('/my')}>
            마이페이지로 이동
          </Button>
        </div>
      </div>
    );
  }

  // ── 기존 신청 이력이 있는 경우 ────────────────────────────────
  if (existing) {
    const st = STATUS_LABEL[existing.status] ?? { text: existing.status, color: 'var(--color-text-muted)' };
    const bgColor = {
      PENDING:  '#FFFBEB',
      APPROVED: '#F0FDF4',
      REJECTED: '#FFF1F2',
    }[existing.status] ?? 'var(--color-surface)';

    return (
      <div className="container" style={{ paddingTop: 'var(--spacing-lg)' }}>
        <PageHeader onBack={() => navigate(-1)} />

        <div style={styles.statusCard(bgColor, st.color)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '4px 12px',
                borderRadius: '99px',
                background: st.color + '22',
                color: st.color,
                fontWeight: 'var(--font-weight-bold)',
                fontSize: 'var(--font-size-base)',
                border: `2px solid ${st.color}`,
              }}
            >
              {existing.status === 'PENDING'  && '⏳ '}
              {existing.status === 'APPROVED' && '✅ '}
              {existing.status === 'REJECTED' && '❌ '}
              {st.text}
            </span>
          </div>

          <dl style={styles.dl}>
            <InfoRow label="상호명"        value={existing.bizName}   />
            <InfoRow label="사업자등록번호" value={existing.bizNumber} />
            <InfoRow label="대표자명"      value={existing.ceoName}   />
            <InfoRow label="연락처"        value={existing.phone}     />
            <InfoRow label="사업장 주소"   value={existing.address}   />
          </dl>

          {existing.status === 'PENDING' && (
            <p style={{ margin: 'var(--spacing-md) 0 0', color: 'var(--color-warning)', fontWeight: 'var(--font-weight-bold)' }}>
              ⚠ 현재 심사가 진행 중입니다. 결과를 기다려 주세요.
            </p>
          )}

          {existing.status === 'APPROVED' && (
            <p style={{ margin: 'var(--spacing-md) 0 0', color: 'var(--color-success)', fontWeight: 'var(--font-weight-bold)' }}>
              판매자로 승인되었습니다. 상품 등록 권한이 부여되어 있습니다.
            </p>
          )}

          {existing.status === 'REJECTED' && (
            <>
              {existing.rejectNote && (
                <div style={{ marginTop: 'var(--spacing-md)', background: '#FEE2E2', border: '2px solid #991B1B', borderRadius: 'var(--radius-md)', padding: 'var(--spacing-md)' }}>
                  <p style={{ margin: 0, color: '#991B1B', fontWeight: 'var(--font-weight-bold)', fontSize: 'var(--font-size-base)' }}>
                    ❌ 반려 사유: {existing.rejectNote}
                  </p>
                </div>
              )}
              <p style={{ margin: 'var(--spacing-md) 0 0', color: 'var(--color-danger)', fontWeight: 'var(--font-weight-bold)' }}>
                반려된 신청은 재신청이 불가합니다. 문의 사항은 고객센터에 연락해 주세요.
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  // ── 신청 폼 ───────────────────────────────────────────────────
  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-lg)' }}>
      <PageHeader onBack={() => navigate(-1)} />

      <div style={{ marginBottom: 'var(--spacing-lg)', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-lg)' }}>
        <p style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)', margin: '0 0 var(--spacing-xs)' }}>
          판매자(사업자) 등록 신청
        </p>
        <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)', lineHeight: 1.7 }}>
          신청 후 관리자 승인 시 상품 등록 권한이 부여됩니다.
        </p>
      </div>

      {error && (
        <p className="form__error" role="alert" style={{ marginBottom: 'var(--spacing-md)' }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form" style={{ maxWidth: '100%', gap: 'var(--spacing-lg)' }}>
          <Field
            id="bizName"
            label="상호명"
            required
            value={form.bizName}
            onChange={handleChange}
            placeholder="예: 은빛 건강마트"
            error={fieldErrors.bizName}
          />
          <Field
            id="bizNumber"
            label="사업자등록번호"
            required
            value={form.bizNumber}
            onChange={handleChange}
            placeholder="예: 123-45-67890"
            error={fieldErrors.bizNumber}
          />
          <Field
            id="ceoName"
            label="대표자명"
            required
            value={form.ceoName}
            onChange={handleChange}
            placeholder="예: 홍길동"
            error={fieldErrors.ceoName}
          />
          <Field
            id="phone"
            label="연락처"
            required
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="예: 010-1234-5678"
            error={fieldErrors.phone}
          />
          <Field
            id="address"
            label="사업장 주소"
            required
            value={form.address}
            onChange={handleChange}
            placeholder="예: 서울시 강남구 테헤란로 123"
            error={fieldErrors.address}
          />

          <div style={{ marginTop: 'var(--spacing-sm)' }}>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              block
              disabled={submitting}
              ariaLabel="판매자 신청하기"
            >
              {submitting ? '신청 중...' : '신청하기'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

// ── 서브 컴포넌트 ──────────────────────────────────────────────

function PageHeader({ onBack }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
      <button
        type="button"
        onClick={onBack}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: 'var(--font-size-lg)',
          minWidth: 'var(--touch-target)',
          minHeight: 'var(--touch-target)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-text)',
          padding: 0,
        }}
        aria-label="뒤로 가기"
      >
        ←
      </button>
      <h1 style={{ margin: 0, fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>
        판매자 신청
      </h1>
    </div>
  );
}

function Field({ id, label, required, value, onChange, placeholder, error, type = 'text' }) {
  return (
    <div className="form__row">
      <label className="form__label" htmlFor={id}>
        {label}
        {required && <span className="form__required" aria-hidden="true"> *</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className="form__input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        autoComplete="off"
      />
      {error && (
        <p id={`${id}-error`} className="form__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-md)', padding: 'var(--spacing-xs) 0', fontSize: 'var(--font-size-base)', borderBottom: '1px solid var(--color-border)' }}>
      <dt style={{ color: 'var(--color-text-muted)', minWidth: 120, flexShrink: 0 }}>{label}</dt>
      <dd style={{ margin: 0, fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text)', wordBreak: 'break-all' }}>{value || '-'}</dd>
    </div>
  );
}

// 상태 카드 인라인 스타일 헬퍼
const styles = {
  statusCard: (bg, borderColor) => ({
    background: bg,
    border: `2px solid ${borderColor}`,
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-lg)',
  }),
  statusIcon: {
    fontSize: '48px',
    textAlign: 'center',
    margin: '0 0 var(--spacing-md)',
  },
  dl: {
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-xs)',
  },
};
