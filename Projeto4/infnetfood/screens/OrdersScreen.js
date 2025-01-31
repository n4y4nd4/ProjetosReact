 //screens/OrdersScreen  
import {React, useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { OrdersContext } from './OrdersContext';

export default function OrdersScreen() {
  const { orders } = useContext(OrdersContext);
  

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>Endereço: {item.address}</Text>
      <Text style={styles.itemDetails}>Data: {item.date}</Text>
      <FlatList
        data={item.items}
        renderItem={({ item }) => (
          <Text>
            {item.name} - Quantidade: {item.quantity} - Preço: R$ {(item.price * item.quantity).toFixed(2)}
          </Text>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedidos</Text>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()} 
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
    textAlign: 'center',
    marginBottom: 10,
  },
  list: {
    marginTop: 10,
  },
  itemContainer: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDetails: {
    fontSize: 14,
    marginTop: 5,
  },
});
