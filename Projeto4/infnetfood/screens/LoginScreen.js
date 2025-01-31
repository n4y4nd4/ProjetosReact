//screens/LoginScreen
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logoImage from '../assets/logo2.png'; 


export default function LoginScreen({ navigation,  setIsLoggedIn  }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('userEmail');
        console.log('E-mail recuperado no AsyncStorage:', storedEmail);
        if (storedEmail) {
          navigation.navigate('Home');
        }
      } catch (error) {
        console.error('Erro ao acessar o AsyncStorage:', error);
      }
    };
    checkLogin();
  }, [navigation]);

    const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, insira e-mail e senha válidos.');
    } else {
      try {
        await AsyncStorage.setItem('userEmail', email);
        setIsLoggedIn(true); 
        Alert.alert('Login bem-sucedido', 'Bem-vindo!', [
          { text: 'OK', onPress: () => navigation.navigate('Home') },
        ]);
      } catch (error) {
        console.error('Erro ao salvar no AsyncStorage:', error);
        Alert.alert('Erro', 'Falha ao salvar informações de login.');
      }
    }
    
  };
  

  return (
    <View style={styles.container}>
    <View style={styles.containerImage}>
      <Image source={logoImage} style={styles.logoImage} />
    </View>
           
      <Text style={styles.title}>Bem vindo ao InfnetFood!</Text>

      <Text style={styles.subtitle}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#999" 
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"

      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#999" 
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  containerImage: {
    justifyContent: 'center',
    alignItems: 'center',
    left:20,
  },
  logoImage: {
    width: 2000, 
    height: 250,
    resizeMode: 'contain', 
  },
  title: {
    fontSize: 28, 
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50, 
  },
  subtitle: {
    fontSize: 22, 
    fontWeight: '600',
    color: '#666',
    marginBottom: 40, 
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20, 
    backgroundColor: '#fff',
  },
});
