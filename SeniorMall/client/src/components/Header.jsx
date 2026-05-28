import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../api/client.js';

export default function Header() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);

  // 인증 상태나 경로 변경 시 장바구니 수 갱신 — 시각적 피드백 빠르게
  useEffect(() => {
    if (!isAuthenticated) { setCartCount(0); return; }
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get('/api/cart');
        if (!cancelled) setCartCount(data?.itemCount ?? 0);
      } catch { /* 비로그인/네트워크 오류 시 0 유지 */ }
    })();
    return () => { cancelled = true; };
  }, [isAuthenticated, location.pathname]);

  function handleSearch(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/products?q=${encodeURIComponent(q)}`);
  }

  return (
    <header className="header" role="banner">
      <div className="container header__inner">
        <Link to="/" className="header__logo" aria-label="은빛장터 홈으로">은빛장터</Link>

        <form className="header__search" role="search" onSubmit={handleSearch}>
          <label htmlFor="header-search" className="sr-only">상품 검색</label>
          <input
            id="header-search"
            type="search"
            placeholder="찾으시는 상품을 입력하세요"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
          <button type="submit" className="btn btn--primary" aria-label="검색하기">검색</button>
        </form>

        <nav className="header__actions" aria-label="사용자 메뉴">
          <Link to="/cart" className="header__cart" aria-label={`장바구니${cartCount > 0 ? ` (${cartCount}개 상품)` : ''}`}>
            <span aria-hidden="true">🛒</span>
            {cartCount > 0 && <span className="header__cart-badge" aria-hidden="true">{cartCount}</span>}
          </Link>
          {isAuthenticated ? (
            <Link to="/my" className="header__user">{user?.name ?? '내 정보'}</Link>
          ) : (
            <Link to="/login" className="header__user">로그인</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
