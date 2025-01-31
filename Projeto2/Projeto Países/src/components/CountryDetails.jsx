import React from "react";
import "../styles/Details.css";

function CountryDetails({ country }) {
  if (!country) {
    return (
      <div className="details">
        <p>Selecione um país para ver os detalhes.</p>
      </div>
    );
  }

  const firstLanguage = country.languages
    ? Object.values(country.languages)[0]
    : "N/A";

  return (
    <div className="details">
      <h2>{country.name.common}</h2>
      <p>
        <strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}
      </p>
      <p>
        <strong>Região:</strong> {country.region}
      </p>
      <p>
        <strong>Idioma:</strong> {firstLanguage}
      </p>
      <p>
        <strong>Domínio:</strong> {country.tld ? country.tld[0] : "N/A"}
      </p>
      {/* Adicionando exibição das agendas do país */}
      <h3>Agendas</h3>
      {country.agendas && country.agendas.length > 0 ? (
        <ul>
          {country.agendas.map((agenda, index) => (
            <li key={index}>
              {agenda.date} às {agenda.time} - {agenda.authority}
            </li>
          ))}
        </ul>
      ) : (
        <p>Sem agendas registradas para este país.</p>
      )}
    </div>
  );
}

export default CountryDetails;
