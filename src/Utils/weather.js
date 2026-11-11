import sun from '../components/Icons/sun.svg';
import clouds from '../components/Icons/cloud.svg';
import scatteredClouds from '../components/Icons/scattered-clouds.svg';
import lightRain from '../components/Icons/light-rain.svg';
import cloudSun from '../components/Icons/cloud-sun.svg';

export const weatherDescriptions = {
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

export const getWeatherIcon = (code, className) => {
  let icon;

  switch (code) {
    case 0:
      icon = sun;
      break;
    case 1:
      icon = cloudSun;
      break;
    case 2:
      icon = scatteredClouds;
      break;
    case 3:
    case 45:
    case 48:
    case 71:
      icon = clouds;
      break;
    case 51:
    case 61:
    case 63:
    case 65:
    case 80:
    case 95:
      icon = lightRain;
      break;
    default:
      icon = cloudSun;
  }

  return <img src={icon} alt="weather" className={className} />;
};
