import s from './WeeklyForecast.module.css'
import { formatForecastDate } from 'utils/date'
import { weatherDescriptions,getWeatherIcon } from "utils/weather"
export function WeeklyForecast({data}) {
    const { temperature_2m_max, temperature_2m_min, time, weather_code } = data;
    const days = [0, 1, 2, 3, 4, 5, 6, 7];
    return (
      <section>
        <div className="container">
          <ul className={s.list}>
            <p className={s.title}>8-day forecast</p>
            {days.map(day => (
              <li key={day} className={s.item}>
                <p className={s.text}>{formatForecastDate(time[day])}</p>
                <div className={s.wrapper}>
                  {getWeatherIcon(weather_code[day], s.img)}
                  <p className={s.text}>
                    {Math.round(temperature_2m_max[day])}/
                    {Math.round(temperature_2m_min[day])}&deg;C
                  </p>
                </div>
                <p className={s.text}>
                  {weatherDescriptions[weather_code[day]]}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
    
}