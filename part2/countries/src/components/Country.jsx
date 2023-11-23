/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import Weather from "./Weather";

const Country = ({ countrie }) => {
  const [weather, setWeather] = useState();
  const { name, capital, population, languages, flags } = countrie;

  const allLanguages = Object.values(languages);
  const flag = Object.values(flags)[0];
  const alt = `Flag of ${name.common}`;
  const APIKEY = import.meta.env.VITE_API_KEY

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${countrie.capital}&appid=${APIKEY}&units=metric`)
      .then((res) => setWeather(res.data));
  }, []);

  return (
    <>
      <h2>{name.common}</h2>
      <p>Capital {capital}</p>
      <p>Population {population}</p>

      <h3>Languages</h3>
      <ul>
        {allLanguages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={flag} alt={alt} />
      <Weather capital={capital} weather={weather} />
    </>
  );
};

export default Country;
