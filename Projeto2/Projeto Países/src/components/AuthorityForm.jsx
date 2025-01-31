import React, { useState } from "react";
import "../styles/Forms.css";

function AuthorityForm({
  onAddAuthority,
  g20Countries,
  authorities,
  onRedirectToCountry,
}) {
  const [form, setForm] = useState({
    name: "",
    country: "",
    role: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedCountry = g20Countries.find(
      (country) => country.name.common === form.country
    );

    if (!selectedCountry) {
      alert("País não encontrado.");
      return;
    }

    const domain = selectedCountry.tld[0];

    if (!form.email.endsWith(domain)) {
      alert(`O e-mail deve terminar com ${domain}`);
      return;
    }

    const isRoleTaken = authorities.some(
      (auth) => auth.country === form.country && auth.role === form.role
    );

    if (isRoleTaken) {
      alert("Já existe uma autoridade cadastrada para esta função nesse país.");
      return;
    }

    onAddAuthority(form);

    setForm({ name: "", country: "", role: "", email: "" });
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Cadastro de Autoridade</h2>
        <input
          type="text"
          name="name"
          placeholder="Nome Completo"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="País Representado"
          value={form.country}
          onChange={handleChange}
          required
        />
        <select name="role" value={form.role} onChange={handleChange} required>
          <option value="">Selecione o cargo</option>
          <option value="Chefe de Estado">Chefe de Estado</option>
          <option value="Ministro de Finanças">Ministro de Finanças</option>
          <option value="Presidente do Banco Central">
            Presidente do Banco Central
          </option>
        </select>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default AuthorityForm;
