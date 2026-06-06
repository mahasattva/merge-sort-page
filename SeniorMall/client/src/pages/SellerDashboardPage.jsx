import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { getErrorMessage } from '../api/client.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function formatPrice(n) {
  if (n == null) return '0원';
  return Number(n).toLocaleString('ko-KR') + '원';
}

function formatDate(iso) {
  if (!iso) return '-';
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

/* ─── 상품 등록/수정 공통 폼 ────────────────────────────────────── */
function ProductForm({ initial, categories, onSubmit, submitLabel, submitting }) {
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    description: initial?.description ?? '',
    price: initial?.price ?? '',
    stock: initial?.stock ?? '',
    categoryId: initial?.categoryId ?? '',
    isActive: initial?.isActive !== false,
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(initial?.imageUrl ?? null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim())        errs.name = '상품명을 입력해 주세요.';
    if (!form.description.trim()) errs.description = '상품 설명을 입력해 주세요.';
    if (!form.price || Number(form.price) <= 0) errs.price = '가격을 올바르게 입력해 주세요.';
    if (!form.stock || Number(form.stock) < 0)  errs.stock = '재고를 올바르게 입력해 주세요.';
    if (!form.categoryId) errs.categoryId = '카테고리를 선택해 주세요.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const fd = new FormData();
    fd.append('name', form.name.trim());
    fd.append('description', form.description.trim());
    fd.append('price', form.price);
    fd.append('stock', form.stock);
    fd.append('categoryId', form.categoryId);
    fd.append('isActive', form.isActive ? 'true' : 'false');
    if (imageFile) fd.append('image', imageFile);

    onSubmit(fd);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* 상품명 */}
      <div className="seller-form-row">
        <label className="seller-form-label" htmlFor="pf-name">
          상품명 <span className="form__required">*</span>
        </label>
        <input
          id="pf-name"
          name="name"
          type="text"
          className={`seller-form-input${errors.name ? ' seller-form-input--error' : ''}`}
          value={form.name}
          onChange={handleChange}
          placeholder="상품명을 입력하세요"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'pf-name-err' : undefined}
        />
        {errors.name && <p id="pf-name-err" className="seller-form-error">{errors.name}</p>}
      </div>

      {/* 상품 설명 */}
      <div className="seller-form-row">
        <label className="seller-form-label" htmlFor="pf-desc">
          상품 설명 <span className="form__required">*</span>
        </label>
        <textarea
          id="pf-desc"
          name="description"
          className={`seller-form-textarea${errors.description ? ' seller-form-input--error' : ''}`}
          value={form.description}
          onChange={handleChange}
          placeholder="상품에 대해 자세히 설명해 주세요"
          rows={4}
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? 'pf-desc-err' : undefined}
        />
        {errors.description && <p id="pf-desc-err" className="seller-form-error">{errors.description}</p>}
      </div>

      {/* 가격 / 재고 */}
      <div className="seller-form-row-2col">
        <div className="seller-form-row">
          <label className="seller-form-label" htmlFor="pf-price">
            가격 (원) <span className="form__required">*</span>
          </label>
          <input
            id="pf-price"
            name="price"
            type="number"
            min="0"
            className={`seller-form-input${errors.price ? ' seller-form-input--error' : ''}`}
            value={form.price}
            onChange={handleChange}
            placeholder="0"
            aria-invalid={!!errors.price}
            aria-describedby={errors.price ? 'pf-price-err' : undefined}
          />
          {errors.price && <p id="pf-price-err" className="seller-form-error">{errors.price}</p>}
        </div>
        <div className="seller-form-row">
          <label className="seller-form-label" htmlFor="pf-stock">
            재고 <span className="form__required">*</span>
          </label>
          <input
            id="pf-stock"
            name="stock"
            type="number"
            min="0"
            className={`seller-form-input${errors.stock ? ' seller-form-input--error' : ''}`}
            value={form.stock}
            onChange={handleChange}
            placeholder="0"
            aria-invalid={!!errors.stock}
            aria-describedby={errors.stock ? 'pf-stock-err' : undefined}
          />
          {errors.stock && <p id="pf-stock-err" className="seller-form-error">{errors.stock}</p>}
        </div>
      </div>

      {/* 카테고리 */}
      <div className="seller-form-row">
        <label className="seller-form-label" htmlFor="pf-cat">
          카테고리 <span className="form__required">*</span>
        </label>
        <select
          id="pf-cat"
          name="categoryId"
          className={`seller-form-select${errors.categoryId ? ' seller-form-input--error' : ''}`}
          value={form.categoryId}
          onChange={handleChange}
          aria-invalid={!!errors.categoryId}
          aria-describedby={errors.categoryId ? 'pf-cat-err' : undefined}
        >
          <option value="">카테고리 선택</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        {errors.categoryId && <p id="pf-cat-err" className="seller-form-error">{errors.categoryId}</p>}
      </div>

      {/* 이미지 */}
      <div className="seller-form-row">
        <label className="seller-form-label" htmlFor="pf-img">상품 이미지</label>
        <div className="seller-img-upload">
          {preview && (
            <img src={preview} alt="미리보기" className="seller-img-preview" />
          )}
          <input
            id="pf-img"
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="seller-form-file"
          />
          <label htmlFor="pf-img" className="seller-img-btn">
            {preview ? '이미지 변경' : '이미지 선택'}
          </label>
        </div>
      </div>

      {/* 공개 여부 (수정 시에만 표시) */}
      {initial && (
        <div className="seller-form-row seller-form-row--inline">
          <input
            id="pf-active"
            name="isActive"
            type="checkbox"
            checked={form.isActive}
            onChange={handleChange}
            className="seller-form-checkbox"
          />
          <label htmlFor="pf-active" className="seller-form-label seller-form-label--inline">
            판매 중 (공개)
          </label>
        </div>
      )}

      <button
        type="submit"
        className="adm-btn seller-submit-btn"
        disabled={submitting}
      >
        {submitting ? '처리 중...' : submitLabel}
      </button>
    </form>
  );
}

/* ─── 주문 상태 배지 ────────────────────────────────────────────── */
const ORDER_STATUS = {
  PENDING:   { label: '결제대기', bg: '#F1F5F9', color: '#475569' },
  PAID:      { label: '결제완료', bg: '#DBEAFE', color: '#1D4ED8' },
  SHIPPED:   { label: '배송중',   bg: '#EDE9FE', color: '#6D28D9' },
  DELIVERED: { label: '배송완료', bg: '#DCFCE7', color: '#15803D' },
  CANCELLED: { label: '취소',     bg: '#FEE2E2', color: '#991B1B' },
};
function OrderStatusBadge({ status }) {
  const s = ORDER_STATUS[status] || { label: status, bg: '#F1F5F9', color: '#475569' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '3px 10px', borderRadius: 99,
      fontSize: 12, fontWeight: 700,
      background: s.bg, color: s.color,
    }}>{s.label}</span>
  );
}

/* ─── 주문 관리 탭 ──────────────────────────────────────────────── */
function OrdersTab() {
  const [orders,       setOrders]       = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [page,         setPage]         = useState(1);
  const [totalPages,   setTotalPages]   = useState(1);
  const [total,        setTotal]        = useState(0);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ page, limit: 20 });
    if (statusFilter) params.set('status', statusFilter);
    api.get(`/api/seller/orders?${params}`)
      .then(({ data }) => {
        setOrders(data.items ?? []);
        setTotal(data.total ?? 0);
        setTotalPages(data.totalPages ?? 1);
      })
      .catch((err) => {
        alert(getErrorMessage(err, '주문 목록을 불러오지 못했습니다.'));
      })
      .finally(() => setLoading(false));
  }, [page, statusFilter]);

  const handleStatusChange = async (orderId, newStatus) => {
    const label = newStatus === 'SHIPPED' ? '배송 시작' : '배송 완료';
    if (!window.confirm(`주문 #${orderId}을 [${label}] 처리하시겠습니까?`)) return;
    try {
      await api.patch(`/api/seller/orders/${orderId}/status`, { status: newStatus });
      setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      alert(getErrorMessage(err, '상태 변경에 실패했습니다.'));
    }
  };

  return (
    <div>
      {/* 헤더 */}
      <div className="adm-topbar">
        <h2 className="adm-topbar__title">주문 관리</h2>
      </div>

      {/* 상태 필터 탭 */}
      <div className="adm-filterbar">
        <div className="adm-role-tabs">
          {[['', '전체'], ['PAID', '결제완료'], ['SHIPPED', '배송중'], ['DELIVERED', '배송완료']].map(([v, l]) => (
            <button
              key={v}
              type="button"
              className={`adm-tab${statusFilter === v ? ' adm-tab--active' : ''}`}
              onClick={() => { setStatusFilter(v); setPage(1); }}
            >
              {l}
            </button>
          ))}
        </div>
        <span className="adm-filterbar__count">총 <strong>{total}</strong>건</span>
      </div>

      {/* 주문 테이블 */}
      <div className="adm-table-wrap">
        {loading && (
          <div className="adm-table-overlay"><LoadingSpinner label="불러오는 중..." /></div>
        )}
        <table className="adm-table">
          <thead>
            <tr>
              <th className="adm-th" style={{ minWidth: 64 }}>주문번호</th>
              <th className="adm-th" style={{ minWidth: 100 }}>주문일</th>
              <th className="adm-th" style={{ minWidth: 80 }}>구매자</th>
              <th className="adm-th" style={{ minWidth: 200 }}>주문 상품</th>
              <th className="adm-th" style={{ minWidth: 100 }}>금액</th>
              <th className="adm-th" style={{ minWidth: 120 }}>배송지</th>
              <th className="adm-th" style={{ minWidth: 90 }}>상태</th>
              <th className="adm-th" style={{ minWidth: 140 }}>처리</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="adm-tr">
                <td className="adm-td adm-td--muted">#{order.id}</td>
                <td className="adm-td adm-td--muted">{formatDate(order.createdAt)}</td>
                <td className="adm-td adm-td--bold">{order.buyerName}</td>
                <td className="adm-td">
                  {order.myItems.map((item) => (
                    <div key={item.id} style={{ fontSize: 12 }}>
                      {item.name} × {item.quantity}
                    </div>
                  ))}
                </td>
                <td className="adm-td adm-td--right">{formatPrice(order.myTotal)}</td>
                <td className="adm-td adm-td--muted adm-td--truncate" style={{ maxWidth: 180 }}>
                  {order.shippingAddress}
                  {order.memo && <div style={{ fontSize: 11, color: '#888' }}>메모: {order.memo}</div>}
                </td>
                <td className="adm-td adm-td--center">
                  <OrderStatusBadge status={order.status} />
                </td>
                <td className="adm-td adm-td--actions">
                  {order.status === 'PAID' && (
                    <button className="adm-btn adm-btn--role"
                      onClick={() => handleStatusChange(order.id, 'SHIPPED')}>
                      배송 시작
                    </button>
                  )}
                  {order.status === 'SHIPPED' && (
                    <button className="adm-btn adm-btn--role"
                      onClick={() => handleStatusChange(order.id, 'DELIVERED')}>
                      배송 완료
                    </button>
                  )}
                  {(order.status === 'DELIVERED' || order.status === 'CANCELLED') && (
                    <span style={{ fontSize: 12, color: '#94a3b8' }}>처리 완료</span>
                  )}
                  {order.status === 'PENDING' && (
                    <span style={{ fontSize: 12, color: '#94a3b8' }}>결제 대기</span>
                  )}
                </td>
              </tr>
            ))}
            {!loading && orders.length === 0 && (
              <tr><td colSpan={8} className="adm-td-empty">주문이 없습니다.</td></tr>
            )}
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
    </div>
  );
}

/* ─── 메인 컴포넌트 ─────────────────────────────────────────────── */
export default function SellerDashboardPage() {
  const { user: me, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('seller-mode');
    return () => document.body.classList.remove('seller-mode');
  }, []);

  const [activeTab, setActiveTab] = useState('dashboard');

  /* ── 대시보드 상태 ──────────────────────────────────────────── */
  const [stats,       setStats]       = useState(null);
  const [recentProds, setRecentProds] = useState([]);
  const [dashLoading, setDashLoading] = useState(true);
  const [dashError,   setDashError]   = useState(null);

  /* ── 상품 목록 상태 ─────────────────────────────────────────── */
  const [products,    setProducts]    = useState([]);
  const [prodLoading, setProdLoading] = useState(false);
  const [prodPage,    setProdPage]    = useState(1);
  const [prodTotal,   setProdTotal]   = useState(0);
  const [prodTotalPages, setProdTotalPages] = useState(1);
  const [activeFilter, setActiveFilter] = useState('');

  /* ── 폼 (등록/수정) 상태 ────────────────────────────────────── */
  const [categories,  setCategories]  = useState([]);
  const [editTarget,  setEditTarget]  = useState(null);
  const [submitting,  setSubmitting]  = useState(false);
  const [formMsg,     setFormMsg]     = useState(null);

  /* ── 대시보드 로드 ──────────────────────────────────────────── */
  useEffect(() => {
    setDashLoading(true);
    Promise.all([
      api.get('/api/seller/stats'),
      api.get('/api/seller/products?page=1&limit=5'),
    ])
      .then(([statsRes, prodsRes]) => {
        setStats(statsRes.data);
        setRecentProds(prodsRes.data.items ?? []);
      })
      .catch((err) => setDashError(getErrorMessage(err, '대시보드를 불러오지 못했습니다.')))
      .finally(() => setDashLoading(false));
  }, []);

  /* ── 카테고리 1회 로드 ──────────────────────────────────────── */
  useEffect(() => {
    api.get('/api/categories')
      .then(({ data }) => setCategories(data.items ?? []))
      .catch(() => {});
  }, []);

  /* ── 상품 목록 로드 ─────────────────────────────────────────── */
  const loadProducts = useCallback(async (page, filter) => {
    setProdLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 20 });
      if (filter === 'active')   params.set('isActive', 'true');
      if (filter === 'inactive') params.set('isActive', 'false');
      const { data } = await api.get(`/api/seller/products?${params}`);
      setProducts(data.items ?? []);
      setProdPage(page);
      setProdTotal(data.total ?? 0);
      setProdTotalPages(data.totalPages ?? 1);
    } catch (err) {
      alert(getErrorMessage(err, '상품 목록을 불러오지 못했습니다.'));
    } finally {
      setProdLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'products') loadProducts(prodPage, activeFilter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, prodPage, activeFilter]);

  /* ── 공개/숨김 토글 ─────────────────────────────────────────── */
  const handleToggleActive = async (product) => {
    const next = !product.isActive;
    try {
      const fd = new FormData();
      fd.append('isActive', next ? 'true' : 'false');
      await api.patch(`/api/seller/products/${product.id}`, fd);
      setProducts((prev) =>
        prev.map((p) => p.id === product.id ? { ...p, isActive: next } : p)
      );
    } catch (err) {
      alert(getErrorMessage(err, '상태 변경에 실패했습니다.'));
    }
  };

  /* ── 상품 등록 ───────────────────────────────────────────────── */
  const handleCreate = async (fd) => {
    setSubmitting(true);
    setFormMsg(null);
    try {
      await api.post('/api/seller/products', fd);
      setFormMsg({ type: 'success', text: '상품이 등록되었습니다.' });
      setTimeout(() => { setActiveTab('products'); setFormMsg(null); }, 1200);
    } catch (err) {
      setFormMsg({ type: 'error', text: getErrorMessage(err, '등록에 실패했습니다.') });
    } finally {
      setSubmitting(false);
    }
  };

  /* ── 상품 수정 ───────────────────────────────────────────────── */
  const handleUpdate = async (fd) => {
    if (!editTarget) return;
    setSubmitting(true);
    setFormMsg(null);
    try {
      await api.patch(`/api/seller/products/${editTarget.id}`, fd);
      setFormMsg({ type: 'success', text: '상품이 수정되었습니다.' });
      setTimeout(() => { setActiveTab('products'); setEditTarget(null); setFormMsg(null); }, 1200);
    } catch (err) {
      setFormMsg({ type: 'error', text: getErrorMessage(err, '수정에 실패했습니다.') });
    } finally {
      setSubmitting(false);
    }
  };

  /* ── 로그아웃 ────────────────────────────────────────────────── */
  const handleLogout = async () => {
    if (!window.confirm('로그아웃 하시겠습니까?')) return;
    await logout();
    navigate('/', { replace: true });
  };

  /* ── 탭 전환 시 폼 메시지 초기화 ──────────────────────────── */
  const handleTabChange = (tab) => {
    setFormMsg(null);
    if (tab !== 'edit') setEditTarget(null);
    setActiveTab(tab);
  };

  /* ── 수정 탭 진입 ───────────────────────────────────────────── */
  const enterEdit = (product) => {
    setEditTarget(product);
    setFormMsg(null);
    setActiveTab('edit');
  };

  /* ── 이미지 URL 헬퍼 ────────────────────────────────────────── */
  const imgSrc = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `/uploads/${url}`;
  };

  /* ── 렌더 ───────────────────────────────────────────────────── */
  return (
    <div className="adm-layout">
      {/* 사이드바 */}
      <aside className="adm-sidebar seller-sidebar">
        <div className="adm-sidebar__brand">
          <span className="adm-sidebar__logo">🏪</span>
          <span className="adm-sidebar__title">셀러 센터</span>
          <span className="adm-sidebar__sub">{stats?.bizName ?? '판매자'}</span>
        </div>

        <nav className="adm-nav" aria-label="셀러 메뉴">
          {[
            { key: 'dashboard', icon: '📊', label: '대시보드' },
            { key: 'products',  icon: '📦', label: '상품 관리' },
            { key: 'new',       icon: '➕', label: '상품 등록' },
          ].map(({ key, icon, label }) => (
            <button
              key={key}
              type="button"
              className={`adm-nav__item${activeTab === key || (activeTab === 'edit' && key === 'products') ? ' adm-nav__item--active' : ''}`}
              onClick={() => handleTabChange(key)}
              style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', fontFamily: 'inherit', cursor: 'pointer' }}
            >
              <span className="adm-nav__icon">{icon}</span> {label}
            </button>
          ))}
          <button
            type="button"
            className={`adm-nav__item${activeTab === 'orders' ? ' adm-nav__item--active' : ''}`}
            onClick={() => handleTabChange('orders')}
            style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', fontFamily: 'inherit', cursor: 'pointer' }}
          >
            <span className="adm-nav__icon">📋</span> 주문 관리
            {stats?.pendingShipCount > 0 && (
              <span className="adm-nav__badge">{stats.pendingShipCount}</span>
            )}
          </button>
        </nav>

        <div className="adm-sidebar__footer">
          <div className="adm-sidebar__user">
            <div className="adm-sidebar__avatar">{me?.name?.[0] ?? 'S'}</div>
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

        {/* ── 대시보드 탭 ─────────────────────────────────────── */}
        {activeTab === 'dashboard' && (
          <>
            <div className="adm-topbar">
              <h1 className="adm-topbar__title">
                {stats?.bizName ? `${stats.bizName} 님, 반갑습니다` : '대시보드'}
              </h1>
              <span className="adm-topbar__date">
                {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>

            {dashLoading && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
                <LoadingSpinner label="불러오는 중..." />
              </div>
            )}

            {dashError && (
              <p className="seller-alert seller-alert--error">{dashError}</p>
            )}

            {!dashLoading && !dashError && stats && (
              <>
                {/* 통계 카드 5개 */}
                <div className="adm-stats" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
                  <div className="adm-stat">
                    <div className="adm-stat__icon">📦</div>
                    <div className="adm-stat__body">
                      <p className="adm-stat__value">{(stats.productCount ?? 0).toLocaleString()}</p>
                      <p className="adm-stat__label">전체 상품</p>
                    </div>
                  </div>
                  <div className="adm-stat">
                    <div className="adm-stat__icon">✅</div>
                    <div className="adm-stat__body">
                      <p className="adm-stat__value">{(stats.activeCount ?? 0).toLocaleString()}</p>
                      <p className="adm-stat__label">판매 중</p>
                    </div>
                  </div>
                  <div className="adm-stat">
                    <div className="adm-stat__icon">🙈</div>
                    <div className="adm-stat__body">
                      <p className="adm-stat__value">{(stats.inactiveCount ?? 0).toLocaleString()}</p>
                      <p className="adm-stat__label">숨김 처리</p>
                    </div>
                  </div>
                  <div className="adm-stat">
                    <div className="adm-stat__icon">🛒</div>
                    <div className="adm-stat__body">
                      <p className="adm-stat__value">{(stats.orderCount ?? 0).toLocaleString()}</p>
                      <p className="adm-stat__label">전체 주문</p>
                    </div>
                  </div>
                  <div className="adm-stat">
                    <div className="adm-stat__icon">🚚</div>
                    <div className="adm-stat__body">
                      <p className="adm-stat__value">{(stats.pendingShipCount ?? 0).toLocaleString()}</p>
                      <p className="adm-stat__label">배송 대기</p>
                    </div>
                  </div>
                </div>

                {/* 최근 등록 상품 */}
                <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1B2A3B', margin: '24px 0 12px' }}>
                  최근 등록 상품
                </h2>
                {recentProds.length === 0 ? (
                  <p style={{ color: '#64748B', fontSize: 14 }}>등록된 상품이 없습니다.</p>
                ) : (
                  <div className="adm-table-wrap">
                    <table className="adm-table" aria-label="최근 등록 상품">
                      <thead>
                        <tr>
                          <th className="adm-th">이미지</th>
                          <th className="adm-th">상품명</th>
                          <th className="adm-th">가격</th>
                          <th className="adm-th">재고</th>
                          <th className="adm-th">상태</th>
                          <th className="adm-th">등록일</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentProds.map((p) => (
                          <tr key={p.id} className="adm-tr">
                            <td className="adm-td">
                              {imgSrc(p.imageUrl) ? (
                                <img src={imgSrc(p.imageUrl)} alt={p.name} className="seller-thumb" />
                              ) : (
                                <div className="seller-thumb seller-thumb--empty">없음</div>
                              )}
                            </td>
                            <td className="adm-td adm-td--bold">{p.name}</td>
                            <td className="adm-td adm-td--right">{formatPrice(p.price)}</td>
                            <td className="adm-td adm-td--center">{p.stock}</td>
                            <td className="adm-td adm-td--center">
                              <span className={`seller-status-badge seller-status-badge--${p.isActive ? 'active' : 'inactive'}`}>
                                {p.isActive ? '판매 중' : '숨김'}
                              </span>
                            </td>
                            <td className="adm-td adm-td--muted">{formatDate(p.createdAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* ── 상품 목록 탭 ────────────────────────────────────── */}
        {activeTab === 'products' && (
          <>
            <div className="adm-topbar">
              <h1 className="adm-topbar__title">내 상품 목록</h1>
              <button
                type="button"
                className="adm-btn seller-submit-btn"
                onClick={() => handleTabChange('new')}
                style={{ background: '#1A3A2A', color: '#fff', borderColor: '#1A3A2A', minWidth: 120 }}
              >
                + 새 상품 등록
              </button>
            </div>

            {/* 필터 */}
            <div className="adm-filterbar">
              <div className="adm-filterbar__left">
                <div className="adm-role-tabs" role="group" aria-label="상품 상태 필터">
                  {[['', '전체'], ['active', '판매 중'], ['inactive', '숨김']].map(([val, lbl]) => (
                    <button
                      key={val}
                      type="button"
                      className={`adm-tab${activeFilter === val ? ' adm-tab--active' : ''}`}
                      onClick={() => { setActiveFilter(val); setProdPage(1); }}
                      aria-pressed={activeFilter === val}
                    >{lbl}</button>
                  ))}
                </div>
              </div>
              <span className="adm-filterbar__count">총 <strong>{prodTotal.toLocaleString()}</strong>개</span>
            </div>

            {/* 테이블 */}
            <div className="adm-table-wrap">
              {prodLoading && (
                <div className="adm-table-overlay"><LoadingSpinner label="불러오는 중..." /></div>
              )}
              <table className="adm-table" aria-label="내 상품 목록">
                <thead>
                  <tr>
                    <th className="adm-th" style={{ minWidth: 56 }}>이미지</th>
                    <th className="adm-th" style={{ minWidth: 180 }}>상품명</th>
                    <th className="adm-th" style={{ minWidth: 100 }}>카테고리</th>
                    <th className="adm-th" style={{ minWidth: 90 }}>가격</th>
                    <th className="adm-th" style={{ minWidth: 60 }}>재고</th>
                    <th className="adm-th" style={{ minWidth: 80 }}>상태</th>
                    <th className="adm-th" style={{ minWidth: 140 }}>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="adm-td-empty">상품이 없습니다.</td>
                    </tr>
                  ) : products.map((p) => (
                    <tr key={p.id} className="adm-tr">
                      <td className="adm-td">
                        {imgSrc(p.imageUrl) ? (
                          <img src={imgSrc(p.imageUrl)} alt={p.name} className="seller-thumb" />
                        ) : (
                          <div className="seller-thumb seller-thumb--empty">없음</div>
                        )}
                      </td>
                      <td className="adm-td adm-td--bold">{p.name}</td>
                      <td className="adm-td adm-td--muted">{p.category?.name ?? p.categoryId ?? '-'}</td>
                      <td className="adm-td adm-td--right">{formatPrice(p.price)}</td>
                      <td className="adm-td adm-td--center">{p.stock}</td>
                      <td className="adm-td adm-td--center">
                        <span className={`seller-status-badge seller-status-badge--${p.isActive ? 'active' : 'inactive'}`}>
                          {p.isActive ? '판매 중' : '숨김'}
                        </span>
                      </td>
                      <td className="adm-td adm-td--actions">
                        <button
                          className="adm-btn adm-btn--role"
                          onClick={() => enterEdit(p)}
                        >
                          수정
                        </button>
                        <button
                          className={`adm-btn ${p.isActive ? 'adm-btn--delete' : ''}`}
                          style={!p.isActive ? { background: '#DCFCE7', color: '#15803D', borderColor: '#86EFAC' } : {}}
                          onClick={() => handleToggleActive(p)}
                        >
                          {p.isActive ? '숨김' : '공개'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 페이지네이션 */}
            {prodTotalPages > 1 && (
              <div className="adm-pagination">
                <button className="adm-page-btn" disabled={prodPage <= 1} onClick={() => setProdPage((p) => p - 1)}>← 이전</button>
                <span className="adm-page-info">{prodPage} / {prodTotalPages}</span>
                <button className="adm-page-btn" disabled={prodPage >= prodTotalPages} onClick={() => setProdPage((p) => p + 1)}>다음 →</button>
              </div>
            )}
          </>
        )}

        {/* ── 상품 등록 탭 ────────────────────────────────────── */}
        {activeTab === 'new' && (
          <>
            <div className="adm-topbar">
              <h1 className="adm-topbar__title">새 상품 등록</h1>
            </div>

            {formMsg && (
              <p className={`seller-alert seller-alert--${formMsg.type}`}>{formMsg.text}</p>
            )}

            <div className="seller-form-card">
              <ProductForm
                initial={null}
                categories={categories}
                onSubmit={handleCreate}
                submitLabel="등록하기"
                submitting={submitting}
              />
            </div>
          </>
        )}

        {/* ── 주문 관리 탭 ────────────────────────────────────── */}
        {activeTab === 'orders' && (
          <OrdersTab />
        )}

        {/* ── 상품 수정 탭 ────────────────────────────────────── */}
        {activeTab === 'edit' && editTarget && (
          <>
            <div className="adm-topbar">
              <h1 className="adm-topbar__title">상품 수정</h1>
              <button
                type="button"
                className="adm-btn"
                style={{ background: '#fff', color: '#64748B', borderColor: '#CBD5E1' }}
                onClick={() => handleTabChange('products')}
              >
                ← 목록으로
              </button>
            </div>

            {formMsg && (
              <p className={`seller-alert seller-alert--${formMsg.type}`}>{formMsg.text}</p>
            )}

            <div className="seller-form-card">
              <ProductForm
                key={editTarget.id}
                initial={{
                  ...editTarget,
                  categoryId: editTarget.categoryId ?? editTarget.category?.id ?? '',
                  imageUrl: imgSrc(editTarget.imageUrl),
                }}
                categories={categories}
                onSubmit={handleUpdate}
                submitLabel="수정하기"
                submitting={submitting}
              />
            </div>
          </>
        )}

      </div>
    </div>
  );
}
