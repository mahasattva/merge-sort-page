import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { getErrorMessage } from '../api/client.js';
import ProductCard from '../components/ProductCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import AIChatModal from '../components/AIChatModal.jsx';
import heroSenior from '../assets/hero-senior.png';

const FEATURES = [
  { icon: 'A', label: '보기 편한 큰 글씨' },
  { icon: '☜', label: '간단하고 쉬운 메뉴' },
  { icon: '🛡', label: '안전한 결제와 배송' },
];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const touchStartX = useRef(null);

  function prevProduct() { setCarouselIdx((i) => Math.max(0, i - 1)); }
  function nextProduct() { setCarouselIdx((i) => Math.min(products.length - 1, i + 1)); }

  function handleTouchStart(e) { touchStartX.current = e.touches[0].clientX; }
  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) nextProduct();
    else if (diff < -50) prevProduct();
    touchStartX.current = null;
  }

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
    <>
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
          <li key={f.label} className="hero-feature">
            <div className="hero-feature__icon" aria-hidden="true">{f.icon}</div>
            <p className="hero-feature__name">{f.label}</p>
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
              <div
                className="product-carousel"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="product-carousel__track"
                  style={{ transform: `translateX(-${carouselIdx * 100}%)` }}
                >
                  {products.map((p) => (
                    <div key={p.id} className="product-carousel__item">
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>

                {carouselIdx > 0 && (
                  <button className="product-carousel__btn product-carousel__btn--prev" onClick={prevProduct} aria-label="이전 상품">‹</button>
                )}
                {carouselIdx < products.length - 1 && (
                  <button className="product-carousel__btn product-carousel__btn--next" onClick={nextProduct} aria-label="다음 상품">›</button>
                )}

                <div className="product-carousel__dots" aria-hidden="true">
                  {products.map((_, i) => (
                    <button
                      key={i}
                      className={`product-carousel__dot${i === carouselIdx ? ' product-carousel__dot--active' : ''}`}
                      onClick={() => setCarouselIdx(i)}
                      aria-label={`${i + 1}번 상품`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="inquiry-box" aria-label="AI 상담 안내">
            <p className="inquiry-box__text">
              문제가 있으신가요?<br />
              은빛장터의 AI에게 무엇이든 물어보세요.
            </p>
            <button
              className="btn btn--primary btn--block btn--lg"
              onClick={() => setChatOpen(true)}
            >
              💬 문의하기
            </button>
          </aside>
        </div>
      </section>

    </div>
    {chatOpen && <AIChatModal onClose={() => setChatOpen(false)} />}
    </>
  );
}
