import { useState, useEffect } from 'react';

export function useLocalStorage(key, defaultValue = []) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      const favoritesOnly = Array.isArray(value)
        ? value.filter((card) => card.isFavorite)
        : value;

      localStorage.setItem(key, JSON.stringify(favoritesOnly));
    } catch (error) {
    }
  }, [key, value]);

  return [value, setValue];
}