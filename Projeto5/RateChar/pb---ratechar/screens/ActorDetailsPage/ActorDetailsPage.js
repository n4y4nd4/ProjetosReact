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
import { fetchActorDetails, fetchActorMovieCredits } from '../../services/ActorService';
import MovieCredit from '../../components/MovieCredit';
import { TMDB_API } from '../../api/tmdb';


const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = 100;

const ActorDetailsPage = () => {
  const [actorData, setActorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const translateX = useSharedValue(0);
  const context = useSharedValue({ x: 0 });

  const loadActorDetails = useCallback(async () => {
    try {
      setLoading(true);
      const [details, credits] = await Promise.all([
        fetchActorDetails(id),
        fetchActorMovieCredits(id)
      ]);
      setActorData({ ...details, credits });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadActorDetails();
  }, [loadActorDetails]);

  const navigateBack = () => {
    navigation.goBack();
  };

  const handleMoviePress = (movieId) => {
  navigation.navigate('SharedMovieDetails', { 
    id: movieId 
  });
};

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
          onPress={loadActorDetails}
        >
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!actorData) return null;


  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.profileSection}>
              <Image
                source={{ 
                  uri: `${TMDB_API.IMAGE_BASE_URL}${actorData.profile_path}` 
                }}
                style={styles.profileImage}
                defaultSource={require('../../assets/placeholder-user.png')}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.name}>{actorData.name}</Text>
                <Text style={styles.detail}>
                  <Text style={styles.label}>Data de nascimento: </Text>
                  {actorData.birthday || "Não disponível"}
                </Text>
                <Text style={styles.detail}>
                  <Text style={styles.label}>Local de nascimento: </Text>
                  {actorData.place_of_birth || "Não disponível"}
                </Text>
                <Text style={styles.detail}>
                  <Text style={styles.label}>Função principal: </Text>
                  {actorData.known_for_department || "Não disponível"}
                </Text>
              </View>
            </View>

            <View style={styles.biographySection}>
              <Text style={styles.sectionTitle}>Biografia</Text>
              <Text style={styles.biography}>
                {actorData.biography || "Biografia não disponível"}
              </Text>
            </View>

            <View style={styles.creditsSection}>
  <Text style={styles.sectionTitle}>Filmografia</Text>
  {actorData.credits?.length > 0 ? (
    actorData.credits.map((movie) => (
      <MovieCredit
      key={`movie-${movie.id}`}
        movie={movie}
        actorId={actorData.id}
        actorName={actorData.name}
        onPress={() => handleMoviePress(movie.id)}
      />
    ))
  ) : (
    <Text style={styles.noCreditsText}>
      Nenhum filme encontrado na filmografia.
    </Text>
  )}
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  profileSection: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  profileImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  label: {
    fontWeight: 'bold',
  },
  biographySection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  biography: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  creditsSection: {
    marginBottom: 24,
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
});

export default ActorDetailsPage;