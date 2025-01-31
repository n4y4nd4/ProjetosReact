import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { Rating } from 'react-native-ratings';

const CommentModal = ({ isVisible, onClose, onSubmit, username }) => {
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    if (!newComment.trim() || rating === 0) {
      Alert.alert('Erro', 'Comentário e avaliação são obrigatórios');
      return;
    }
    onSubmit({ comment: newComment, rating, username: username });
    setNewComment('');
    setRating(0);
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Nova Avaliação</Text>

          <View style={styles.inputSection}>
            <TextInput
              style={styles.input}
              value={newComment}
              onChangeText={setNewComment}
              placeholderTextColor="#666"
              placeholder="Escreva seu comentário..."
              multiline
            />
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingLabel}>Nota:</Text>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={30}
                showRating
                startingValue={rating}
                fractions={2}
                jumpValue={0.1}
                onFinishRating={(value) => setRating(Number(value.toFixed(1)))}
                style={{ paddingVertical: 10 }}
              />
            </View>
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputSection: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    minHeight: 80,
  },
  ratingContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#cb6ce6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CommentModal;