import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { getErrorMessage } from '../api/client.js';
import ProductCard from '../components/ProductCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

// 카테고리 바로가기 — slug는 백엔드 시드와 동기화 (건강/생활/식품)
const CATEGORY_SHORTCUTS = [
  { slug: 'health', name: '건강', icon: '💊' },
  { slug: 'living', name: '생활', icon: '🏡' },
  { slug: 'food', name: '식품', icon: '🍎' }
];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get('/api/products', { params: { limit: 6 } });
        if (!cancelled) setProducts(data?.items ?? []);
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err, '추천 상품을 불러오지 못했습니다.'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="container">
      <section className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title" className="hero__title">큰 글씨, 쉬운 쇼핑</h1>
        <p className="hero__subtitle">시니어를 위해 만든 친절한 쇼핑몰. 천천히 둘러보세요.</p>
      </section>

      <section aria-labelledby="cat-title">
        <h2 id="cat-title" className="section-title">카테고리 바로가기</h2>
        <div className="category-shortcuts">
          {CATEGORY_SHORTCUTS.map((c) => (
            <Link
              key={c.slug}
              to={`/products?category=${c.slug}`}
              className="category-shortcut"
              aria-label={`${c.name} 카테고리`}
            >
              <span className="category-shortcut__icon" aria-hidden="true">{c.icon}</span>
              <span>{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="reco-title">
        <h2 id="reco-title" className="section-title">추천 상품</h2>
        {loading && <LoadingSpinner />}
        {error && <p className="form__error" role="alert">{error}</p>}
        {!loading && !error && products.length === 0 && (
          <p className="empty-state__title">아직 등록된 상품이 없습니다.</p>
        )}
        {!loading && !error && products.length > 0 && (
          <div className="product-grid product-grid--home">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </div>
  );
}
