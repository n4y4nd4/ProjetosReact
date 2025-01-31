//App.js
import React, { useState, useEffect, createContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { CartProvider } from './screens/CartContext';
import { OrdersProvider } from './screens/OrdersContext';


import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import SettingsScreen from './screens/SettingsScreen';
import LoginScreen from './screens/LoginScreen';
import ProductScreen from './screens/ProductScreen';
import RestaurantDetailsScreen from './screens/RestaurantDetailsScreen';



export const ThemeContext = createContext();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('userEmail');
        setIsLoggedIn(!!storedEmail);
      } catch (error) {
        console.error('Erro ao verificar login:', error);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    async function registerForPushNotificationsAsync() {
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Permissões de notificação não concedidas!');
          return;
        }
      } else {
        alert('As notificações só funcionam em dispositivos reais.');
      }
    }

    registerForPushNotificationsAsync();


    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }, []);


  const renderSettingsIcon = (navigation) => (
    <TouchableOpacity
      style={{ marginRight: 15 }}
      onPress={() => navigation.navigate('Settings')}
    >
      <Icon name="settings-outline" size={24} color={theme === 'dark' ? '#fff' : '#000'} />
    </TouchableOpacity>
  );

  const AppTabs = ({ navigation }) => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Restaurantes') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF4D4D',
        tabBarInactiveTintColor: 'gray',
        headerRight: () => renderSettingsIcon(navigation),
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Restaurantes" component={MapScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Cart" component={CartScreen} /> 
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );

  return (
    <CartProvider>
    <OrdersProvider>
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
        {isLoggedIn ? (
         <Stack.Navigator>
  <Stack.Screen
    name="Main"
    component={AppTabs}
    options={({ navigation }) => ({
    headerRight: () => renderSettingsIcon(navigation),
    headerTitle: 'InfnetFood',
              })}
  />
  <Stack.Screen
    name="Settings"
    options={{ headerTitle: 'Configurações' }}
  >
    {(props) => (
      <SettingsScreen {...props} setIsLoggedIn={setIsLoggedIn} />
    )}
  </Stack.Screen>
  
  <Stack.Screen
    name="Cart"
    component={CartScreen}
    options={{ title: 'Carrinho' }}
  />
  <Stack.Screen
    name="ProductScreen"
    component={ProductScreen}
    options={{ title: 'Produtos' }}
  />
    <Stack.Screen
    name="CheckoutScreen"
    component={CheckoutScreen}
    options={{ title: 'Pagamento' }}
  />
      <Stack.Screen
    name="Orders"
    component={OrdersScreen}
    options={{ title: 'Pdedidos' }}
  />
  <Stack.Screen
    name="MapScreen"
    component={MapScreen}
    options={{ title: 'Mapa de Restaurantes' }}
  />
  <Stack.Screen
    name="RestaurantDetails"
    component={RestaurantDetailsScreen}
    options={{ title: 'Detalhes do Restaurante' }}
  />
  
</Stack.Navigator>

        ) : (
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
           
          </Stack.Navigator>
          
        
      
        )}
      </NavigationContainer>
    </ThemeContext.Provider>
    </OrdersProvider>
    </CartProvider>
    
  );
}
