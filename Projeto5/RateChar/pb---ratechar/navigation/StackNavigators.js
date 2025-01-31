import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../screens/HomePage/HomePage';
import ResultsPage from '../screens/ResultsPage/ResultsPage';
import PopularMoviesPage from '../screens/PopularMoviesPage/PopularMoviesPage';
import MovieDetailsPage from '../screens/MovieDetailsPage/MovieDetailsPage';
import ActorsPage from '../screens/ActorsPage/ActorsPage';
import ActorDetailsPage from '../screens/ActorDetailsPage/ActorDetailsPage';
import ProfilePage from '../screens/ProfilePage/ProfilePage';

const Stack = createNativeStackNavigator();

export const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomePage} options={{ title: 'Início', headerShown: false }} />
    <Stack.Screen name="SearchResults" component={ResultsPage} options={{ title: 'Resultados da Busca' }} />
  </Stack.Navigator>
);

export const MoviesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="PopularMovies" component={PopularMoviesPage} options={{ title: 'Filmes Populares' }} />
    <Stack.Screen name="MovieDetails" component={MovieDetailsPage} options={{ title: 'Detalhes do Filme' }} />
    <Stack.Screen name="SearchResults" component={ResultsPage} options={{ title: 'Resultados da Busca' }} />
  </Stack.Navigator>
);

export const ActorsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ActorsList" component={ActorsPage} options={{ title: 'Atores Populares' }} />
    <Stack.Screen name="ActorDetails" component={ActorDetailsPage} options={{ title: 'Detalhes do Ator' }} />
    <Stack.Screen name="SearchResults" component={ResultsPage} options={{ title: 'Resultados da Busca' }} />
  </Stack.Navigator>
);
  
export const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Profile" component={ProfilePage} options={{ title: 'Perfil', headerShown: false }} />
    <Stack.Screen name="SearchResults" component={ResultsPage} options={{ title: 'Resultados da Busca' }} />
    <Stack.Screen name="ActorDetails" component={ActorDetailsPage} options={{ title: 'Detalhes do Ator' }} />
    <Stack.Screen name="MovieDetails" component={MovieDetailsPage} options={{ title: 'Detalhes do Filme' }} />
  </Stack.Navigator>
  );