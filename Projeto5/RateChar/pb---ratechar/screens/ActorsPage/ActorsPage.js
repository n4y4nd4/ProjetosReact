import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Text,
  RefreshControl
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchPopularActors } from '../../services/ActorService';
import { TMDB_API } from '../../api/tmdb';
import { useAuth } from '../../contexts/AuthContext';

const ActorsPage = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  
  const handleActorPress = (id) => {
    if (!user) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'ProfileTab' }]
      });
      return;
    }
    navigation.navigate('ActorDetails', { id });
  };

  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadActors = async () => {
    try {
      const data = await fetchPopularActors();
      setActors(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadActors();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadActors();
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

  return (
    <View style={styles.container}>
      <FlatList
        data={actors}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.actorCard}
            onPress={() => handleActorPress(item.id)}
          >
            <Image
              style={styles.actorImage}
              source={{
                uri: `${TMDB_API.IMAGE_BASE_URL}${item.profile_path}`,
              }}
              defaultSource={require('../../assets/placeholder-user.png')}
            />
            <Text style={styles.actorName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
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
  actorCard: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
  },
  actorImage: {
    width: 150,
    height: 225,
    borderRadius: 8,
  },
  actorName: {
    marginTop: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ActorsPage;