import { createContext, useContext, useEffect, useState } from 'react';
import { AuthAPI } from '../api/client.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('verdant_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  // Re-validate token on mount
  useEffect(() => {
    const token = localStorage.getItem('verdant_token');
    if (!token) return;
    AuthAPI.me()
      .then(({ user }) => {
        setUser(user);
        localStorage.setItem('verdant_user', JSON.stringify(user));
      })
      .catch(() => {
        setUser(null);
        localStorage.removeItem('verdant_token');
        localStorage.removeItem('verdant_user');
      });
  }, []);

  const persist = ({ user, token }) => {
    localStorage.setItem('verdant_token', token);
    localStorage.setItem('verdant_user', JSON.stringify(user));
    setUser(user);
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await AuthAPI.login({ email, password });
      persist(data);
      return data.user;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const data = await AuthAPI.signup({ name, email, password });
      persist(data);
      return data.user;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('verdant_token');
    localStorage.removeItem('verdant_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
