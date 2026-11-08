import s from './ForecastInfo.module.css'
import windImg from '../Icons/wind.svg';
import pressureImg from '../Icons/pressure.svg'
import temperatureImg from '../Icons/temperature.svg'
import visibilityImg from '../Icons/visibility.svg'
import humidityImg from '../Icons/humidity.svg'
export function ForecastInfo({data }) {
    const { humidity, temp, visibility, feels_like, pressure, wind_speed } = data;
    return (
      <section className={s.section}>
        <div className="container">
          <ul className={s.list}>
            <li className={s.item}>
              <p className={s.title}>Feels like</p>
              <p className={s.data}>{feels_like}&deg;C</p>
              <img src={temperatureImg} alt="temperature" className={s.img} />
            </li>
            <li className={s.item}>
              <p className={s.title}>Min &deg;C</p>
              <p className={s.data}>{feels_like}</p>
              <p className={s.title}>Max &deg;C</p>
              <p className={s.data}>{temp}</p>
            </li>
            <li className={s.item}>
              <p className={s.title}>Humidity</p>
              <p className={s.data}>{humidity}%</p>
              <img src={humidityImg} alt="humidity" className={s.img} />
            </li>
            <li className={s.item}>
              <p className={s.title}>Pressure</p>
              <p className={s.data}>{pressure} Pa</p>
              <img src={pressureImg} alt="pressure" className={s.img} />
            </li>
            <li className={s.item}>
              <p className={s.title}>Wind speed</p>
              <p className={s.data}>{wind_speed} m/s</p>
              <img src={windImg} alt="wind" className={s.img} />
            </li>
            <li className={s.item}>
              <p className={s.title}>Visibility</p>
              <p className={s.data}>{visibility}</p>
              <img
                src={visibilityImg}
                alt="visibility"
                className={s.img}
              />
            </li>
          </ul>
        </div>
      </section>
    );
}