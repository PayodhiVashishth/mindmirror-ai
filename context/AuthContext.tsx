import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { MOCK_USERS_DB } from '../services/mockAuthService';

interface AuthContextType {
  currentUser: User | null;
  login: (username: string, password_not_used: string) => Promise<User>;
  logout: () => void;
  register: (username: string, password_not_used: string) => Promise<User>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for a saved user session
    try {
      const savedUser = localStorage.getItem('mindmirror-user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('mindmirror-user');
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password_not_used: string): Promise<User> => {
    const user = await MOCK_USERS_DB.findUserByUsername(username);
    if (!user) {
      throw new Error("User not found");
    }
    // In a real app, you'd verify the password here
    setCurrentUser(user);
    localStorage.setItem('mindmirror-user', JSON.stringify(user));
    return user;
  };

  const register = async (username: string, password_not_used: string): Promise<User> => {
    const existingUser = await MOCK_USERS_DB.findUserByUsername(username);
    if (existingUser) {
      throw new Error("Username already exists");
    }
    const newUser = await MOCK_USERS_DB.createUser(username, password_not_used);
    setCurrentUser(newUser);
    localStorage.setItem('mindmirror-user', JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('mindmirror-user');
  };

  const value = {
    currentUser,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
