import React, { useState } from "react";
import AuthorityForm from "../components/AuthorityForm";

function Authorities() {
  const [authorities, setAuthorities] = useState([]);

  const handleAddAuthority = (newAuthority) => {
    setAuthorities((prev) => [...prev, newAuthority]);
  };

  return (
    <div>
      <AuthorityForm onAddAuthority={handleAddAuthority} />
      <div>
        <h2>Lista de Autoridades</h2>
        <ul>
          {authorities.map((auth, index) => (
            <li key={index}>
              {auth.name} - {auth.country} ({auth.role})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Authorities;
