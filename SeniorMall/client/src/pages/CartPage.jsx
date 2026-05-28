import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { getErrorMessage } from '../api/client.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import Button from '../components/Button.jsx';

function formatPrice(n) {
  if (typeof n !== 'number') return '-';
  return `${n.toLocaleString('ko-KR')}원`;
}

export default function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const { data } = await api.get('/api/cart');
      setCart(data);
    } catch (err) {
      setError(getErrorMessage(err, '장바구니를 불러올 수 없습니다.'));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function updateQty(itemId, quantity) {
    setPending(true);
    setError(null);
    try {
      const { data } = await api.patch(`/api/cart/items/${itemId}`, { quantity });
      setCart(data);
    } catch (err) {
      setError(getErrorMessage(err, '수량을 변경할 수 없습니다.'));
    } finally {
      setPending(false);
    }
  }

  async function removeItem(itemId) {
    if (!window.confirm('이 상품을 장바구니에서 삭제할까요?')) return;
    setPending(true);
    try {
      const { data } = await api.delete(`/api/cart/items/${itemId}`);
      setCart(data);
    } catch (err) {
      setError(getErrorMessage(err, '삭제하지 못했습니다.'));
    } finally {
      setPending(false);
    }
  }

  if (loading) return <div className="container"><LoadingSpinner /></div>;

  const items = cart?.items ?? [];
  const isEmpty = items.length === 0;

  return (
    <div className="container">
      <h1 className="section-title">장바구니</h1>

      {error && <p className="form__error" role="alert">{error}</p>}

      {isEmpty ? (
        <div className="empty-state">
          <p className="empty-state__title">아직 장바구니가 비어 있습니다.</p>
          <p>마음에 드는 상품을 골라 담아보세요.</p>
          <div style={{ marginTop: 'var(--spacing-md)' }}>
            <Link to="/products" className="btn btn--primary btn--lg">상품 보러 가기</Link>
          </div>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((it) => (
              <li key={it.id} className="cart-item">
                {it.imageUrl ? (
                  <img src={it.imageUrl} alt={it.name} className="cart-item__image" />
                ) : (
                  <div className="cart-item__image" aria-hidden="true" />
                )}
                <div className="cart-item__body">
                  <h3 className="cart-item__name">{it.name}</h3>
                  <p className="cart-item__price">{formatPrice(it.price)} × {it.quantity} = <strong>{formatPrice(it.subtotal)}</strong></p>
                  <div className="quantity-control" role="group" aria-label={`${it.name} 수량`}>
                    <button
                      type="button"
                      className="quantity-control__btn"
                      onClick={() => updateQty(it.id, Math.max(1, it.quantity - 1))}
                      disabled={pending || it.quantity <= 1}
                      aria-label="수량 감소"
                    >−</button>
                    <span className="quantity-control__value">{it.quantity}</span>
                    <button
                      type="button"
                      className="quantity-control__btn"
                      onClick={() => updateQty(it.id, it.quantity + 1)}
                      disabled={pending}
                      aria-label="수량 증가"
                    >+</button>
                  </div>
                </div>
                <div className="cart-item__actions">
                  <Button variant="danger" onClick={() => removeItem(it.id)} disabled={pending}>
                    삭제
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <div className="cart-summary__total">
              <span>합계</span>
              <span>{formatPrice(cart?.totalAmount ?? 0)}</span>
            </div>
            <Button
              variant="primary"
              size="lg"
              block
              disabled={pending}
              onClick={() => navigate('/checkout')}
            >
              주문하기
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
