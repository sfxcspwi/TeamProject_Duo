const API_KEY = '55d402e08f930acd12183ec55d7a16a9'; 

export const fetchWeatherByCity = async (cityName) => {
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${API_KEY}`;
  const geoRes = await fetch(geoUrl);
  const geoData = await geoRes.json();

  if (!geoRes.ok) {
    throw new Error(geoData.message || 'API key error or request failed');
  }

  if (!Array.isArray(geoData) || geoData.length === 0) {
    throw new Error(`City "${cityName}" not found`);
  }

  const { lat, lon, name, country } = geoData[0];
  const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const weatherRes = await fetch(weatherUrl);
  const weatherData = await weatherRes.json();

  if (!weatherRes.ok) {
    throw new Error(weatherData.message || 'Failed to fetch weather data');
  }

  return {
    city: name,
    country,
    ...weatherData,
  };
};