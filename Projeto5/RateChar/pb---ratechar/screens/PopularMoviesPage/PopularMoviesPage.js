import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MovieCard from '../../components/MovieCard';
import { fetchPopularMovies } from '../../services/MovieService';
import { useAuth } from '../../contexts/AuthContext';

const PopularMoviesPage = () => {
  const {user} = useAuth();
  const navigation = useNavigation();

  const handleMoviePress = (id) => {
    if (!user) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'ProfileTab' }]
      });
      return;
    }
    navigation.navigate('MovieDetails', { id });
  };

  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const loadMovies = async () => {
    try {
      const data = await fetchPopularMovies();
      setMovies(data);
    } catch (error) {
      console.error('Erro ao carregar filmes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadMovies();
    } finally {
      setRefreshing(false);
    }
  }, []);
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderMovie = ({ item: movie }) => (
    <MovieCard
      movie={movie}
      onPress={() => handleMoviePress(movie.id)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderMovie}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#0000ff']}
            tintColor="#0000ff"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 8,
  },
  row: {
    justifyContent: 'space-between',
    padding: 8,
  },
});

export default PopularMoviesPage;