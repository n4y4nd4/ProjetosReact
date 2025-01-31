import React from "react";
import "./User.css";

const User = ({ name, catchPhrase }) => {
  return (
    <div className="user-card">
      <h3>{name}</h3>
      <p>{catchPhrase}</p>
    </div>
  );
};

export default User;
