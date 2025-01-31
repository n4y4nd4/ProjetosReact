import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue,
  withSpring,
  runOnJS
} from 'react-native-reanimated';
import { fetchMovieDetails } from '../../services/MovieService';
import CastMember from '../../components/CastMember';
import { TMDB_API } from '../../api/tmdb';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = 100;

const MovieDetailsPage = () => {
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const translateX = useSharedValue(0);
  const context = useSharedValue({ x: 0 });

  const loadMovieDetails = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchMovieDetails(id);
      setMovieData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadMovieDetails();
  }, [loadMovieDetails]);

 const handleActorPress = (actorId) => {
  navigation.navigate('SharedActorDetails', { 
    id: actorId 
  });
};

  const navigateBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

 const gesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onStart(() => {
      context.value = { x: translateX.value };
    })
    .onUpdate((event) => {
      if (event.translationX > 0) {
        translateX.value = event.translationX + context.value.x;
      }
    })
    .onEnd((event) => {
      if (event.translationX > SWIPE_THRESHOLD) {
        translateX.value = withSpring(width);
        runOnJS(navigateBack)();
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={loadMovieDetails}
        >
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!movieData) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={true}
        >
            <View style={styles.movieDetails}>
              <Image
                style={styles.poster}
                source={{
                  uri: `${TMDB_API.IMAGE_BASE_URL}${movieData.poster_path}`,
                }}
              />

              <View style={styles.infoContainer}>
                <Text style={styles.title}>
                  {movieData.title || "Título não disponível"}
                </Text>
                
                <Text style={styles.originalTitle}>
                  Nome original: {movieData.original_title?.trim() || "Não disponível"}
                </Text>

                <Text style={styles.sectionTitle}>Sinopse:</Text>
                <Text style={styles.overview}>
                  {movieData.overview?.trim() || "Sinopse não disponível"}
                </Text>
              </View>

              <View style={styles.castSection}>
                <Text style={styles.castTitle}>Elenco</Text>
                {movieData.credits?.cast?.length > 0 ? (
                  movieData.credits.cast.map((actor) => (
                    <CastMember
                    key={`cast-${actor.id}`}
                    actor={actor}
                    movieId={movieData.id}
                    movieTitle={movieData.title}
                    onPress={() => handleActorPress(actor.id)}
                    />
                  ))
                ) : (
                  <Text style={styles.noCastText}>
                    Nenhum ator encontrado no elenco.
                  </Text>
                )}
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    padding: 10,
    backgroundColor: '#0000ff',
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  movieDetails: {
    padding: 16,
  },
  poster: {
    width: width - 32,
    height: (width - 32) * 1.5,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  originalTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  castSection: {
    marginTop: 24,
  },
  castTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  noCastText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    padding: 20,
  },
});


export default MovieDetailsPage;