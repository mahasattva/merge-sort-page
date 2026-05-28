import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { getErrorMessage } from '../api/client.js';
import ProductCard from '../components/ProductCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import heroSenior from '../assets/hero-senior.png';

const FEATURES = [
  { icon: 'A', name: '큰 글씨', desc: '보기 편한 큰 글씨' },
  { icon: '☜', name: '쉬운 메뉴', desc: '간단하고 직관적인 구성' },
  { icon: '🛡', name: '안심 쇼핑', desc: '안전한 결제와 배송' },
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

      {/* Hero — 2열 레이아웃 */}
      <section className="hero-landing" aria-labelledby="hero-title">
        <div className="hero-landing__content">
          <p className="hero-landing__tagline">시니어를 위한 쉽고 편안한 쇼핑</p>
          <h1 id="hero-title" className="hero-landing__title">
            은빛장터<span className="hero-landing__sparkle" aria-hidden="true">✦</span>
          </h1>
          <p className="hero-landing__subtitle">
            큰 글씨, 쉬운 메뉴로 천천히 쇼핑하세요. 시니어를 위해 정성껏 만든 온라인 장터입니다.
          </p>
          <Link to="/products" className="btn btn--primary btn--lg hero-landing__cta">
            🛍&nbsp;상품 둘러보기
          </Link>
        </div>
        <div className="hero-landing__image" aria-hidden="true">
          <img src={heroSenior} alt="" className="hero-landing__photo" />
        </div>
      </section>

      {/* 특징 스트립 */}
      <ul className="hero-features" aria-label="은빛장터 특징">
        {FEATURES.map((f) => (
          <li key={f.name} className="hero-feature">
            <div className="hero-feature__icon" aria-hidden="true">{f.icon}</div>
            <div>
              <p className="hero-feature__name">{f.name}</p>
              <p className="hero-feature__desc">{f.desc}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* 인기 상품 */}
      <section aria-labelledby="popular-title">
        <div className="popular-header">
          <h2 id="popular-title" className="section-title" style={{ margin: 0 }}>지금 많이 찾는 상품</h2>
          <Link to="/products" className="popular-header__more" aria-label="상품 전체 보기">더보기 &gt;</Link>
        </div>

        <div className="popular-layout">
          <div className="popular-products-area">
            {loading && <LoadingSpinner />}
            {error && <p className="form__error" role="alert">{error}</p>}
            {!loading && !error && products.length === 0 && (
              <p className="empty-state__title">아직 등록된 상품이 없습니다.</p>
            )}
            {!loading && !error && products.length > 0 && (
              <div className="product-grid">
                {products.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>

          <aside className="cs-box" aria-label="고객센터 안내">
            <p className="cs-box__title">고객센터</p>
            <p className="cs-box__desc">친절한 상담이 필요하신가요?</p>
            <div className="cs-box__phone">
              <span aria-hidden="true" className="cs-box__phone-icon">📞</span>
              <span className="cs-box__number">1234-5678</span>
            </div>
            <p className="cs-box__hours">평일 09:00 ~ 18:00</p>
          </aside>
        </div>
      </section>

    </div>
  );
}
