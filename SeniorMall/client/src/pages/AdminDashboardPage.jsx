import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { getErrorMessage } from '../api/client.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function calcAge(birthDate) {
  if (!birthDate) return '-';
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function formatPrice(n) {
  if (!n) return '0원';
  return Number(n).toLocaleString('ko-KR') + '원';
}

function formatDate(iso) {
  if (!iso) return '-';
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

const STAT_ITEMS = [
  { key: 'userCount',        label: '전체 회원',    icon: '👥', money: false },
  { key: 'orderCount',       label: '전체 주문',    icon: '📦', money: false },
  { key: 'totalRevenue',     label: '전체 매출',    icon: '💰', money: true  },
  { key: 'thisMonthOrders',  label: '이번 달 주문', icon: '📅', money: false },
  { key: 'thisMonthRevenue', label: '이번 달 매출', icon: '📈', money: true  },
];

const COLUMNS = [
  { key: 'id',         label: 'ID',     width: 56  },
  { key: 'name',       label: '이름',   width: 100 },
  { key: 'email',      label: '이메일', width: 200 },
  { key: 'phone',      label: '연락처', width: 130 },
  { key: 'age',        label: '나이',   width: 60  },
  { key: 'address',    label: '주소',   width: 200 },
  { key: 'role',       label: '역할',   width: 80  },
  { key: 'orderCount', label: '주문',   width: 64  },
  { key: 'totalSpent', label: '결제액', width: 110 },
  { key: 'createdAt',  label: '가입일', width: 100 },
  { key: 'actions',    label: '관리',   width: 160 },
];

const SELLER_COLUMNS = [
  { key: 'id',        label: 'ID',       width: 56  },
  { key: 'bizName',   label: '상호명',   width: 130 },
  { key: 'applicant', label: '신청자',   width: 160 },
  { key: 'bizNumber', label: '사업자번호', width: 130 },
  { key: 'ceoName',   label: '대표자',   width: 100 },
  { key: 'phone',     label: '연락처',   width: 130 },
  { key: 'createdAt', label: '신청일',   width: 100 },
  { key: 'status',    label: '상태',     width: 90  },
  { key: 'actions',   label: '관리',     width: 160 },
];

const SELLER_STATUS_STYLE = {
  PENDING:  { bg: '#FEF9C3', color: '#92400E', label: '대기중' },
  APPROVED: { bg: '#DCFCE7', color: '#15803D', label: '승인'   },
  REJECTED: { bg: '#FEE2E2', color: '#991B1B', label: '반려'   },
};

export default function AdminDashboardPage() {
  const { user: me, logout } = useAuth();
  const navigate = useNavigate();

  // body 제약 해제
  useEffect(() => {
    document.body.classList.add('admin-mode');
    return () => document.body.classList.remove('admin-mode');
  }, []);

  const [activeTab,    setActiveTab]    = useState('users'); // 'users' | 'sellers'

  const [stats,        setStats]        = useState(null);
  const [users,        setUsers]        = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [usersLoading, setUsersLoading] = useState(false);
  const [error,        setError]        = useState(null);
  const [page,         setPage]         = useState(1);
  const [totalPages,   setTotalPages]   = useState(1);
  const [total,        setTotal]        = useState(0);
  const [search,       setSearch]       = useState('');
  const [roleFilter,   setRoleFilter]   = useState('');
  const debounceRef = useRef(null);

  // ── 셀러 탭 상태 ──────────────────────────────────────────────
  const [sellers,        setSellers]        = useState([]);
  const [sellersLoading, setSellersLoading] = useState(false);
  const [sellerPage,     setSellerPage]     = useState(1);
  const [sellerTotalPages, setSellerTotalPages] = useState(1);
  const [sellerTotal,    setSellerTotal]    = useState(0);
  const [sellerStatus,   setSellerStatus]   = useState(''); // '' | 'PENDING' | 'APPROVED' | 'REJECTED'

  useEffect(() => {
    api.get('/api/admin/stats')
      .then(({ data }) => setStats(data))
      .catch((err) => setError(getErrorMessage(err, '통계를 불러오지 못했습니다.')))
      .finally(() => setLoading(false));
  }, []);

  const loadUsers = useCallback(async (p, q, role) => {
    setUsersLoading(true);
    try {
      const params = new URLSearchParams({ page: p, limit: 20 });
      if (q)    params.set('q', q);
      if (role) params.set('role', role);
      const { data } = await api.get(`/api/admin/users?${params}`);
      setUsers(data.items ?? []);
      setPage(data.page);
      setTotalPages(data.totalPages ?? 1);
      setTotal(data.total ?? 0);
    } catch (err) {
      alert(getErrorMessage(err, '회원 목록을 불러오지 못했습니다.'));
    } finally {
      setUsersLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => loadUsers(page, search, roleFilter), 300);
    return () => clearTimeout(debounceRef.current);
  }, [page, search, roleFilter, loadUsers]);

  const handleSearchChange  = (e) => { setSearch(e.target.value); setPage(1); };
  const handleRoleFilter    = (r)  => { setRoleFilter(r); setPage(1); };

  // ── 셀러 목록 로드 ─────────────────────────────────────────────
  const loadSellers = useCallback(async (p, status) => {
    setSellersLoading(true);
    try {
      const params = new URLSearchParams({ page: p, limit: 20 });
      if (status) params.set('status', status);
      const { data } = await api.get(`/api/admin/sellers?${params}`);
      setSellers(data.items ?? []);
      setSellerPage(p);
      setSellerTotalPages(data.totalPages ?? 1);
      setSellerTotal(data.total ?? 0);
    } catch (err) {
      alert(getErrorMessage(err, '셀러 목록을 불러오지 못했습니다.'));
    } finally {
      setSellersLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'sellers') loadSellers(sellerPage, sellerStatus);
  // sellerPage/sellerStatus 변경에만 반응 — loadSellers는 안정적
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, sellerPage, sellerStatus]);

  const handleSellerStatusFilter = (s) => { setSellerStatus(s); setSellerPage(1); };

  const handleApprove = async (sellerId) => {
    if (!window.confirm('이 판매자 신청을 승인하시겠습니까?')) return;
    try {
      const { data } = await api.patch(`/api/admin/sellers/${sellerId}/approve`);
      setSellers((prev) => prev.map((s) => s.id === sellerId ? { ...s, status: data.status } : s));
    } catch (err) { alert(getErrorMessage(err, '승인 처리에 실패했습니다.')); }
  };

  const handleReject = async (sellerId) => {
    const note = window.prompt('반려 사유를 입력하세요 (선택):');
    if (note === null) return; // 취소
    try {
      const { data } = await api.patch(`/api/admin/sellers/${sellerId}/reject`, { note: note || undefined });
      setSellers((prev) => prev.map((s) => s.id === sellerId ? { ...s, status: data.status, rejectNote: data.rejectNote } : s));
    } catch (err) { alert(getErrorMessage(err, '반려 처리에 실패했습니다.')); }
  };

  const handleRoleChange = async (userId, currentRole) => {
    const nextRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
    if (!window.confirm(`${nextRole === 'ADMIN' ? '관리자' : '일반 회원'}으로 변경하시겠습니까?`)) return;
    try {
      const { data } = await api.patch(`/api/admin/users/${userId}`, { role: nextRole });
      setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, role: data.role } : u));
    } catch (err) { alert(getErrorMessage(err, '역할 변경 실패')); }
  };

  const handleDelete = async (userId, userName) => {
    if (!window.confirm(`"${userName}" 회원을 삭제하시겠습니까?`)) return;
    try {
      await api.delete(`/api/admin/users/${userId}`);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      setTotal((prev) => prev - 1);
    } catch (err) { alert(getErrorMessage(err, '삭제 실패')); }
  };

  const handleLogout = async () => {
    if (!window.confirm('로그아웃 하시겠습니까?')) return;
    await logout();
    navigate('/', { replace: true });
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <LoadingSpinner />
    </div>
  );

  if (error) return (
    <div style={{ padding: 32 }}><p style={{ color: 'red' }}>{error}</p></div>
  );

  return (
    <div className="adm-layout">
      {/* 사이드바 */}
      <aside className="adm-sidebar">
        <div className="adm-sidebar__brand">
          <span className="adm-sidebar__logo">🛒</span>
          <span className="adm-sidebar__title">은빛장터</span>
          <span className="adm-sidebar__sub">관리자</span>
        </div>

        <nav className="adm-nav" aria-label="관리자 메뉴">
          <button
            type="button"
            className={`adm-nav__item${activeTab === 'users' ? ' adm-nav__item--active' : ''}`}
            onClick={() => setActiveTab('users')}
            style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', fontFamily: 'inherit', cursor: 'pointer' }}
          >
            <span className="adm-nav__icon">👥</span> 회원 관리
          </button>
          <button
            type="button"
            className={`adm-nav__item${activeTab === 'sellers' ? ' adm-nav__item--active' : ''}`}
            onClick={() => setActiveTab('sellers')}
            style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', fontFamily: 'inherit', cursor: 'pointer' }}
          >
            <span className="adm-nav__icon">🏪</span> 셀러 신청
          </button>
          <span className="adm-nav__item adm-nav__item--disabled">
            <span className="adm-nav__icon">📦</span> 주문 관리
            <span className="adm-nav__soon">준비중</span>
          </span>
          <span className="adm-nav__item adm-nav__item--disabled">
            <span className="adm-nav__icon">🏷️</span> 상품 관리
            <span className="adm-nav__soon">준비중</span>
          </span>
        </nav>

        <div className="adm-sidebar__footer">
          <div className="adm-sidebar__user">
            <div className="adm-sidebar__avatar">{me?.name?.[0] ?? 'A'}</div>
            <div>
              <p className="adm-sidebar__name">{me?.name}</p>
              <p className="adm-sidebar__email">{me?.email}</p>
            </div>
          </div>
          <button className="adm-logout-btn" onClick={handleLogout}>로그아웃</button>
          <a className="adm-store-link" href="/" target="_blank" rel="noreferrer">← 쇼핑몰 보기</a>
        </div>
      </aside>

      {/* 메인 영역 */}
      <div className="adm-main">
        {/* 탑바 */}
        <div className="adm-topbar">
          <h1 className="adm-topbar__title">{activeTab === 'sellers' ? '셀러 신청 관리' : '회원 관리'}</h1>
          <span className="adm-topbar__date">{new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>

        {/* 통계 카드 */}
        <div className="adm-stats">
          {STAT_ITEMS.map(({ key, label, icon, money }) => (
            <div key={key} className="adm-stat">
              <div className="adm-stat__icon">{icon}</div>
              <div className="adm-stat__body">
                <p className="adm-stat__value">
                  {stats ? (money ? formatPrice(stats[key]) : (stats[key] ?? 0).toLocaleString('ko-KR')) : '-'}
                </p>
                <p className="adm-stat__label">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── 회원 관리 탭 ─────────────────────────────────────── */}
        {activeTab === 'users' && (
          <>
            {/* 필터 바 */}
            <div className="adm-filterbar">
              <div className="adm-filterbar__left">
                <input
                  type="search"
                  className="adm-search-input"
                  placeholder="🔍  이름 또는 이메일 검색"
                  value={search}
                  onChange={handleSearchChange}
                  aria-label="회원 검색"
                />
                <div className="adm-role-tabs" role="group" aria-label="역할 필터">
                  {[['', '전체'], ['USER', 'USER'], ['ADMIN', 'ADMIN']].map(([val, lbl]) => (
                    <button
                      key={val}
                      type="button"
                      className={`adm-tab${roleFilter === val ? ' adm-tab--active' : ''}`}
                      onClick={() => handleRoleFilter(val)}
                      aria-pressed={roleFilter === val}
                    >{lbl}</button>
                  ))}
                </div>
              </div>
              <span className="adm-filterbar__count">총 <strong>{total.toLocaleString()}</strong>명</span>
            </div>

            {/* 테이블 */}
            <div className="adm-table-wrap">
              {usersLoading && (
                <div className="adm-table-overlay"><LoadingSpinner /></div>
              )}
              <table className="adm-table" aria-label="회원 목록">
                <thead>
                  <tr>
                    {COLUMNS.map((col) => (
                      <th key={col.key} className="adm-th" style={{ minWidth: col.width }}>{col.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr><td colSpan={COLUMNS.length} className="adm-td-empty">해당하는 회원이 없습니다.</td></tr>
                  ) : users.map((u) => {
                    const isSelf = Number(me?.id) === u.id;
                    return (
                      <tr key={u.id} className={`adm-tr${isSelf ? ' adm-tr--self' : ''}`}>
                        <td className="adm-td adm-td--muted">{u.id}</td>
                        <td className="adm-td adm-td--bold">
                          {u.name || '-'}
                          {isSelf && <span className="adm-self-tag">나</span>}
                        </td>
                        <td className="adm-td adm-td--muted">{u.email}</td>
                        <td className="adm-td">{u.phone || '-'}</td>
                        <td className="adm-td adm-td--center">{calcAge(u.birthDate)}</td>
                        <td className="adm-td adm-td--muted adm-td--truncate">{u.address || '-'}</td>
                        <td className="adm-td adm-td--center">
                          <span className={`adm-role-badge adm-role-badge--${u.role}`}>
                            {u.role === 'ADMIN' ? 'ADMIN' : 'USER'}
                          </span>
                        </td>
                        <td className="adm-td adm-td--center">{u.orderCount ?? 0}</td>
                        <td className="adm-td adm-td--right">{formatPrice(u.totalSpent)}</td>
                        <td className="adm-td adm-td--muted">{formatDate(u.createdAt)}</td>
                        <td className="adm-td adm-td--actions">
                          <button
                            className="adm-btn adm-btn--role"
                            disabled={isSelf}
                            onClick={() => handleRoleChange(u.id, u.role)}
                            title={isSelf ? '본인 역할은 변경할 수 없습니다' : '역할 변경'}
                          >
                            {u.role === 'ADMIN' ? '→ 일반' : '→ 관리자'}
                          </button>
                          <button
                            className="adm-btn adm-btn--delete"
                            disabled={isSelf}
                            onClick={() => handleDelete(u.id, u.name || u.email)}
                            title={isSelf ? '본인은 삭제할 수 없습니다' : '삭제'}
                          >
                            삭제
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className="adm-pagination">
                <button className="adm-page-btn" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>← 이전</button>
                <span className="adm-page-info">{page} / {totalPages}</span>
                <button className="adm-page-btn" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>다음 →</button>
              </div>
            )}
          </>
        )}

        {/* ── 셀러 신청 탭 ─────────────────────────────────────── */}
        {activeTab === 'sellers' && (
          <>
            {/* 필터 바 */}
            <div className="adm-filterbar">
              <div className="adm-filterbar__left">
                <div className="adm-role-tabs" role="group" aria-label="신청 상태 필터">
                  {[['', '전체'], ['PENDING', '대기중'], ['APPROVED', '승인'], ['REJECTED', '반려']].map(([val, lbl]) => (
                    <button
                      key={val}
                      type="button"
                      className={`adm-tab${sellerStatus === val ? ' adm-tab--active' : ''}`}
                      onClick={() => handleSellerStatusFilter(val)}
                      aria-pressed={sellerStatus === val}
                    >{lbl}</button>
                  ))}
                </div>
              </div>
              <span className="adm-filterbar__count">총 <strong>{sellerTotal.toLocaleString()}</strong>건</span>
            </div>

            {/* 테이블 */}
            <div className="adm-table-wrap">
              {sellersLoading && (
                <div className="adm-table-overlay"><LoadingSpinner /></div>
              )}
              <table className="adm-table" aria-label="셀러 신청 목록">
                <thead>
                  <tr>
                    {SELLER_COLUMNS.map((col) => (
                      <th key={col.key} className="adm-th" style={{ minWidth: col.width }}>{col.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sellers.length === 0 ? (
                    <tr><td colSpan={SELLER_COLUMNS.length} className="adm-td-empty">해당하는 신청이 없습니다.</td></tr>
                  ) : sellers.map((s) => {
                    const st = SELLER_STATUS_STYLE[s.status] ?? { bg: '#F1F5F9', color: '#475569', label: s.status };
                    return (
                      <tr key={s.id} className="adm-tr">
                        <td className="adm-td adm-td--muted">{s.id}</td>
                        <td className="adm-td adm-td--bold">{s.bizName}</td>
                        <td className="adm-td adm-td--muted">
                          <div style={{ fontWeight: 600, color: '#1B2A3B' }}>{s.user?.name || '-'}</div>
                          <div style={{ fontSize: 11 }}>{s.user?.email || '-'}</div>
                        </td>
                        <td className="adm-td">{s.bizNumber}</td>
                        <td className="adm-td">{s.ceoName}</td>
                        <td className="adm-td">{s.phone}</td>
                        <td className="adm-td adm-td--muted">{formatDate(s.createdAt)}</td>
                        <td className="adm-td adm-td--center">
                          <span style={{
                            display: 'inline-flex', alignItems: 'center',
                            padding: '3px 10px', borderRadius: '99px',
                            fontSize: 12, fontWeight: 700,
                            background: st.bg, color: st.color,
                          }}>
                            {st.label}
                          </span>
                        </td>
                        <td className="adm-td adm-td--actions">
                          {s.status === 'PENDING' ? (
                            <>
                              <button
                                className="adm-btn"
                                style={{ background: '#DCFCE7', color: '#15803D', borderColor: '#86EFAC' }}
                                onClick={() => handleApprove(s.id)}
                              >
                                승인
                              </button>
                              <button
                                className="adm-btn adm-btn--delete"
                                onClick={() => handleReject(s.id)}
                              >
                                반려
                              </button>
                            </>
                          ) : (
                            <span style={{ fontSize: 12, color: '#64748B' }}>
                              {s.status === 'REJECTED' && s.rejectNote ? `사유: ${s.rejectNote}` : '-'}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* 페이지네이션 */}
            {sellerTotalPages > 1 && (
              <div className="adm-pagination">
                <button className="adm-page-btn" disabled={sellerPage <= 1} onClick={() => setSellerPage((p) => p - 1)}>← 이전</button>
                <span className="adm-page-info">{sellerPage} / {sellerTotalPages}</span>
                <button className="adm-page-btn" disabled={sellerPage >= sellerTotalPages} onClick={() => setSellerPage((p) => p + 1)}>다음 →</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
