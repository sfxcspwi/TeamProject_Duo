export const getOrdinalSuffix = day => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

export const getKyivDateTime = () => {
  const now = new Date();

  const monthYear = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Kyiv',
    month: 'long',
    year: 'numeric',
  }).format(now);

  const dayOfWeek = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Kyiv',
    weekday: 'long',
  }).format(now);

  const dayNum = parseInt(
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Kyiv',
      day: 'numeric',
    }).format(now),
    10
  );

  return {
    monthYear,
    dayOfWeek,
    dayNum,
    suffix: getOrdinalSuffix(dayNum),
  };
};

export const formatCityForecastDate = timestamp => {
  if (!timestamp) return { timeStr: '', dateStr: '', dayStr: '' };

  const dateObj = new Date(timestamp * 1000);

  const timeStr = dateObj.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const dateStr = dateObj.toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const dayStr = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
  });

  return { timeStr, dateStr, dayStr };
};
export const formatForecastDate = date => {
  return new Date(`${date}T12:00:00`).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export const interpolateToHourly = (hourlyList = []) => {
  if (!hourlyList || hourlyList.length < 2) return [];

  const result = [];

  for (let i = 0; i < hourlyList.length - 1 && result.length < 24; i++) {
    const currentPoint = hourlyList[i];
    const nextPoint = hourlyList[i + 1];

    const startTime = currentPoint.dt * 1000;
    const startTemp = currentPoint.main.temp;
    const tempDiff = (nextPoint.main.temp - startTemp) / 3;

    for (let step = 0; step < 3; step++) {
      if (result.length >= 24) break;

      const date = new Date(startTime + step * 3600 * 1000);
      const hours = date.getHours();
      const ampm = hours >= 12 ? 'pm' : 'am';
      const formattedHour = `${hours % 12 || 12} ${ampm}`;

      result.push({
        time: formattedHour,
        temp: Math.round(startTemp + tempDiff * step),
      });
    }
  }

  return result;
};