import React, { useState, useEffect } from "react";
import User from "./User";
import Post from "./Post";
import Comment from "./Comment";
import "./FetchData.css";

const FetchData = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isGridView, setIsGridView] = useState(true);

  // Função para buscar usuários
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Erro ao buscar usuários:", error));
  }, []);

  // Função para buscar postagens de um usuário específico
  useEffect(() => {
    if (selectedUserId) {
      fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${selectedUserId}`
      )
        .then((response) => response.json())
        .then((data) => setPosts(data))
        .catch((error) => console.error("Erro ao buscar postagens:", error));
    }
  }, [selectedUserId]);

  // Função para buscar comentários de um post específico
  useEffect(() => {
    if (selectedPostId) {
      fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${selectedPostId}`
      )
        .then((response) => response.json())
        .then((data) => setComments(data))
        .catch((error) => console.error("Erro ao buscar comentários:", error));
    }
  }, [selectedPostId]);

  // Função para alternar entre visualização em grade e lista
  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  // Função para resetar o estado dos comentários e voltar para a lista de postagens
  const handleBackToPosts = () => {
    setComments([]);
    setSelectedPostId(null);
  };

  // Função para resetar o estado das postagens e voltar para a lista de usuários
  const handleBackToUsers = () => {
    setPosts([]);
    setSelectedUserId(null);
  };

  // Função para excluir um comentário
  const handleDeleteComment = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  };

  return (
    <div>
      <h2>
        {selectedUserId === null
          ? "Lista de Usuários"
          : selectedPostId === null
          ? "Lista de Postagens"
          : "Lista de Comentários"}
      </h2>

      {/* Botões de navegação e de alternância de visualização */}
      <div className="navigation-buttons">
        {selectedUserId !== null && selectedPostId === null && (
          <button onClick={handleBackToUsers}>Voltar para Usuários</button>
        )}
        {selectedPostId !== null && (
          <button onClick={handleBackToPosts}>Voltar para Postagens</button>
        )}
        {selectedUserId === null || selectedPostId === null ? (
          <button onClick={toggleView}>
            {isGridView ? "Alternar para Lista" : "Alternar para Grade"}
          </button>
        ) : null}
      </div>

      {/* Classe condicional para o layout */}
      <div className={isGridView ? "grid-view" : "list-view"}>
        {selectedUserId === null
          ? users.map((user) => (
              <div key={user.id} onClick={() => setSelectedUserId(user.id)}>
                <User name={user.name} catchPhrase={user.company.catchPhrase} />
              </div>
            ))
          : selectedPostId === null
          ? posts.map((post) => (
              <Post
                key={post.id}
                title={post.title}
                body={post.body}
                onClick={() => setSelectedPostId(post.id)}
              />
            ))
          : comments.map((comment) => (
              <div key={comment.id}>
                <Comment
                  id={comment.id}
                  name={comment.name}
                  email={comment.email}
                  body={comment.body}
                  onDelete={handleDeleteComment}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default FetchData;
