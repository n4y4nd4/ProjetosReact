import { MockAuthAPI } from './mockAuthAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePassword = (password) => {
  return password.length >= 6;
};

export const AuthService = {
    login: async (email, password) => {
      try {
        if (!validateEmail(email)) throw new Error('E-mail inválido');
        if (!validatePassword(password)) throw new Error('Senha inválida');
  
        const { user, token } = await MockAuthAPI.login(email, password);
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
        return user;
      } catch (error) {
        throw error;
      }
    },

    register: async (email, password, username) => {
        try {
          if (!validateEmail(email)) throw new Error('E-mail inválido');
          if (!validatePassword(password)) throw new Error('Senha inválida');
          if (!username || username.length < 2) throw new Error('Usuário inválido');
    
          const { user, token } = await MockAuthAPI.register(email, password, username);
          await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
          await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
          return user;
        } catch (error) {
          throw error;
        }
      },

  logout: async () => {
    try {
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
      await AsyncStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error('Erro de logout:', error);
    }
  },

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      const userData = await AsyncStorage.getItem(USER_KEY);
      
      if (!token || !userData) {
        return null;
      }

      return JSON.parse(userData);
    } catch (error) {
      return null;
    }
  },

  getToken: async () => {
    try {
      return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
      return null;
    }
  }
};