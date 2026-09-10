import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'easyhire_user';

function getStoredUser() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);

  const login = useCallback((email, _password, remember = false) => {
    // Mock auth — accepts any credentials for MVP
    const mockUser = {
      id: 'user-001',
      name: 'Sanjay Mehta',
      email: email,
      role: 'HR Recruiter',
      avatar: 'SM',
    };
    setUser(mockUser);
    if (remember) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
    }
    return mockUser;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;
