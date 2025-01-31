import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CommentList = ({
  isVisible,
  onClose,
  comments,
  onAddComment,
  onDeleteComment,
  actorName,
  movieTitle,
  character,
}) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.title}>Avaliações</Text>
          </View>

          <View style={styles.contextInfo}>
            <Text style={styles.actorName}>{actorName}</Text>
            <Text style={styles.character}>como {character}</Text>
            <Text style={styles.movieTitle}>em {movieTitle}</Text>
          </View>

          <TouchableOpacity style={styles.addButton} onPress={onAddComment}>
            <Ionicons name="add-circle-outline" size={20} color="#fff" />
            <Text style={styles.addButtonText}>Adicionar avaliação</Text>
          </TouchableOpacity>
          <ScrollView style={styles.commentsList}>
            {comments && comments.length > 0 ? ( 
              comments.map((item, index) => (
                <View key={index} style={styles.commentItem}>
                  <View style={styles.commentHeader}>
                    <View style={styles.userRatingContainer}>
                      <Text style={styles.username}>{item.username}</Text>
                      <Text style={styles.ratingValue}>
                        {Number(item.rating).toFixed(1)} ★
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => onDeleteComment(index)}
                      style={styles.deleteButton}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={20}
                        color="#ff4444"
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.commentText}>{item.comment}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>
                Nenhuma avaliação ainda. Seja o primeiro a avaliar!
              </Text>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "white",
    margin: 20,
    marginTop: 40,
    borderRadius: 12,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  closeButton: {
    padding: 5,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 30,
  },
  contextInfo: {
    marginBottom: 20,
    alignItems: "center",
    gap: 4,
  },
  actorName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  character: {
    fontSize: 16,
    color: "#666",
  },
  movieTitle: {
    fontSize: 16,
    color: "#666",
    fontStyle: "italic",
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#cb6ce6",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
  },
  commentsList: {
    flex: 1,
  },
  commentItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  commentText: {
    fontSize: 14,
    marginBottom: 5,
  },
  userRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  username: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1976d2",
  },
  ratingValue: {
    fontSize: 12,
    color: "#666",
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  deleteButton: {
    padding: 5,
  },
});

export default CommentList;
