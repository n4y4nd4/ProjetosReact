//screens/HomeScreen
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const categories = [
  { id: '1', name: 'Lanches', image: require('../assets/lanches.jpg') },
  { id: '2', name: 'Bebidas', image: require('../assets/bebidas.jpg') },
  { id: '3', name: 'Sobremesas', image: require('../assets/sobremesas.jpg') },
  { id: '4', name: 'Japonesa', image: require('../assets/japonesa.jpg') },
  { id: '5', name: 'Italiana', image: require('../assets/italiana.jpg') },
  { id: '6', name: 'Brasileira', image: require('../assets/brasileira.jpg') },
  { id: '7', name: 'Vegana', image: require('../assets/vegana.jpg') },
  { id: '8', name: 'Frutos do Mar', image: require('../assets/frutos-do-mar.jpg') },
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>O que você deseja comer hoje?</Text>
      <Text style={styles.subtitle}>Categorias</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => navigation.navigate('ProductScreen', { category: item.name })}
          >
            <Image source={item.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    justifyContent: 'center',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryButton: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  categoryImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});
