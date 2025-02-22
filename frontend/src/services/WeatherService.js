const API_KEY = '7018fbeec560eb55afef96251dca957f';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
import { DateTime } from 'luxon';

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((resp) => {
    if (!resp.ok) {
      throw new Error('Network response was not ok');
    }
    return resp.json();
  });
};

const iconUrlFromCode = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

const formatToLocalTime = (secs, offset, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") =>
  DateTime.fromSeconds(secs + offset, { zone: 'utc' }).toFormat(format);

const formatCurrent = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main: details, icon } = weather[0];
  const formattedLocalTime = formatToLocalTime(dt, timezone);

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    country,
    sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
    sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'),
    speed,
    details,
    icon: iconUrlFromCode(icon),
    dt,
    timezone,
    formattedLocalTime,
  };
};

const formatForecastWeather = (secs, offset, data) => {
  if (!data || !Array.isArray(data)) {
    throw new Error('Invalid forecast data');
  }

  // hourly
  const hourly = data
    .filter((f) => f.dt > secs)
    .slice(0, 5)
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, 'hh:mm a'),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }));

  // daily
  const daily = data
    .filter((f) => f.dt_txt.slice(-8) === '00:00:00')
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, 'ccc'),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }));

  return { hourly, daily };
};

const getFormattedWeatherData = async (searchParams) => {
  try {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrent);

    const { dt, lat, lon, timezone } = formattedCurrentWeather;

    const forecastData = await getWeatherData('forecast', {
      lat,
      lon,
      units: searchParams.units,
    });

    if (!forecastData.list) {
      throw new Error('Invalid forecast response');
    }

    const formattedForecastWeather = formatForecastWeather(dt, timezone, forecastData.list);

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export default getFormattedWeatherData;
