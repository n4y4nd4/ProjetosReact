import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { TMDB_API } from '../api/tmdb';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 24;

const MovieCard = ({ movie, onPress }) => (
  <TouchableOpacity
    style={styles.movieCard}
    onPress={onPress}
  >
    <Image
      source={movie.poster_path ? {
        uri: `${TMDB_API.IMAGE_BASE_URL}${movie.poster_path}`,} : require("../assets/placeholder-movie.png")
        }
        defaultSource={require('../assets/placeholder-movie.png')}
      style={styles.moviePoster}
      resizeMode="cover"
    />
    <View style={styles.movieInfo}>
      <Text style={styles.movieTitle} numberOfLines={2}>
        {movie.title || "Título não disponível"}
      </Text>
      <Text style={styles.movieOverview} numberOfLines={3}>
        {movie.overview?.trim() || "Sinopse não disponível"}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  movieCard: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  moviePoster: {
    width: '100%',
    height: CARD_WIDTH * 1.5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  movieInfo: {
    padding: 12,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  movieOverview: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default MovieCard;