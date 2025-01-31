//screens/CheckoutScreen
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from './CartContext';
import { OrdersContext } from './OrdersContext';



export default function CheckoutScreen() {
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const { cart } = useContext(CartContext);
  const { addOrder } = useContext(OrdersContext); 
  const navigation = useNavigation();


  const handleOrderCompletion = async () => {
    if (!address || !paymentMethod) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const order = {
      items: cart,
      address,
      paymentMethod,
      date: new Date().toLocaleString(),
    };

    await addOrder(order); 

    setAddress('');
    setPaymentMethod('');
    navigation.navigate('Orders');
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Text style={styles.label}>Endereço:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu endereço"
        placeholderTextColor="#999"
        value={address}
        onChangeText={setAddress}
      />
      <Text style={styles.label}>Método de Pagamento:</Text>
      <View style={styles.paymentMethods}>
        <TouchableOpacity
          style={[styles.paymentButton, paymentMethod === 'Cartão de Crédito' && styles.selected]}
          onPress={() => setPaymentMethod('Cartão de Crédito')}
        >
          <Text style={styles.paymentButtonText}>Cartão de Crédito</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentButton, paymentMethod === 'Pix' && styles.selected]}
          onPress={() => setPaymentMethod('Pix')}
        >
          <Text style={styles.paymentButtonText}>Pix</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.completeOrderButton} onPress={handleOrderCompletion}>
        <Text style={styles.completeOrderButtonText}>Finalizar Pedido</Text>
      </TouchableOpacity>
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
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  paymentButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '45%',
    alignItems: 'center',
  },
  selected: {
    borderColor: 'red',
    backgroundColor: '#ffe6e6',
  },
  paymentButtonText: {
    fontSize: 16,
    color: '#333',
  },
  completeOrderButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  completeOrderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
