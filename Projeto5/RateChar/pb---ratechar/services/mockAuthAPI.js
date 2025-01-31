import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer';

const USERS_KEY = 'mock_users';
const TOKENS_KEY = 'mock_tokens';
const DELAY = 1000;

const generateToken = (user) => {
  return Buffer.from(`${user.email}:${Date.now()}`).toString('base64');
};

export const MockAuthAPI = {
  delay: () => new Promise(resolve => setTimeout(resolve, DELAY)),

  findUser: async (email) => {
    const users = JSON.parse(await AsyncStorage.getItem(USERS_KEY) || '[]');
    return users.find(u => u.email === email);
  },

  register: async (email, password, username) => {
    await MockAuthAPI.delay();
    
    if (await MockAuthAPI.findUser(email)) {
      throw new Error('E-mail já registrado');
    }

    const newUser = { id: Date.now(), email, password, username };
    const users = JSON.parse(await AsyncStorage.getItem(USERS_KEY) || '[]');
    users.push(newUser);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));

    const token = generateToken(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    
    await AsyncStorage.setItem(TOKENS_KEY + token, JSON.stringify({
      user: userWithoutPassword,
      expiry: Date.now() + (24 * 60 * 60 * 1000)
    }));

    return {
      user: userWithoutPassword,
      token
    };
  },

  login: async (email, password) => {
    await MockAuthAPI.delay();
    
    const user = await MockAuthAPI.findUser(email);
    if (!user || user.password !== password) {
      throw new Error('Login ou senha inválidos');
    }

    const token = generateToken(user);
    const { password: _, ...userWithoutPassword } = user;

    await AsyncStorage.setItem(TOKENS_KEY + token, JSON.stringify({
      user: userWithoutPassword,
      expiry: Date.now() + (24 * 60 * 60 * 1000)
    }));

    return {
      user: userWithoutPassword,
      token
    };
  },

  validateToken: async (token) => {
    const tokenData = await AsyncStorage.getItem(TOKENS_KEY + token);
    if (!tokenData) return null;

    const { user, expiry } = JSON.parse(tokenData);
    if (Date.now() > expiry) {
      await AsyncStorage.removeItem(TOKENS_KEY + token);
      return null;
    }

    return user;
  }
};