export const fetchForecastByCity = async cityName => {
  // Получаем координаты города
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=ru&format=json`;

  const geoRes = await fetch(geoUrl);
  const geoData = await geoRes.json();

  if (!geoRes.ok || !geoData.results?.length) {
    throw new Error('City not found');
  }

  const { latitude, longitude } = geoData.results[0];

  // Получаем прогноз на 8 дней
  const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&forecast_days=8&timezone=auto`;

  const forecastRes = await fetch(forecastUrl);
  const forecastData = await forecastRes.json();

  if (!forecastRes.ok) {
    throw new Error('Forecast not found');
  }

  return {
    city: geoData.results[0].name,
    forecast: forecastData.daily,
  };
};
