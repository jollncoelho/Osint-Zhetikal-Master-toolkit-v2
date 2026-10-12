import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

const STORAGE_KEY = 'zhetikal.recent.v1';
const MAX_ITEMS = 24;

/** Historique des outils récemment ouverts (identifiants, du plus récent au plus ancien). */
export function useRecent() {
  const [ids, setIds] = useLocalStorage<string[]>(STORAGE_KEY, []);

  const push = useCallback(
    (id: string) => {
      setIds(prev => [id, ...prev.filter(x => x !== id)].slice(0, MAX_ITEMS));
    },
    [setIds]
  );

  const clear = useCallback(() => setIds([]), [setIds]);

  return { recentIds: ids, push, clear };
}
