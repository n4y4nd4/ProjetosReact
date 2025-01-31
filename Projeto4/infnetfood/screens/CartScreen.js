//screens/CartScreen
import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert  } from 'react-native';
import { CartContext } from './CartContext';

export default function CartScreen({ navigation }) {
  const { cart, clearCart } = useContext(CartContext);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleConfirmOrder = () => {
    navigation.navigate('CheckoutScreen');
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>
        {item.quantity} x R$ {item.price.toFixed(2)}
      </Text>
    </View>
  );
  const handleClearCart = () => {
    clearCart();
    Alert.alert('Carrinho Limpo', 'Os itens foram removidos do carrinho.');
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho de Compras</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Seu carrinho está vazio!</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            style={styles.list}
          />
          <Text style={styles.total}>Total: R$ {calculateTotal()}</Text>
          <TouchableOpacity style={styles.checkoutButton} onPress={handleConfirmOrder}>
            <Text style={styles.checkoutButtonText}>Confirmar Pedido</Text>
          </TouchableOpacity>
                <TouchableOpacity style={styles.clearCartButton} onPress={handleClearCart}>
        <Text style={styles.clearCartButtonText}>Limpar Carrinho</Text>
      </TouchableOpacity>

        </>
      )}
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
    marginBottom: 20,
  },
  emptyCartText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginTop: 50,
  },
  list: {
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  checkoutButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
    clearCartButton: {
    backgroundColor: 'red',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  clearCartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
