import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import BottomNav from './components/BottomNav';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfileSetupPage from './pages/ProfileSetupPage';
import ProfilePage from './pages/ProfilePage';
import DiscoverPage from './pages/DiscoverPage';
import MatchesPage from './pages/MatchesPage';
import ChatPage from './pages/ChatPage';
import './App.css';

const AUTH_ROUTES = ['/login', '/register'];
const SETUP_ROUTES = ['/profile/setup'];
const FULL_SCREEN_ROUTES = ['/profile/setup'];  // no header, no nav

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}

function PlaceholderPage({ title }) {
  return (
    <div className="page-content">
      <h2>{title}</h2>
      <p className="page-subtitle">Coming soon.</p>
    </div>
  );
}

export default function App() {
  const { token } = useAuth();
  const location = useLocation();
  const isAuthPage = AUTH_ROUTES.includes(location.pathname);
  const isSetupPage = SETUP_ROUTES.includes(location.pathname);
  const showNav = token && !isAuthPage && !isSetupPage;

  return (
    <div className={`app ${showNav ? 'app-with-nav' : ''}`}>
      {!isAuthPage && !isSetupPage && (
        <header className="app-header">
          <h1>Second Chapter</h1>
        </header>
      )}
      <main className={isAuthPage ? 'main-auth' : 'main-app'}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile/setup" element={<PrivateRoute><ProfileSetupPage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="/discover" element={<PrivateRoute><DiscoverPage /></PrivateRoute>} />
          <Route path="/matches" element={<PrivateRoute><MatchesPage /></PrivateRoute>} />
          <Route path="/messages" element={<PrivateRoute><MatchesPage /></PrivateRoute>} />
          <Route path="/messages/:matchId" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
          <Route path="*" element={<Navigate to={token ? '/discover' : '/login'} replace />} />
        </Routes>
      </main>
      {showNav && <BottomNav />}
    </div>
  );
}
