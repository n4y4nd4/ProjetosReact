//screens/SettingsScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Switch, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../App';

export default function SettingsScreen({ setIsLoggedIn }) {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userEmail');
      setIsLoggedIn(false); 
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível sair da conta.');
    }
  };

  return (
    <View style={[styles.container, theme === 'dark' && styles.darkContainer]}>
      <Text style={[styles.title, theme === 'dark' && styles.darkText]}>
        Configurações
      </Text>

      <View style={styles.settingRow}>
        <Text style={[styles.label, theme === 'dark' && styles.darkText]}>
          Tema Escuro
        </Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={value => setTheme(value ? 'dark' : 'light')}
        />
      </View>

      <Button title="Sair da Conta" onPress={handleLogout} color="#FF4D4D" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#000',
  },
});
