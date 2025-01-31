import {useState, useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUserReviews = (username) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUserReviews = useCallback(async () => {
    if (!username) {
      setReviews([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const keys = await AsyncStorage.getAllKeys();
      const ratingKeys = keys.filter(key => key.startsWith('rating-'));
      
      let userReviews = [];
      for (const key of ratingKeys) {
        const storedComments = await AsyncStorage.getItem(key);
        if (storedComments) {
          const comments = JSON.parse(storedComments);
          const userComments = comments.filter(c => c.username === username);
          if (userComments.length > 0) {
            const [_, movieId, actorId, role] = key.split('-');
            userComments.forEach(comment => {
              userReviews.push({
                ...comment,
                movieId,
                actorId,
                role,
                movieTitle: comment.movieTitle,
                actorName: comment.actorName
              });
            });
          }
        }
      }
      setReviews(userReviews);
    } catch (error) {
      console.error('Error loading user reviews:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    loadUserReviews();
  }, [loadUserReviews]);

  return { reviews, loading, error, refresh: loadUserReviews };
};