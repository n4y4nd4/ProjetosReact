import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import CountryDetails from "../components/CountryDetails";
import { getCountries } from "../utils/utils";
import AuthorityForm from "../components/AuthorityForm";

function Countries() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [authorities, setAuthorities] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleAddAuthority = (newAuthority) => {
    setAuthorities((prev) => [...prev, newAuthority]);
  };

  const handleRedirectToCountry = (countryName) => {
    const country = countries.find((c) => c.name.common === countryName);
    setSelectedCountry(country);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar
        countries={countries}
        loading={loading}
        onCountrySelect={handleCountrySelect}
        selectedCountry={selectedCountry}
      />
      <div style={{ flex: 1 }}>
        <CountryDetails country={selectedCountry} />
        {selectedCountry && (
          <div>
            <h3>Agendas</h3>
            {countryAgendas.length > 0 ? (
              <ul>
                {countryAgendas.map((agenda, index) => {
                  const authority = countryAuthorities.find(
                    (auth) => auth.id === agenda.authority
                  );
                  return (
                    <li key={index}>
                      <p>
                        <strong>
                          {agenda.date} {agenda.time}
                        </strong>{" "}
                        - {authority.name} ({authority.role})
                      </p>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>Sem agendas registradas para este país.</p>
            )}
          </div>
        )}
        <AuthorityForm
          onAddAuthority={handleAddAuthority}
          g20Countries={countries}
          authorities={authorities}
          onRedirectToCountry={handleRedirectToCountry}
        />
      </div>
    </div>
  );
}

export default Countries;
