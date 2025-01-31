import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('movies');
  const navigation = useNavigation();

  const handleSearch = () => {
    if (query) {
      navigation.navigate('SearchResults', {
        type: searchType,
        query: query,
      });
    }
  };

  return (
    <View style={styles.searchBar}>
      <Text style={styles.title}>Procure por filmes ou atores/diretores</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Digite aqui"
          value={query}
          onChangeText={setQuery}
          placeholderTextColor="#666"
        />

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={searchType}
            onValueChange={(itemValue) => setSearchType(itemValue)}
            style={styles.picker}
            itemStyle={styles.onePickerItem}
          >
            <Picker.Item label="Filmes" value="movies" />
            <Picker.Item label="Pessoas" value="people" />
          </Picker>
          {/* Indicador visual */}
          {Platform.OS === 'ios' && (
            <Ionicons
              name="chevron-down-outline"
              size={24}
              color="#999"
              style={styles.arrowIcon}
            />
          )}
        </View>

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Buscar</Text>
          <Ionicons name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    padding: 16,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },

  searchContainer: {
    gap: 12,
  },

  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },

  picker: {
    height: Platform.OS === 'ios' ? 50 : 50,
    width: '100%',
  },

  onePickerItem: {
    height: 50,
    fontSize: 16,
    color: 'black'
  },

  arrowIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
  },

  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cb6ce6',
    padding: 14,
    borderRadius: 8,
    gap: 8,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SearchBar;
