import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { getErrorMessage } from '../api/client.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import Button from '../components/Button.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function calcAge(birthDate) {
  if (!birthDate) return null;
  const birth = new Date(birthDate);
  const today = new Date();
  const age = Math.floor((today - birth) / (365.25 * 24 * 3600 * 1000));
  return isNaN(age) || age < 0 ? null : age;
}

function formatPrice(n) {
  if (n == null) return '0원';
  return n.toLocaleString('ko-KR') + '원';
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

function formatDateKo(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}

const STATUS_LABEL = {
  PENDING: '결제대기',
  PAID: '결제완료',
  SHIPPED: '배송중',
  DELIVERED: '배송완료',
  CANCELLED: '취소'
};

export default function MyPage() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get('/api/users/me');
        if (!cancelled) setProfile(data);
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err, '내 정보를 불러올 수 없습니다.'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  async function handleLogout() {
    if (!window.confirm('로그아웃 하시겠어요?')) return;
    await logout();
    navigate('/', { replace: true });
  }

  function handleEditProfile() {
    alert('내 정보 수정 기능은 준비 중입니다.');
  }

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="container">
        <p className="form__error" role="alert">{error}</p>
      </div>
    );
  }

  const stats = profile?.stats || {};
  const recentOrders = (profile?.recentOrders || []).slice(0, 3);
  const age = calcAge(profile?.birthDate);
  const gradeColor = stats.grade?.color || 'var(--color-primary)';
  const gradeLabel = stats.grade?.label || '';
  const avatarLetter = profile?.name ? profile.name.charAt(0) : '?';

  return (
    <div className="container">
      {/* ① 프로필 헤더 */}
      <section className="dashboard-profile" aria-label="프로필">
        <div className="dashboard-avatar" aria-hidden="true">{avatarLetter}</div>
        <div className="dashboard-profile__info">
          <p className="dashboard-name">
            {profile?.name || '이름 미설정'} 님
            {gradeLabel && (
              <span
                className="dashboard-grade"
                style={{ backgroundColor: gradeColor + '22', color: gradeColor, borderColor: gradeColor }}
              >
                {gradeLabel}
              </span>
            )}
          </p>
          {profile?.createdAt && (
            <p className="dashboard-since">{formatDateKo(profile.createdAt)} 가입</p>
          )}
        </div>
      </section>

      {/* ② 통계 카드 */}
      <section aria-label="이용 통계">
        <div className="dashboard-stats">
          <div className="stat-card">
            <p className="stat-card__value">{stats.orderCount ?? 0}건</p>
            <p className="stat-card__label">총 주문</p>
          </div>
          <div className="stat-card">
            <p className="stat-card__value">{formatPrice(stats.totalSpent ?? 0)}</p>
            <p className="stat-card__label">총 결제</p>
          </div>
          <div className="stat-card">
            <p className="stat-card__value">{stats.thisMonthCount ?? 0}건</p>
            <p className="stat-card__label">이번 달</p>
          </div>
        </div>
      </section>

      {/* ③ 내 정보 */}
      <section aria-label="내 정보">
        <h2 className="section-title">내 정보</h2>
        <div className="dashboard-info">
          <div className="dashboard-info__row">
            <span className="dashboard-info__icon" aria-hidden="true">🎂</span>
            <span className="dashboard-info__label">나이</span>
            <span className="dashboard-info__value">
              {age != null ? `${age}세` : '미입력'}
            </span>
          </div>
          <div className="dashboard-info__row">
            <span className="dashboard-info__icon" aria-hidden="true">📞</span>
            <span className="dashboard-info__label">연락처</span>
            <span className="dashboard-info__value">{profile?.phone || '미입력'}</span>
          </div>
          <div className="dashboard-info__row">
            <span className="dashboard-info__icon" aria-hidden="true">✉️</span>
            <span className="dashboard-info__label">이메일</span>
            <span className="dashboard-info__value">{profile?.email || '미입력'}</span>
          </div>
          <div className="dashboard-info__row">
            <span className="dashboard-info__icon" aria-hidden="true">📍</span>
            <span className="dashboard-info__label">주소</span>
            <span className="dashboard-info__value">{profile?.address || '미입력'}</span>
          </div>
          <div className="dashboard-info__row dashboard-info__row--last">
            <span className="dashboard-info__icon" aria-hidden="true">📅</span>
            <span className="dashboard-info__label">가입일</span>
            <span className="dashboard-info__value">
              {profile?.createdAt ? formatDateKo(profile.createdAt) : '미입력'}
            </span>
          </div>
        </div>
      </section>

      {/* ④ 최근 주문 */}
      <section aria-label="최근 주문">
        <h2 className="section-title">최근 주문</h2>
        {recentOrders.length === 0 ? (
          <p className="empty-state__title">아직 주문 내역이 없습니다.</p>
        ) : (
          <div className="dashboard-orders">
            {recentOrders.map((order) => (
              <div key={order.id} className="dashboard-order-card">
                <div className="dashboard-order-card__head">
                  <p className="dashboard-order-card__name">
                    {order.firstItemName || '상품명 없음'}
                    {order.itemCount > 1 && ` 외 ${order.itemCount - 1}건`}
                  </p>
                  <span className={`status-badge status-badge--${order.status}`}>
                    {STATUS_LABEL[order.status] || order.status}
                  </span>
                </div>
                <div className="dashboard-order-card__meta">
                  <span>{formatPrice(order.totalAmount)}</span>
                  <span>{formatDate(order.createdAt)}</span>
                </div>
              </div>
            ))}
            <Link to="/orders" className="dashboard-orders__more">
              전체 주문 보기 →
            </Link>
          </div>
        )}
      </section>

      {/* ⑤ 하단 버튼 */}
      <div className="dashboard-actions">
        {/* 판매자 신청 / 대시보드 링크 — ADMIN에게는 표시하지 않음 */}
        {user?.role !== 'ADMIN' && (
          user?.role === 'SELLER' ? (
            <Link to="/seller" className="btn btn--secondary btn--lg btn--block">
              판매자 대시보드 →
            </Link>
          ) : (
            <Link to="/seller/apply" className="btn btn--secondary btn--lg btn--block">
              판매자 신청
            </Link>
          )
        )}
        <Button variant="secondary" size="lg" block onClick={handleEditProfile}>
          내 정보 수정
        </Button>
        <Button variant="danger" size="lg" block onClick={handleLogout}>
          로그아웃
        </Button>
      </div>
    </div>
  );
}
