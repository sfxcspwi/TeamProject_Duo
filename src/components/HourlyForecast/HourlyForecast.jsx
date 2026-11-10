import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import s from './HourlyForecast.module.css';

const interpolateToHourly = (hourlyList = []) => {
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

export function HourlyForecast({ hourly = [] }) {
  const chartData = interpolateToHourly(hourly);

  if (chartData.length === 0) {
    return <p style={{ padding: '20px', textAlign: 'center', color: '#888' }}>Немає даних для прогнозу</p>;
  }

  return (
    <div className={s.card}>
      <h3 className={s.title}>Hourly forecast</h3>
      <div className={s.chartScrollWrapper}>
        <div className={s.chartInner}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#e0e0e0" vertical={true} horizontal={true} />
              
              <XAxis
                dataKey="time"
                orientation="top"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#333', fontSize: 11, fontWeight: 500 }}
                dy={-8}
                interval={0}
              />
              
              <YAxis
                dataKey="temp"
                unit="°C"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#333', fontSize: 12 }}
                domain={['dataMin - 2', 'dataMax + 2']}
              />
              
              <Tooltip formatter={(value) => [`${value}°C`, 'Температура']} />
              
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#FFB36C"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 5, fill: '#FFB36C' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}