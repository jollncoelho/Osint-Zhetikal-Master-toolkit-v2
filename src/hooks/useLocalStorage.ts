import { useCallback, useState } from 'react';

/**
 * État React persisté dans localStorage.
 * Échoue silencieusement (navigation privée, quota dépassé…) sans casser l'app.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) return JSON.parse(raw) as T;
    } catch {
      /* stockage indisponible ou JSON corrompu */
    }
    return initialValue;
  });

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue(prev => {
        const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          /* quota / mode privé : on garde au moins l'état en mémoire */
        }
        return resolved;
      });
    },
    [key]
  );

  return [value, update] as const;
}
