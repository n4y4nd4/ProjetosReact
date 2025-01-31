import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState, useCallback} from 'react';

export const createStorageKey = (movieId, actorId, role) => 
  `rating-${movieId}-${actorId}-${role}`;

export const useRatings = (movieId, actorId, role, movieTitle, actorName) => {
  const [comments, setComments] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const storageKey = createStorageKey(movieId, actorId, role);

  const setNewAverage = useCallback((commentsList) => {
    if (!commentsList || commentsList.length === 0) {
      setAverageRating(0);
      return;
    }
    const sum = commentsList.reduce((acc, curr) => acc + curr.rating, 0);
    const average = sum / commentsList.length;
    setAverageRating(Number(average.toFixed(1)));
  }, []);

  const loadComments = useCallback(async () => {
    try {
      const storedComments = await AsyncStorage.getItem(storageKey);
      if (storedComments) {
        const parsedComments = JSON.parse(storedComments);
        setComments(parsedComments);
        setNewAverage(parsedComments);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  }, [storageKey, setNewAverage]);

  const handleNewComment = async (newComment) => {
    try {
      const commentWithContext = {
        ...newComment,
        movieTitle,
        actorName,
        role
      };
      const updatedComments = [...comments, commentWithContext];
      await AsyncStorage.setItem(storageKey, JSON.stringify(updatedComments));
      setComments(updatedComments);
      setNewAverage(updatedComments);
      return true;
    } catch (error) {
      console.error('Error saving comment:', error);
      return false;
    }
  };

  const handleDeleteComment = async (index) => {
    try {
      const updatedComments = comments.filter((_, i) => i !== index);
      await AsyncStorage.setItem(storageKey, JSON.stringify(updatedComments));
      setComments(updatedComments);
      setNewAverage(updatedComments);
      return true;
    } catch (error) {
      console.error('Error deleting comment:', error);
      return false;
    }
  };

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  return {
    comments,
    averageRating,
    handleNewComment,
    handleDeleteComment
  };
};