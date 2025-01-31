import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CountryDetails from "./components/CountryDetails";
import AuthorityForm from "./components/AuthorityForm";
import ScheduleForm from "./components/ScheduleForm";
import AgendaList from "./components/ScheduleList";
import NotFound from "./pages/NotFound";
import { getCountries } from "./utils/utils";
import "./styles/App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [authorities, setAuthorities] = useState([]);
  const [agendas, setAgendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegions, setSelectedRegions] = useState([]);

  const handleAddAuthority = (newAuthority) => {
    setAuthorities((prev) => [...prev, newAuthority]);
  };

  const handleAddAgenda = (newAgenda) => {
    setAgendas((prev) => [...prev, newAgenda]);

    const [countryName] = newAgenda.authority.split("/");
    const countryIndex = countries.findIndex(
      (country) => country.name.common === countryName
    );

    if (countryIndex !== -1) {
      const updatedCountries = [...countries];
      const countryAgendas = updatedCountries[countryIndex].agendas || [];
      updatedCountries[countryIndex].agendas = [...countryAgendas, newAgenda];
      setCountries(updatedCountries);
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      const cachedCountries = localStorage.getItem("g20_countries");
      if (cachedCountries) {
        setCountries(JSON.parse(cachedCountries));
        setLoading(false);
      } else {
        const data = await getCountries();
        setCountries(data);
        localStorage.setItem("g20_countries", JSON.stringify(data));
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  const handleRegionChange = (region) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Sidebar
        countries={countries}
        loading={loading}
        onCountrySelect={handleCountrySelect}
        selectedCountry={selectedCountry}
        selectedRegions={selectedRegions}
        onRegionChange={handleRegionChange}
      />

      <div style={{ flex: "1", marginLeft: "20px" }}>
        <nav>
          <Link to="/">Países</Link> |{" "}
          <Link to="/authorities">Autoridades</Link> |{" "}
          <Link to="/agendas">Agendas</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <CountryDetails country={selectedCountry} />
              </div>
            }
          />
          <Route
            path="/authorities"
            element={
              <div>
                <AuthorityForm
                  onAddAuthority={handleAddAuthority}
                  g20Countries={countries}
                  authorities={authorities}
                />
                <ul>
                  {authorities.map((auth, index) => (
                    <li key={index}>
                      {auth.name} - {auth.country} ({auth.role})
                    </li>
                  ))}
                </ul>
              </div>
            }
          />
          <Route
            path="/agendas"
            element={
              <div>
                <ScheduleForm
                  onAddAgenda={handleAddAgenda}
                  authorities={authorities}
                />
                <AgendaList agendas={agendas} />
              </div>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
