import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api, { tokenStore, getErrorMessage } from '../api/client.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // 마운트 시 토큰이 있으면 검증 중인 상태. 토큰 없으면 곧바로 false.
  const [loading, setLoading] = useState(!!tokenStore.access);

  // 마운트 시 저장된 토큰으로 /api/users/me 호출하여 세션 복원
  useEffect(() => {
    let cancelled = false;
    if (!tokenStore.access) { setLoading(false); return; }
    (async () => {
      try {
        const { data } = await api.get('/api/users/me');
        if (!cancelled) setUser(data);
      } catch {
        if (!cancelled) {
          tokenStore.clear();
          setUser(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      tokenStore.setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
      setUser(data.user);
      return { ok: true, user: data.user };
    } catch (err) {
      return { ok: false, error: getErrorMessage(err, '이메일 또는 비밀번호가 올바르지 않습니다.') };
    }
  }, []);

  const register = useCallback(async (payload) => {
    try {
      const { data } = await api.post('/api/auth/register', payload);
      tokenStore.setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
      setUser(data.user);
      return { ok: true, user: data.user };
    } catch (err) {
      return { ok: false, error: getErrorMessage(err, '회원가입에 실패했습니다.') };
    }
  }, []);

  const logout = useCallback(async () => {
    try { await api.post('/api/auth/logout'); } catch { /* 서버 에러 무시: 클라이언트 토큰 폐기가 핵심 */ }
    tokenStore.clear();
    setUser(null);
  }, []);

  const refreshMe = useCallback(async () => {
    try {
      const { data } = await api.get('/api/users/me');
      setUser(data);
    } catch { /* 무시 */ }
  }, []);

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
    refreshMe
  }), [user, loading, login, register, logout, refreshMe]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
