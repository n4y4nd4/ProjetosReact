import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';
import { Ionicons } from '@expo/vector-icons';
import { TMDB_API } from '../api/tmdb';
import { useRatings } from '../services/RatingService';
import { useAuth } from '../contexts/AuthContext';
import CommentModal from './CommentModal';
import CommentList from './CommentList';

const MovieCredit = ({ movie, actorId, actorName, onPress }) => {
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [isCommentListVisible, setIsCommentListVisible] = useState(false);
  const { user } = useAuth();

  const { comments, averageRating, handleNewComment, handleDeleteComment } = 
  useRatings(movie.id, actorId, movie.character, movie.title, actorName);
  const handleSubmitComment = async (newComment) => {
    await handleNewComment(newComment);
    setIsCommentModalVisible(false);
    setIsCommentListVisible(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.movieCard} onPress={onPress}>
        <Image
      style={styles.moviePoster}
      source={movie.poster_path ? {
        uri: `${TMDB_API.IMAGE_BASE_URL}${movie.poster_path}`,}
        : require('../assets/placeholder-movie.png')
        }
      defaultSource={require('../assets/placeholder-movie.png')}
    />
        <View style={styles.movieInfo}>
          <Text style={styles.movieTitle}>{movie.title || "Título não disponível"}</Text>
          <Text style={styles.characterName}>
            <Text style={styles.label}>Papel: </Text>
            {movie.character || "Não disponível"}
          </Text>
          <Text style={styles.releaseDate}>
            <Text style={styles.label}>Lançamento: </Text>
            {movie.release_date || "Data não disponível"}
          </Text>

          <View style={styles.ratingContainer}>
            <Text style={styles.averageText}>
              Nota: {averageRating > 0 ? averageRating : 'Sem avaliações'}
            </Text>
            {averageRating > 0 && (
              <Rating
                type="star"
                startingValue={Number(averageRating)}
                readonly
                imageSize={20}
                fractions={2}
                ratingCount={5}
                style={{ paddingVertical: 5 }}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => setIsCommentModalVisible(true)}
        >
          <Ionicons name="chatbubble-outline" size={20} color="#cb6ce6" />
          <Text style={styles.buttonText}>Avaliar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => setIsCommentListVisible(true)}
        >
          <Ionicons name="list-outline" size={20} color="#cb6ce6" />
          <Text style={styles.buttonText}>
            Ver avaliações ({comments.length})
          </Text>
        </TouchableOpacity>
      </View>

      <CommentModal
        isVisible={isCommentModalVisible}
        onClose={() => setIsCommentModalVisible(false)}
        onSubmit={handleSubmitComment}
        username={user?.username}
      />

      <CommentList
        isVisible={isCommentListVisible}
        onClose={() => setIsCommentListVisible(false)}
        comments={comments}
        onDeleteComment={handleDeleteComment}
        onAddComment={() => {
          setIsCommentListVisible(false);
          setIsCommentModalVisible(true);
        }}
        actorName={actorName}
        movieTitle={movie.title}
        character={movie.character}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  movieCard: {
    flexDirection: 'row',
  },
  moviePoster: {
    width: 80,
    height: 120,
    borderRadius: 4,
  },
  movieInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  characterName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  releaseDate: {
    fontSize: 14,
    color: '#666',
  },
  label: {
    fontWeight: 'bold',
  },
  ratingContainer: {
    alignItems: 'flex-start',
    marginTop: 5,
  },
  averageText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  buttonText: {
    marginLeft: 5,
    color: '#cb6ce6',
    fontSize: 14,
  },
});

export default MovieCredit;