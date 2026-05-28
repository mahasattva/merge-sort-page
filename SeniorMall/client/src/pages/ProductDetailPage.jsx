import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api, { getErrorMessage } from '../api/client.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import Button from '../components/Button.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function formatPrice(n) {
  if (typeof n !== 'number') return '-';
  return `${n.toLocaleString('ko-KR')}원`;
}

function Stars({ rating }) {
  const full = Math.round(rating || 0);
  const stars = '★★★★★☆☆☆☆☆'.slice(5 - full, 10 - full);
  return <span className="review-item__rating" aria-label={`별점 ${rating?.toFixed?.(1) ?? rating}점`}>{stars}</span>;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const { data } = await api.get(`/api/products/${id}`);
        if (!cancelled) setProduct(data);
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err, '상품 정보를 불러올 수 없습니다.'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  async function handleAddToCart() {
    if (!isAuthenticated) {
      navigate(`/login?next=${encodeURIComponent(`/products/${id}`)}`);
      return;
    }
    setSubmitting(true);
    setFeedback(null);
    try {
      await api.post('/api/cart/items', { productId: Number(id), quantity });
      setFeedback({ type: 'success', message: '장바구니에 담았습니다.' });
    } catch (err) {
      setFeedback({ type: 'error', message: getErrorMessage(err, '장바구니에 담지 못했습니다.') });
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <div className="container"><LoadingSpinner /></div>;
  if (error) return <div className="container"><p className="form__error" role="alert">{error}</p></div>;
  if (!product) return null;

  const maxQty = Math.max(1, product.stock ?? 1);

  return (
    <div className="container">
      <article className="product-detail">
        <div className="product-detail__image-wrap">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="product-detail__image" />
          ) : (
            <div className="product-card__placeholder">사진 준비 중</div>
          )}
        </div>

        <div>
          {product.category?.name && (
            <p className="product-card__category">{product.category.name}</p>
          )}
          <h1 className="product-detail__name">{product.name}</h1>
          <p className="product-detail__price" aria-label={`가격 ${formatPrice(product.price)}`}>
            {formatPrice(product.price)}
          </p>
          <p className="product-detail__stock">
            {product.stock > 0 ? `재고 ${product.stock}개 남음` : '품절'}
          </p>

          {product.description && (
            <p className="product-detail__description">{product.description}</p>
          )}

          <div>
            <p className="form__label">수량 선택</p>
            <div className="quantity-control" role="group" aria-label="수량 선택">
              <button
                type="button"
                className="quantity-control__btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="수량 감소"
              >−</button>
              <span className="quantity-control__value" aria-live="polite">{quantity}</span>
              <button
                type="button"
                className="quantity-control__btn"
                onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                aria-label="수량 증가"
              >+</button>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            block
            disabled={submitting || product.stock <= 0}
            onClick={handleAddToCart}
          >
            {product.stock <= 0 ? '품절' : submitting ? '담는 중...' : '장바구니 담기'}
          </Button>

          {feedback && (
            <p
              className={feedback.type === 'error' ? 'form__error' : ''}
              role="status"
              style={{ marginTop: 'var(--spacing-md)', color: feedback.type === 'success' ? 'var(--color-success)' : undefined, fontWeight: 700 }}
            >
              {feedback.type === 'success' ? '✓ ' : ''}{feedback.message}
            </p>
          )}
        </div>
      </article>

      <section className="review-section" aria-labelledby="reviews-title">
        <h2 id="reviews-title" className="section-title">
          리뷰 ({product.reviewCount ?? 0}개)
          {typeof product.avgRating === 'number' && product.reviewCount > 0 && (
            <span style={{ marginLeft: 12 }}>
              <Stars rating={product.avgRating} /> 평균 {product.avgRating.toFixed(1)}점
            </span>
          )}
        </h2>
        {(!product.reviews || product.reviews.length === 0) ? (
          <p className="empty-state__title">아직 리뷰가 없습니다.</p>
        ) : (
          <ul className="review-list">
            {product.reviews.map((r) => (
              <li key={r.id} className="review-item">
                <div className="review-item__head">
                  <span>{r.userName}</span>
                  <Stars rating={r.rating} />
                </div>
                <p style={{ margin: 0 }}>{r.content}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
