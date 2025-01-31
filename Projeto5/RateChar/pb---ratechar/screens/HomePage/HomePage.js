import React, {useState} from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Text, Modal, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import CameraComponent from '../../components/CameraComponent';
import { Ionicons } from '@expo/vector-icons';
import { useCameraPermissions } from 'expo-camera';


const HomePage = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const navigation = useNavigation();

  const handleActorFound = (actor) => {
    navigation.navigate('SharedActorDetails', { id: actor.id });
  };

  const handleCameraPress = async () => {
    if (!permission.granted) {
      setShowPermissionModal(true);
      return;
    }
    setShowCamera(true);
  };

  return (
    <ScrollView style={styles.container}>
      <Header />
      <SearchBar />
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.cameraButton}
          onPress={handleCameraPress}
        >
          <Ionicons name="camera" size={24} color="#fff" />
          <Text style={styles.buttonText}>Buscar personalidade por foto</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={showPermissionModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.permissionContainer}>
          <View style={styles.permissionContent}>
            <Text style={styles.message}>
              Precisamos da sua permissão para abrir a câmera
            </Text>
            <Button 
              onPress={async () => {
                await requestPermission();
                setShowPermissionModal(false);
                if (permission?.granted) {
                  setShowCamera(true);
                }
              }} 
              title="OK" 
            />
          </View>
        </View>
      </Modal>
      <CameraComponent
        visible={showCamera}
        onClose={() => setShowCamera(false)}
        onActorFound={handleActorFound}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  cameraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cb6ce6',
    padding: 14,
    borderRadius: 8,
    gap: 8,
    marginHorizontal: 16,
  },
  
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },

  permissionContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  message: {
    color: 'black',
    padding: 15,
    fontSize: 20,
    textAlign: 'center',
  },

});

export default HomePage;