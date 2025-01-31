import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './TabNavigator';
import ActorDetailsPage from '../screens/ActorDetailsPage/ActorDetailsPage';
import MovieDetailsPage from '../screens/MovieDetailsPage/MovieDetailsPage';
import { withProtectedRoute } from '../components/ProtectedRoute';

const RootStack = createNativeStackNavigator();
const ProtectedMovieDetailsPage = withProtectedRoute(MovieDetailsPage);
const ProtectedActorDetailsPage = withProtectedRoute(ActorDetailsPage);

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen 
          name="Tabs" 
          component={TabNavigator} 
          options={{ headerShown: false }} 
        />
        <RootStack.Screen 
          name="SharedActorDetails" 
          component={ProtectedActorDetailsPage}
          options={{ title: 'Detalhes do Ator' }} 
        />
        <RootStack.Screen 
          name="SharedMovieDetails" 
          component={ProtectedMovieDetailsPage}
          options={{ title: 'Detalhes do Filme' }} 
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};