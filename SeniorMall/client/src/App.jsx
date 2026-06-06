import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import BottomNav from './components/BottomNav.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import { useAuth } from './context/AuthContext.jsx';

import HomePage from './pages/HomePage.jsx';
import ProductListPage from './pages/ProductListPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import MyPage from './pages/MyPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import SellerApplyPage from './pages/SellerApplyPage.jsx';
import SellerDashboardPage from './pages/SellerDashboardPage.jsx';

// Auth 필요 라우트 가드 — 미로그인 시 /login으로 리디렉트하면서 원래 URL을 next 파라미터에 보존
function RequireAuth({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  if (loading) return <LoadingSpinner label="확인하는 중..." />;
  if (!isAuthenticated) {
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?next=${next}`} replace />;
  }
  return children;
}

// ADMIN 전용 라우트 가드 — ADMIN 역할이 아니면 홈으로 리디렉트
function RequireAdmin({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user?.role !== 'ADMIN') return <Navigate to="/" replace />;
  return children;
}

// SELLER 전용 라우트 가드 — SELLER 또는 ADMIN 역할이 아니면 홈으로 리디렉트
function RequireSeller({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user?.role !== 'SELLER' && user?.role !== 'ADMIN') return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isSeller = location.pathname.startsWith('/seller') && !location.pathname.startsWith('/seller/apply');

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin" element={<RequireAdmin><AdminDashboardPage /></RequireAdmin>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  if (isSeller) {
    return (
      <Routes>
        <Route path="/seller/*" element={<RequireSeller><SellerDashboardPage /></RequireSeller>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <>
      <a href="#main" className="skip-link">본문 바로가기</a>
      <Header />
      <main id="main" role="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<RequireAuth><CartPage /></RequireAuth>} />
          <Route path="/checkout" element={<RequireAuth><CheckoutPage /></RequireAuth>} />
          <Route path="/orders" element={<RequireAuth><OrdersPage /></RequireAuth>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/my" element={<RequireAuth><MyPage /></RequireAuth>} />
          <Route path="/seller/apply" element={<RequireAuth><SellerApplyPage /></RequireAuth>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <BottomNav />
    </>
  );
}
