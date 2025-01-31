import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Dimensions,
  Modal,
} from 'react-native';
import { CameraView} from 'expo-camera';
import { searchActorByPhoto } from '../services/PhotoSearchService';
import { Ionicons } from '@expo/vector-icons';

const CAMERA_TYPES = {
  back: 'back',
  front: 'front',
};

const { width, height } = Dimensions.get('window');

const CAMERA_FRAME = {
  width: width * 0.8,
  height: width * 0.8,
  x: width * 0.1,
  y: (height - width * 0.8) / 2,
};

const CameraComponent = ({ onClose, onActorFound, visible }) => {
  const [facing, setFacing] = useState(CAMERA_TYPES.back);
  const [processing, setProcessing] = useState(false);
  const cameraRef = useRef(null);

  const handleCapture = async () => {
    if (!cameraRef.current) return;
    try {
      setProcessing(true);

      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 1,
        skipProcessing: true,
      });

      const actor = await searchActorByPhoto(photo.base64);
      onActorFound(actor);
    } catch (error) {
      Alert.alert('Erro no processamento da imagem', error.message);
    } finally {
      setProcessing(false);
      onClose();
    }
  };

  const toggleCameraFacing = () => {
    setFacing((current) =>
      current === CAMERA_TYPES.back ? CAMERA_TYPES.front : CAMERA_TYPES.back
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
          <View style={styles.cameraMask}>
            <View style={styles.maskTop} />
            <View style={styles.maskCenter}>
              <View style={styles.maskLeft} />
              <View style={styles.frameContainer} />
              <View style={styles.maskRight} />
            </View>
            <View style={styles.maskBottom} />
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>

          <View style={styles.bottomControls}>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={toggleCameraFacing}>
              <Ionicons name="camera-reverse" size={24} color="#ffffff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.shutterButton,
                processing && styles.shutterButtonProcessing,
              ]}
              onPress={handleCapture}
              disabled={processing}>
              {processing ? (
                <ActivityIndicator color="#ffffff" size="large" />
              ) : (
                <View style={styles.shutterButtonInner} />
              )}
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  
  camera: {
    flex: 1,
    height: height,
    width: width,
  },

  maskTop: {
    height: CAMERA_FRAME.y,
    width: '100%',
    backgroundColor: 'black',
  },

  maskBottom: {
    height: CAMERA_FRAME.y,
    width: '100%',
    backgroundColor: 'black',
  },

  maskCenter: {
    flexDirection: 'row',
    height: CAMERA_FRAME.height,
  },

  maskLeft: {
    width: CAMERA_FRAME.x,
    backgroundColor: 'black',
  },

  maskRight: {
    width: CAMERA_FRAME.x,
    backgroundColor: 'black',
  },

  frameContainer: {
    width: CAMERA_FRAME.width,
    height: CAMERA_FRAME.height,
    borderWidth: 2,
    borderColor: '#fff',
  },

  cameraMask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },

  closeButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  bottomControls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  flipButton: {
    position: 'absolute',
    left: 40,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  shutterButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.4)',
  },

  shutterButtonProcessing: {
    backgroundColor: 'rgba(255,255,255,0.6)',
  },

  shutterButtonInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
  },
});
export default CameraComponent;
