import React, { useState } from 'react';
import s from './Hero.module.css';
import search from '../Icons/search.svg';

export function SearchForm({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
      setQuery('');
    }
  };

  return (
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
  );
}