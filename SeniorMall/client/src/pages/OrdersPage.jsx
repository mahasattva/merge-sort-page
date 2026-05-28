import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { getErrorMessage } from '../api/client.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const STATUS_LABEL = {
  PENDING: '결제대기',
  PAID: '결제완료',
  SHIPPED: '배송중',
  DELIVERED: '배송완료',
  CANCELLED: '취소'
};

function formatPrice(n) {
  if (typeof n !== 'number') return '-';
  return `${n.toLocaleString('ko-KR')}원`;
}

function formatDate(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  } catch { return iso; }
}

export default function OrdersPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/api/orders');
        setItems(data?.items ?? []);
      } catch (err) {
        setError(getErrorMessage(err, '주문 내역을 불러올 수 없습니다.'));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="container"><LoadingSpinner /></div>;

  return (
    <div className="container">
      <h1 className="section-title">주문 내역</h1>
      {error && <p className="form__error" role="alert">{error}</p>}
      {!error && items.length === 0 && (
        <div className="empty-state">
          <p className="empty-state__title">아직 주문 내역이 없습니다.</p>
          <p>마음에 드는 상품을 둘러보세요.</p>
          <div style={{ marginTop: 'var(--spacing-md)' }}>
            <Link to="/products" className="btn btn--primary btn--lg">상품 보러 가기</Link>
          </div>
        </div>
      )}
      {items.length > 0 && (
        <ul className="order-list">
          {items.map((o) => (
            <li key={o.id} className="order-item">
              <div className="order-item__head">
                <span className="order-item__date">{formatDate(o.createdAt)}</span>
                <span className={`status-badge status-badge--${o.status}`}>
                  {STATUS_LABEL[o.status] ?? o.status}
                </span>
              </div>
              <div className="order-item__head">
                <span className="order-item__id">주문번호 #{o.id}</span>
                <span className="order-item__amount">{formatPrice(o.totalAmount)}</span>
              </div>
              <p style={{ margin: 0 }}>상품 {o.itemCount ?? (o.items?.length ?? 0)}개</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
