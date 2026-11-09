const API_KEY = '55d402e08f930acd12183ec55d7a16a9'; 

export const fetchWeatherByCity = async (cityName) => {

  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=metric&appid=${API_KEY}`;
  const currentRes = await fetch(currentUrl);
  const currentData = await currentRes.json();
  

  if (!currentRes.ok) {
    throw new Error(currentData.message || 'City not found');
  }

  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&units=metric&appid=${API_KEY}`;
  const forecastRes = await fetch(forecastUrl);
  const forecastData = await forecastRes.json();

  if (!forecastRes.ok) {
    throw new Error(forecastData.message || 'Failed to fetch forecast');
  }

  return {
    city: currentData.name,
    country: currentData.sys.country,
    current: {
      dt: currentData.dt,
      temp: currentData.main.temp,
      feels_like: currentData.main.feels_like,
      humidity: currentData.main.humidity,
      pressure: currentData.main.pressure,
      wind_speed: currentData.wind.speed,
      visibility: currentData.visibility,
      weather: currentData.weather,
    },
    hourly: forecastData.list, 
  };
};