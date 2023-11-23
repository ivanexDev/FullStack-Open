/* eslint-disable react/prop-types */
const Weather = ({ capital, weather }) => {
  return (
    <>
      {weather === undefined ? (
        <></>
      ) : (
        <>
          <h3>Weather in {capital}</h3>
          <h3>{weather.weather[0].main}</h3>
          <p><strong>Temperature: </strong>{weather.main.temp}</p>
          <p><strong>Wind: </strong>{weather.wind.speed} km/h</p>
        </>
      )}
    </>
  );
};

export default Weather;
