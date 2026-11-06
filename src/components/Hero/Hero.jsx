import s from './Hero.module.css';
import React, { useState, useEffect } from 'react';
import search from "../Icons/search.svg";

let getOrdinalSuffix = (day) => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:  return 'st';
    case 2:  return 'nd';
    case 3:  return 'rd';
    default: return 'th';
  }
};

let getKyivDateTime = () => {
  let now = new Date();

  let monthYear = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Kyiv',
    month: 'long',
    year: 'numeric',
  }).format(now);

  let dayOfWeek = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Kyiv',
    weekday: 'long',
  }).format(now);

  let dayNum = parseInt(
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

export function Hero({ onSearch }) {
  const [dateData, setDateData] = useState(getKyivDateTime);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateData(getKyivDateTime());
    }, 1000);

    return () => clearInterval(intervalId); 
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
      setQuery(''); 
    }
  };

  return (
    <section className={s.section}>
      <div className={s.container}>
        <h1 className={s.title}>Weather dashboard</h1>

        <div className={s.content}>
          <p className={s.description}>
            Create your personal list of favorite cities and always be aware of the weather.
          </p>

          <div className={s.divider}/>

          <div className={s.dateInfo}>
            <span className={s.dateMonth}>{dateData.monthYear}</span>
            <span className={s.dateDay}>
              {dateData.dayOfWeek}, {dateData.dayNum}<sup>{dateData.suffix}</sup>
            </span>
          </div>
        </div>

        <form className={s.searchForm} onSubmit={handleSubmit}>
          <input 
            type="search" 
            className={s.searchInput} 
            placeholder="Search location..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className={s.searchButton}>
            <img src={search} className={s.searchIcon} alt="search" />
          </button>
        </form>
      </div>
    </section>
  );
}