import { AuthService } from '../services/AuthService';
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Erro de contexto');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const user = await AuthService.checkAuth();
      setUser(user);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const user = await AuthService.login(email, password);
      setUser(user);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const register = async (email, password, username) => {
    try {
      setError(null);
      const user = await AuthService.register(email, password, username);
      setUser(user);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      register, 
      loading, 
      error 
    }}>
      {children}
    </AuthContext.Provider>
  );
};