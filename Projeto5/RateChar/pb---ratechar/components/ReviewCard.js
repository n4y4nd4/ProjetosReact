import { View, Text, StyleSheet } from 'react-native';
const ReviewCard = ({ review }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
      <View style={styles.contextInfo}>
      <Text style={styles.actorName}>{review.actorName}</Text>
      <Text style={styles.roleInfo}>como {review.role} em</Text>
      <Text style={styles.movieTitle}>{review.movieTitle}</Text>
    </View>
        <Text style={styles.rating}>{review.rating.toFixed(1)} ★</Text>
      </View>
      <Text style={styles.reviewText}>{review.comment}</Text>
    </View>
  );
  
  const styles = StyleSheet.create({
    reviewCard: {
      backgroundColor: '#f5f5f5',
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
      width: '100%',
    },
    reviewHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    contextInfo: {
      marginBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      paddingBottom: 8,
    },
    actorName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    roleInfo: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#666',
      marginVertical: 2,
    },
    movieTitle: {
      fontSize: 14,
      color: '#666',
      fontStyle: 'italic',
    },
    rating: {
      fontSize: 14,
      color: '#1976d2',
      fontWeight: 'bold',
    },
    reviewText: {
      fontSize: 14,
      color: '#333',
    },
  });

  export default ReviewCard;