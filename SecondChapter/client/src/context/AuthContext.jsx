import { createContext, useContext, useState, useCallback } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userId, setUserId] = useState(() => {
    const id = localStorage.getItem('userId');
    return id ? parseInt(id) : null;
  });

  const login = useCallback(async (email, password) => {
    const data = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', String(data.userId));
    setToken(data.token);
    setUserId(data.userId);
  }, []);

  const register = useCallback(async (formData) => {
    const data = await api.post('/auth/register', formData);
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', String(data.userId));
    setToken(data.token);
    setUserId(data.userId);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setToken(null);
    setUserId(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, userId, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
