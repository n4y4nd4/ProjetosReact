//screens/MapScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const restaurants = [
  { id: '1', name: 'Restaurante A', address: 'Rua 1, Centro'},
  { id: '2', name: 'Restaurante B', address: 'Rua 2, Centro'},
  { id: '3', name: 'Restaurante C', address: 'Rua 3, Centro'},
  { id: '4', name: 'Restaurante D', address: 'Rua 4, Centro'},
  { id: '5', name: 'Restaurante E', address: 'Rua 5, Centro'},
  { id: '6', name: 'Restaurante F', address: 'Rua 6, Centro'},
  { id: '7', name: 'Restaurante G', address: 'Rua 7, Centro'},
  { id: '8', name: 'Restaurante H', address: 'Rua 8, Centro'},
  { id: '9', name: 'Restaurante I', address: 'Rua 9, Centro'},
  { id: '10', name: 'Restaurante J', address: 'Rua 10, Centro'},
];

export default function MapScreen() {
  const navigation = useNavigation();

  const renderRestaurant = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.restaurantName}>{item.name}</Text>
      <Text style={styles.restaurantAddress}>{item.address}</Text>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => navigation.navigate('RestaurantDetails', { restaurant: item })}
      >
        <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapa de Restaurantes</Text>
      <Image
        source={require('../assets/mapa.png')} 
        style={styles.mapImage}
        resizeMode="cover"
      />
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={renderRestaurant}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mapImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  list: {
    marginTop: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  restaurantAddress: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  detailsButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
