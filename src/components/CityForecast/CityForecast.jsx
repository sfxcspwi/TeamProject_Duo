import React from 'react';
import s from './CityForecast.module.css';
import refresh from "../Icons/refresh.svg";
import heartNoFill from "../Icons/heart_nofill.svg";
import heartFill from "../Icons/heart_fill.svg";
import deletesvg from "../Icons/delete.svg"


export function CityForecast({ data, isFavorite, onFavorite, onRemove, onRefresh }) {
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

  const handleSeeMore = () => {
   
  };

  return (
    <div className={s.card}>
  
        <div className={s.header}>

          <ul className={s.locationList}>   
              <li className={s.locationItem}>
                  <p className={s.cityName}>{city}</p>
              </li>     

              <li className={s.locationItem}>
                  <p className={s.countryName}>{country}</p>
              </li> 
          </ul>

        </div>  

        <h2 className={s.time}>{timeStr}</h2>   

        <div className={s.tabGroup}> 

            <button className={s.tabBtn} type="button" onClick={() => console.log('Hourly clicked')}>
              Hourly forecast
            </button> 

            <button className={s.tabBtn} type="button" onClick={() => console.log('Weekly clicked')}>
              Weekly forecast
            </button> 

        </div>  

        <p className={s.dateRow}>   
            <span>{dateStr}</span>    
            <span className={s.dateDivider}>|</span>  
            <span>{dayStr}</span> 
        </p>

        <div className={s.weatherVisual}>
            <img className={s.weatherIcon} src={iconUrl} alt={current.weather[0].description} />
            <h3 className={s.temperature}>{temp}°C</h3>
        </div>

        <div className={s.cardFooter}>
            <button 
              className={`${s.actionBtn} ${s.refreshBtn}`} 
              type="button" 
              onClick={onRefresh} 
              aria-label="Refresh"
            >
              <img className={s.iconsBtn} src={refresh} alt="refresh" />
            </button>   

            <button 
              className={`${s.actionBtn} ${s.favoriteBtn} ${isFavorite ? s.favoriteActive : ''}`} 
              type="button" 
              onClick={onFavorite} 
              aria-label="Favorite"
            >
                <img src={isFavorite ? heartFill : heartNoFill} alt="favorite icon" />
            </button>  
                 
            <button className={s.seeMoreBtn} type="button" onClick={handleSeeMore}>
              See more
            </button>   

            <button 
              className={`${s.actionBtn} ${s.deleteBtn}`} 
              type="button" 
              onClick={onRemove} 
              aria-label="Delete"
            >
                <img className={s.iconsBtn} src={deletesvg} alt="delete" />
            </button>
        </div>
    </div>
  );
}