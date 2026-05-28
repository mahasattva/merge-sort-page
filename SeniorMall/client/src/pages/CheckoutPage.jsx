import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { getErrorMessage } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import Button from '../components/Button.jsx';

function formatPrice(n) {
  if (typeof n !== 'number') return '-';
  return `${n.toLocaleString('ko-KR')}원`;
}

const STEPS = [
  { key: 1, label: '배송지 확인' },
  { key: 2, label: '주문 결제' },
  { key: 3, label: '완료' }
];

export default function CheckoutPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState(null);

  // 배송 정보 — 사용자 정보로 초기화하되 편집 가능
  const [shipping, setShipping] = useState({
    shippingName: '',
    shippingPhone: '',
    shippingAddress: '',
    memo: ''
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/api/cart');
        setCart(data);
        if (!data?.items?.length) {
          // 빈 장바구니로 결제 진입 시 차단
          setError('장바구니가 비어 있습니다. 먼저 상품을 담아주세요.');
        }
      } catch (err) {
        setError(getErrorMessage(err, '주문 정보를 불러올 수 없습니다.'));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (user) {
      setShipping((s) => ({
        ...s,
        shippingName: s.shippingName || user.name || '',
        shippingPhone: s.shippingPhone || user.phone || '',
        shippingAddress: s.shippingAddress || user.address || ''
      }));
    }
  }, [user]);

  function handleChange(e) {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  }

  function validateShipping() {
    if (!shipping.shippingName.trim()) return '받는 분 성함을 입력하세요.';
    if (!shipping.shippingPhone.trim()) return '연락처를 입력하세요.';
    if (!shipping.shippingAddress.trim()) return '배송 주소를 입력하세요.';
    return null;
  }

  async function handlePlaceOrder() {
    const err = validateShipping();
    if (err) { setError(err); return; }
    setSubmitting(true);
    setError(null);
    try {
      const { data } = await api.post('/api/orders', shipping);
      setOrderResult(data);
      setStep(3);
    } catch (e) {
      setError(getErrorMessage(e, '주문에 실패했습니다.'));
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <div className="container"><LoadingSpinner /></div>;

  return (
    <div className="container">
      <h1 className="section-title">주문하기</h1>

      <ol className="stepper" aria-label="주문 진행 단계">
        {STEPS.map((s) => {
          const status = step === s.key ? 'active' : step > s.key ? 'done' : '';
          return (
            <li key={s.key} className={`stepper__step${status ? ` stepper__step--${status}` : ''}`} aria-current={status === 'active' ? 'step' : undefined}>
              <span className="stepper__index" aria-hidden="true">{s.key}</span>
              <span>{s.label}</span>
            </li>
          );
        })}
      </ol>

      {error && <p className="form__error" role="alert">{error}</p>}

      {step === 1 && cart && (
        <>
          <section aria-labelledby="ship-title">
            <h2 id="ship-title" className="section-title">배송 정보</h2>
            <form className="form" onSubmit={(e) => { e.preventDefault(); if (!validateShipping()) setStep(2); else setError(validateShipping()); }}>
              <div className="form__row">
                <label htmlFor="shippingName" className="form__label">받는 분 <span className="form__required" aria-hidden="true">*</span><span className="sr-only">(필수)</span></label>
                <input id="shippingName" name="shippingName" className="form__input" value={shipping.shippingName} onChange={handleChange} autoComplete="name" required />
              </div>
              <div className="form__row">
                <label htmlFor="shippingPhone" className="form__label">연락처 <span className="form__required" aria-hidden="true">*</span><span className="sr-only">(필수)</span></label>
                <input id="shippingPhone" name="shippingPhone" className="form__input" value={shipping.shippingPhone} onChange={handleChange} autoComplete="tel" placeholder="010-1234-5678" required />
              </div>
              <div className="form__row">
                <label htmlFor="shippingAddress" className="form__label">배송 주소 <span className="form__required" aria-hidden="true">*</span><span className="sr-only">(필수)</span></label>
                <input id="shippingAddress" name="shippingAddress" className="form__input" value={shipping.shippingAddress} onChange={handleChange} autoComplete="street-address" required />
              </div>
              <div className="form__row">
                <label htmlFor="memo" className="form__label">배송 메모 (선택)</label>
                <textarea id="memo" name="memo" className="form__textarea" value={shipping.memo} onChange={handleChange} placeholder="예: 부재 시 경비실에 맡겨주세요" />
              </div>
              <Button variant="primary" size="lg" block type="submit">다음 단계로</Button>
            </form>
          </section>
        </>
      )}

      {step === 2 && cart && (
        <section aria-labelledby="pay-title">
          <h2 id="pay-title" className="section-title">주문 확인</h2>
          <div className="cart-summary" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <p><strong>받는 분:</strong> {shipping.shippingName}</p>
            <p><strong>연락처:</strong> {shipping.shippingPhone}</p>
            <p><strong>주소:</strong> {shipping.shippingAddress}</p>
            {shipping.memo && <p><strong>메모:</strong> {shipping.memo}</p>}
          </div>
          <ul className="cart-list">
            {cart.items.map((it) => (
              <li key={it.id} className="cart-item">
                {it.imageUrl ? <img src={it.imageUrl} alt={it.name} className="cart-item__image" /> : <div className="cart-item__image" />}
                <div className="cart-item__body">
                  <h3 className="cart-item__name">{it.name}</h3>
                  <p className="cart-item__price">{formatPrice(it.price)} × {it.quantity} = <strong>{formatPrice(it.subtotal)}</strong></p>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <div className="cart-summary__total"><span>총 결제 금액</span><span>{formatPrice(cart.totalAmount)}</span></div>
            <div className="btn-group btn-group--stack-mobile">
              <Button variant="secondary" onClick={() => setStep(1)} disabled={submitting}>이전</Button>
              <Button variant="primary" size="lg" block onClick={handlePlaceOrder} disabled={submitting}>
                {submitting ? '주문 처리 중...' : '주문 확정하기'}
              </Button>
            </div>
          </div>
        </section>
      )}

      {step === 3 && orderResult && (
        <section aria-labelledby="done-title" className="empty-state">
          <h2 id="done-title" className="section-title">주문이 완료되었습니다</h2>
          <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-success)', fontWeight: 700 }}>✓ 정상 접수</p>
          <p>주문 번호: <strong>{orderResult.id}</strong></p>
          <p>결제 금액: <strong>{formatPrice(orderResult.totalAmount)}</strong></p>
          <div className="btn-group btn-group--center btn-group--stack-mobile" style={{ marginTop: 'var(--spacing-lg)' }}>
            <Link to="/orders" className="btn btn--primary btn--lg">주문 내역 보기</Link>
            <Link to="/" className="btn btn--secondary btn--lg">홈으로</Link>
          </div>
        </section>
      )}
    </div>
  );
}
