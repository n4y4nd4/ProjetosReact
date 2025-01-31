//screen/ProductScreen
import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from './CartContext';


const productsMock = {
  Lanches: [
    { id: '1', name: 'Hambúrguer', price: 25, image: require('../assets/hamburger.jpg') },
    { id: '2', name: 'Cachorro-Quente', price: 15, image: require('../assets/cachorro-quente.jpg') },
  ],
  Bebidas: [
    { id: '3', name: 'Refrigerante', price: 8, image: require('../assets/refri.jpg') },
    { id: '4', name: 'Suco Natural', price: 12, image: require('../assets/suco.jpg') },
  ],
  Sobremesas: [
    { id: '5', name: 'Pudim', price: 10, image: require('../assets/pudim.jpg') },
    { id: '6', name: 'Sorvete', price: 7, image: require('../assets/sorvete.jpg') },
  ],
  Japonesa: [
    { id: '7', name: 'Sushi', price: 30, image: require('../assets/sushi.jpg') },
    { id: '8', name: 'Sashimi', price: 35, image: require('../assets/sashimi.jpg') },
  ],
  Italiana: [
    { id: '9', name: 'Pizza', price: 40, image: require('../assets/pizza.jpg') },
    { id: '10', name: 'Lasanha', price: 45, image: require('../assets/lasanha.jpg') },
  ],
  Brasileira: [
    { id: '11', name: 'Feijoada', price: 50, image: require('../assets/feijoada.jpg') },
    { id: '12', name: 'Pão de Queijo', price: 10, image: require('../assets/pao-de-queijo.jpg') },
  ],
  Vegana: [
    { id: '13', name: 'Salada de Grão de Bico', price: 20, image: require('../assets/grao-de-bico.jpg') },
    { id: '14', name: 'Quibe Vegano', price: 25, image: require('../assets/quibe.jpg') },
  ],
  'Frutos do Mar': [
    { id: '15', name: 'Camarão Frito', price: 60, image: require('../assets/camarao.jpg') },
    { id: '16', name: 'Lula à Dorê', price: 55, image: require('../assets/lula.jpg') },
  ],
};

export default function ProductScreen({ route }) {
  const { category } = route.params;
  const products = productsMock[category] || [];
  const { cart, addToCart } = useContext(CartContext);
  const navigation = useNavigation();

  const [isAdded, setIsAdded] = useState(false); 

  const handleAddToCart = (item) => {
    addToCart(item);
    setIsAdded(true); 
    setTimeout(() => setIsAdded(false), 1000); 
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
        <Text style={styles.addButtonText}>Adicionar ao Carrinho</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category}</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
      />
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.navigate('Cart', { cart })}
      >
        <Text style={styles.cartButtonText}>Ver Carrinho ({cart.reduce((acc, item) => acc + item.quantity, 0)})</Text>
      </TouchableOpacity>

    
      <Modal visible={isAdded} transparent={true}>
        <View style={styles.modalContainer}>
          <LottieView
            source={require('../assets/animation.json')} 
            autoPlay
            loop={false}
            style={styles.animation}
          />
          <Text style={styles.modalText}>Adicionado ao Carrinho!</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  productContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#777',
    marginVertical: 5,
  },
  addButton: {
    backgroundColor: '#FF4D4D',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cartButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  animation: {
    width: 150,
    height: 150,
  },
  modalText: {
    marginTop: 20,
    fontSize: 18,
    color: '#fff',
  },
});