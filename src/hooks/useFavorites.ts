import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { TOOL_BY_URL } from '../data/tools';

const STORAGE_KEY = 'zhetikal.favorites.v2';
const LEGACY_KEY = 'ghostint_favorites';

/**
 * Gestion des favoris (identifiants d'outils), persistés dans le navigateur.
 * Migration transparente depuis l'ancien format (liste d'URL → identifiants).
 */
function loadInitial(): string[] {
  try {
    const legacy = window.localStorage.getItem(LEGACY_KEY);
    if (legacy) {
      const urls = JSON.parse(legacy) as string[];
      window.localStorage.removeItem(LEGACY_KEY);
      if (Array.isArray(urls)) {
        return urls.map(url => TOOL_BY_URL.get(url)?.id).filter((id): id is string => Boolean(id));
      }
    }
  } catch {
    /* stockage indisponible : on repart d'une liste vide */
  }
  return [];
}

export function useFavorites() {
  const [ids, setIds] = useLocalStorage<string[]>(STORAGE_KEY, loadInitial());

  const favorites = useMemo(() => new Set(ids), [ids]);

  const toggle = useCallback(
    (id: string) => {
      setIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
    },
    [setIds]
  );

  const clear = useCallback(() => setIds([]), [setIds]);

  const isFavorite = useCallback((id: string) => favorites.has(id), [favorites]);

  return { favorites, ids, toggle, clear, isFavorite };
}
