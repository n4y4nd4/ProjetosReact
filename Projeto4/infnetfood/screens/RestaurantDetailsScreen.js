//screens/ResturantDetailsScreen
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

export default function RestaurantDetailsScreen({ route }) {
  const { restaurant } = route.params;


  const menuItems = [
    { id: '1', name: 'Prato 1', image: require('../assets/hamburger.jpg') },
    { id: '2', name: 'Prato 2', image: require('../assets/sashimi.jpg') },
    { id: '3', name: 'Prato 3', image: require('../assets/italiana.jpg') },
    { id: '4', name: 'Prato 4', image: require('../assets/brasileira.jpg') },
    { id: '5', name: 'Prato 5', image: require('../assets/sobremesas.jpg') },
  ];

 const renderMenuItem = ({ item }) => (
  <View style={styles.menuItem}>
    <Image source={item.image} style={styles.menuItemImage} />
    <Text style={styles.menuItemName}>{item.name}</Text>
  </View>
);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{restaurant.name}</Text>
      <Text style={styles.info}>Endereço: {restaurant.address}</Text>

      <Text style={styles.menuTitle}>Cardápio do Restaurante:</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={renderMenuItem}
        contentContainerStyle={styles.menuList}
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
    color: '#333',
  },
  info: {
    fontSize: 18,
    marginVertical: 5,
    color: '#555',
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  menuList: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  menuItemImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
