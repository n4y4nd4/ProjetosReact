import React from "react";

function RegionSelector({ selectedRegions, onRegionChange }) {
  return (
    <div>
      <h3>Filtrar por região:</h3>
      <div className="containercheckbox">
        <label>
          <input
            type="checkbox"
            value="Asia"
            onChange={() => onRegionChange("Asia")}
            checked={selectedRegions.includes("Asia")}
          />
          Ásia
        </label>
        <label>
          <input
            type="checkbox"
            value="Europe"
            onChange={() => onRegionChange("Europe")}
            checked={selectedRegions.includes("Europe")}
          />
          Europa
        </label>
        <label>
          <input
            type="checkbox"
            value="Africa"
            onChange={() => onRegionChange("Africa")}
            checked={selectedRegions.includes("Africa")}
          />
          África
        </label>
        <label>
          <input
            type="checkbox"
            value="America"
            onChange={() => onRegionChange("Americas")}
            checked={selectedRegions.includes("Americas")}
          />
          Américas
        </label>
        <label>
          <input
            type="checkbox"
            value="Oceania"
            onChange={() => onRegionChange("Oceania")}
            checked={selectedRegions.includes("Oceania")}
          />
          Oceania
        </label>
      </div>
    </div>
  );
}

export default RegionSelector;
