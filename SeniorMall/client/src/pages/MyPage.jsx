import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Button from '../components/Button.jsx';

export default function MyPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    if (!window.confirm('로그아웃 하시겠어요?')) return;
    await logout();
    navigate('/', { replace: true });
  }

  return (
    <div className="container">
      <h1 className="section-title">내 정보</h1>

      <div className="profile-card">
        <p className="profile-card__name">{user?.name || '이름 미설정'} 님</p>
        <p className="profile-card__email">{user?.email}</p>
        {user?.phone && <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>{user.phone}</p>}
      </div>

      <div className="action-list">
        <Link to="/orders" className="btn btn--secondary btn--lg btn--block">주문 내역 보기</Link>
        <Link to="/cart" className="btn btn--secondary btn--lg btn--block">장바구니 보기</Link>
        <Button variant="danger" size="lg" block onClick={handleLogout}>로그아웃</Button>
      </div>
    </div>
  );
}
