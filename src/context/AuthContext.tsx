
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type User = {
  id: string;
  name: string;
  avatar: string;
  eloRating: number;
  safetyRating: number;
  level: 'Rookie' | 'Amateur' | 'Silver' | 'Pro';
  credits: number;
  country: string;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Mock user data for demonstration
  const mockUser: User = {
    id: '12345',
    name: 'Max Verstappen',
    avatar: '/users/user1.jpg',
    eloRating: 2150,
    safetyRating: 92,
    level: 'Pro',
    credits: 5000,
    country: 'NL',
  };

  const login = () => {
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('isLoggedIn');
  };

  // Check for existing login on page load
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      setUser(mockUser);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
