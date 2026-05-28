import { NavLink } from 'react-router-dom';

// 활성 상태는 색상 + 굵기 + 하단 라인 3가지 단서로 표시 (색깔 의존 회피)
const items = [
  { to: '/', label: '홈', icon: '🏠', end: true },
  { to: '/products', label: '상품', icon: '🛍️' },
  { to: '/cart', label: '장바구니', icon: '🛒' },
  { to: '/my', label: '내 정보', icon: '👤' }
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="주요 메뉴">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `bottom-nav__item${isActive ? ' bottom-nav__item--active' : ''}`
          }
        >
          <span className="bottom-nav__icon" aria-hidden="true">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
