import React from "react";
import "./Post.css";

const Post = ({ title, body, onClick }) => {
  return (
    <div className="post-card" onClick={onClick}>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
};

export default Post;
