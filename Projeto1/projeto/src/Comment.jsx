import React, { useState } from "react";
import "./Comment.css";

const Comment = ({ id, name, email, body, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  // Função para mostrar o modal de confirmação
  const handleDelete = () => {
    setShowConfirm(true);
  };

  // Função para confirmar a exclusão
  const confirmDelete = () => {
    onDelete(id);
    setShowConfirm(false);
  };

  // Função para cancelar a exclusão
  const cancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <div className="comment-card">
      <p>
        <strong>{name}</strong> <span>{email}</span>
      </p>
      <p>{body}</p>
      <button onClick={handleDelete} className="delete-button">
        X
      </button>

      {/* Modal de Confirmação */}
      {showConfirm && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal">
            <p>Tem certeza de que deseja excluir este comentário?</p>
            <button onClick={confirmDelete}>Sim</button>
            <button onClick={cancelDelete}>Não</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
