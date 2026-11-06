import React from 'react';

export function CityForecast({ data, onRemove, onRefresh }) {
  if (!data) return null;

  const { city, country, current } = data;
  const temp = Math.round(current.temp);

  const dateObj = new Date(current.dt * 1000);

  const timeStr = dateObj.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const dateStr = dateObj.toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const dayStr = dateObj.toLocaleDateString('en-US', { weekday: 'long' });

  const iconUrl = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;

  return (
    <div>
      <div>
        <ul>
          <li><p className=''>{city}</p></li>
          <li><p className=''>{country}</p></li>
        </ul>
      </div>

      <h2>{timeStr}</h2>

      <div>
        <button type="button" onClick={() => console.log('Hourly clicked')}>
          Hourly forecast
        </button>
        <button type="button" onClick={() => console.log('Weekly clicked')}>
          Weekly forecast
        </button>
      </div>

      <p>
        {dateStr} | {dayStr}
      </p>

      <div>
        <img src={iconUrl} alt={current.weather[0].description} />
        <h3>{temp}°C</h3>
      </div>

      <div>
        <button type="button" onClick={onRefresh}>
          Refresh 
        </button>

        <button type="button" onClick={() => console.log('Favorite clicked')}>
          Favorite 
        </button>

        <button type="button" onClick={() => console.log('See more clicked')}>
          See more
        </button>

        <button type="button" onClick={onRemove}>
          Delete 
        </button>
      </div>
    </div>
  );
}