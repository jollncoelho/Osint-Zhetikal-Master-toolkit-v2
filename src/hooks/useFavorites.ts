import { useState, useCallback } from 'react';

const STORAGE_KEY = 'ghostint_favorites';

function loadFavorites(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch {}
  return new Set();
}

function saveFavorites(favs: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...favs]));
  } catch {}
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(loadFavorites);

  const toggle = useCallback((url: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(url)) next.delete(url);
      else next.add(url);
      saveFavorites(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback((url: string) => favorites.has(url), [favorites]);

  return { favorites, toggle, isFavorite };
}
