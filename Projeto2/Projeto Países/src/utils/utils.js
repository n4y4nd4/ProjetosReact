import axios from "axios";

export const getCountries = async () => {
  const G20_COUNTRIES = [
    "South Africa",
    "Germany",
    "Saudi Arabia",
    "Argentina",
    "Australia",
    "Brazil",
    "Canada",
    "China",
    "South Korea",
    "United States",
    "France",
    "India",
    "Indonesia",
    "Italy",
    "Japan",
    "Mexico",
    "United Kingdom",
    "Russia",
    "Turkey",
  ];

  const response = await axios.get("https://restcountries.com/v3.1/all");
  return response.data.filter((country) =>
    G20_COUNTRIES.includes(country.name.common)
  );
};
