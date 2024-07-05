import { useState, useEffect } from "react";
import TopButtons from "../components/TopButtons";
import Inputs from "../components/inputs";
import TimeAndLocation from "../components/TimeAndLocation";
import TempAndDetails from "../components/TempAndDetails";
import Forecast from "../components/Forecast";
import getFormattedWeatherData from "../services/WeatherService";

const WeatherBoard = ({ setAuth }) => {
  const [query, setQuery] = useState({ q: 'Thrissur' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    try {
      const data = await getFormattedWeatherData({...query, units });
      console.log("Weather Data: ", data); 
      setWeather(data);
    } catch (error) {
      console.error('Error getting weather data:', error);
    }
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/weatherboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseData = await response.json();
      setName(parseData.name);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const formatBackground = () =>{
    if(!weather) return "from-cyan-600 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if(weather.temp <= threshold) return "from-cyan-600 to-blue-700";
    return "from-yellow-600 to-orange-700";
  }

  return (
    <div className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} name={name} token={localStorage.token} setAuth={setAuth} />
      {weather && (
        <>
          <TimeAndLocation
            name={weather.name}
            country={weather.country}
            formattedLocalTime={weather.formattedLocalTime}
          />
          <TempAndDetails
            temp={weather.temp}
            feels_like={weather.feels_like}
            temp_min={weather.temp_min}
            temp_max={weather.temp_max}
            humidity={weather.humidity}
            speed={weather.speed}
            details={weather.details}
            icon={weather.icon}
            sunrise={weather.sunrise}
            sunset={weather.sunset}
            units={weather.units}
          />
          <Forecast title="Hourly Forecast" items={weather.hourly} />
          <Forecast title="Daily Forecast" items={weather.daily} />
        </>
      )}
    </div>
  );
};

export default WeatherBoard;
