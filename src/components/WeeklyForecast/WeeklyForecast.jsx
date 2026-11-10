import s from './WeeklyForecast.module.css'
import sun from '../Icons/sun.svg'
import clouds from '../Icons/cloud.svg'
import scatteredClouds from '../Icons/scattered-clouds.svg'
import lightRain from '../Icons/light-rain.svg'
import cloudSun from '../Icons/cloud-sun.svg'
export function WeeklyForecast({data}) {
    const weatherDescriptions = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      61: 'Light rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Light snow',
      80: 'Rain showers',
      95: 'Thunderstorm',
    };
    const { temperature_2m_max, temperature_2m_min, time, weather_code } = data;
    const days = [0, 1, 2, 3, 4, 5, 6, 7];
    console.log(data);
    const getWeatherIcon = code => {
      switch (code) {
        // Ясно
        case 0:
          return <img src={sun} alt="sun" className={s.img} />;

        // Невелика хмарність
        case 1:
          return <img src={cloudSun} alt="cloudSun" className={s.img} />;

        // Мінлива хмарність
        case 2:
          return (
            <img
              src={scatteredClouds}
              alt="scatteredClouds"
              className={s.img}
            />
          );

        case 3:
        case 45:
        case 48:
        case 71:
          return <img src={clouds} alt="clouds" className={s.img} />;

        case 51:
        case 61:
        case 63:
        case 65:
        case 80:
        case 95:
          return <img src={lightRain} alt="lightRain" className={s.img} />;

        default:
          return <img src={cloudSun} alt="cloudsSun" className={s.img} />;
      }
    };

    return (
      <section>
        <div className="container">
          <ul className={s.list}>
            <p className={s.title}>8-day forecast</p>
            {days.map(day => (
              <li key={day} className={s.item}>
                <p className={s.text}>
                  {new Date(`${time[day]}T12:00:00`).toLocaleDateString(
                    'en-US',
                    {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    }
                  )}
                </p>
                <div className={s.wrapper}>
                  {getWeatherIcon(weather_code[day])}
                  <p className={s.text}>
                    {Math.round(temperature_2m_max[day])}/
                    {Math.round(temperature_2m_min[day])}&deg;C
                  </p>
                </div>
                <p className={s.text}>{weatherDescriptions[weather_code[day]]}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
    
}