import React, { useState } from "react";
import RegionSelector from "./RegionSelector";
import "../styles/Sidebar.css";

function Sidebar({
  countries,
  loading,
  onCountrySelect,
  selectedCountry,
  selectedRegions,
  onRegionChange,
}) {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredCountries = countries.filter((country) => {
    const matchesName = filter
      ? country.name.common.toLowerCase().includes(filter.toLowerCase())
      : true;

    const matchesRegion =
      selectedRegions.length === 0 || selectedRegions.includes(country.region);

    return matchesName && matchesRegion;
  });

  return (
    <div className="sidebar">
      <h2>Países do G20</h2>
      <input
        type="text"
        placeholder="Filtrar por nome..."
        value={filter}
        onChange={handleFilterChange}
      />
      {/* Adicionado o filtro por região */}
      <RegionSelector
        selectedRegions={selectedRegions}
        onRegionChange={onRegionChange}
      />
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {filteredCountries.map((country) => (
            <li
              key={country.cca3}
              onClick={() => onCountrySelect(country)}
              className={`sidebar-item ${
                selectedCountry &&
                selectedCountry.name.common === country.name.common
                  ? "highlighted"
                  : ""
              }`}
            >
              {country.name.common}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Sidebar;
