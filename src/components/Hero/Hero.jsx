import React, { useState, useEffect } from 'react';
import s from './Hero.module.css';
import { getKyivDateTime } from 'utils/date';
import { SearchForm } from './SearchForm';

export function Hero({ onSearch }) {
  const [dateData, setDateData] = useState(getKyivDateTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateData(getKyivDateTime());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className={s.section}>
      <div className={s.container}>
        <h1 className={s.title}>Weather dashboard</h1>

        <div className={s.content}>
          <p className={s.description}>
            Create your personal list of favorite cities and always be aware of the weather.
          </p>

          <div className={s.divider} />

          <div className={s.dateInfo}>
            <span className={s.dateMonth}>{dateData.monthYear}</span>
            <span className={s.dateDay}>
              {dateData.dayOfWeek}, {dateData.dayNum}<sup>{dateData.suffix}</sup>
            </span>
          </div>
        </div>

        <SearchForm onSearch={onSearch} />
      </div>
    </section>
  );
}