import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { TMDB_API } from '../api/tmdb';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 24;

const ActorCard = ({ actor, onPress }) => (
  <TouchableOpacity
    style={styles.actorCard}
    onPress={onPress}
  >
    <Image
      source={actor.profile_path? {
        uri: `${TMDB_API.IMAGE_BASE_URL}${actor.profile_path}`,}: require('../assets/placeholder-user.png')} 
      style={styles.actorPhoto}
      defaultSource={require('../assets/placeholder-user.png')}
      resizeMode="cover"
    />
    <View style={styles.actorInfo}>
      <Text style={styles.actorName} numberOfLines={2}>
        {actor.name || "Nome não disponível"}
      </Text>
      <Text style={styles.knownFor} numberOfLines={2}>
        {actor.known_for_department || "Profissão não disponível"}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  actorCard: {
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
  actorPhoto: {
    width: '100%',
    height: CARD_WIDTH * 1.5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  actorInfo: {
    padding: 12,
  },
  actorName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  knownFor: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default ActorCard;