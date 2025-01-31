import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeStack, MoviesStack, ActorsStack, ProfileStack } from './StackNavigators';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'HomeTab') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'MoviesTab') {
          iconName = focused ? 'film' : 'film-outline';
        } else if (route.name === 'ActorsTab') {
          iconName = focused ? 'people' : 'people-outline';
        } else if (route.name === 'ProfileTab') {
          iconName = focused ? 'person' : 'person-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#cb6ce6',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}
  >
    <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: 'Início' }} />
    <Tab.Screen name="MoviesTab" component={MoviesStack} options={{ title: 'Filmes' }} />
    <Tab.Screen name="ActorsTab" component={ActorsStack} options={{ title: 'Atores' }} />
    <Tab.Screen name="ProfileTab" component={ProfileStack} options={{title: 'Perfil'}} />
  </Tab.Navigator>
);