import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import MovieCard from '../../components/MovieCard';
import ActorCard from '../../components/ActorCard';
import { searchMovies } from '../../services/MovieService';
import { searchActors } from '../../services/ActorService';

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const navigation = useNavigation();
  const { query, type } = route.params;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const data = type === 'people' 
          ? await searchActors(query)
          : await searchMovies(query);
        setResults(data);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query, type]);

  const handleItemPress = (id) => {
    console.log('Navigation attempt:', { id, type });
    if (type === 'people') {
      navigation.navigate('SharedActorDetails', { id });
    } else {
      navigation.navigate('SharedMovieDetails', { id });
    }
  };

  const renderItem = ({ item }) => {
    if (type === 'people') {
      return (
        <ActorCard
          actor={item}
          onPress={() => handleItemPress(item.id)}
        />
      );
    } else {
      return (
        <MovieCard
          movie={item}
          onPress={() => handleItemPress(item.id)}
        />
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
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

export default ResultsPage;