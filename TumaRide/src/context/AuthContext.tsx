import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id' | 'createdAt' | 'isVerified' | 'rating'>) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading stored user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - in a real app, this would call an API
      let mockUser: User;
      
      if (email === 'sender@demo.com' && password === 'demo123') {
        mockUser = {
          id: 'sender123',
          name: 'Jane Sender',
          email,
          phone: '+254712345678',
          role: 'sender',
          isVerified: true,
          rating: 4.5,
          createdAt: new Date(),
        };
      } else if (email === 'traveler@demo.com' && password === 'demo123') {
        mockUser = {
          id: 'traveler123',
          name: 'John Traveler',
          email,
          phone: '+254798765432',
          role: 'traveler',
          isVerified: true,
          rating: 4.8,
          createdAt: new Date(),
        };
      } else {
        // Default user for other login attempts
        mockUser = {
          id: 'user123',
          name: 'Demo User',
          email,
          phone: '+254712345678',
          role: 'sender',
          isVerified: true,
          rating: 4.5,
          createdAt: new Date(),
        };
      }
      
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Omit<User, 'id' | 'createdAt' | 'isVerified' | 'rating'>) => {
    setIsLoading(true);
    try {
      // Mock registration - in a real app, this would call an API
      const newUser: User = {
        ...userData,
        id: `user_${Date.now()}`,
        isVerified: false,
        rating: 0,
        createdAt: new Date(),
      };
      
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      if (!user) throw new Error('No user logged in');
      
      const updatedUser = { ...user, ...userData };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Update user error:', error);
      throw new Error('Failed to update user');
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};