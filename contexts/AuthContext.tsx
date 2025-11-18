'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, User as ApiUser } from '@/lib/api-client';

interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  role: 'USER' | 'ADMIN';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount and verify with /me endpoint
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('auth_token');
      const storedUser = localStorage.getItem('auth_user');

      console.log('CheckAuth on mount:', { storedToken: !!storedToken, storedUser: !!storedUser });

      if (storedToken && storedUser) {
        try {
          // Verify token with /me endpoint
          const response = await authApi.me();
          console.log('Token verified:', response.data);
          setUser(response.data.user);
          setToken(storedToken);

          // Ensure cookie is also set
          document.cookie = `auth_token=${storedToken}; path=/; max-age=86400; SameSite=Strict`;
        } catch (error) {
          console.log('Token verification failed:', error);
          // Token is invalid, clear auth data
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
          document.cookie = 'auth_token=; path=/; max-age=0';
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('Login attempt:', { email, apiUrl: process.env.NEXT_PUBLIC_API_URL });
      const response = await authApi.login({ email, password });
      console.log('Login response:', response);

      const userData = response.data.data.user;
      const userToken = response.data.data.token;

      setUser(userData);
      setToken(userToken);

      // Store in localStorage
      localStorage.setItem('auth_token', userToken);
      localStorage.setItem('auth_user', JSON.stringify(userData));

      // Store in cookie for middleware access
      document.cookie = `auth_token=${userToken}; path=/; max-age=86400; SameSite=Strict`;
    } catch (error: any) {
      console.error('Login error:', error);
      console.error('Error response:', error.response);
      throw new Error(error.response?.data?.error || error.message || 'Login failed');
    }
  };

  const logout = async () => {
    try {
      // Call logout API to blacklist token
      await authApi.logout();
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API error:', error);
    } finally {
      // Clear local auth state
      setUser(null);
      setToken(null);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      document.cookie = 'auth_token=; path=/; max-age=0';
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}


