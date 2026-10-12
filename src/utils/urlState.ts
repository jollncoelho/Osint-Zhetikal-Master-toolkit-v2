import { useEffect, useRef } from 'react';

/**
 * Synchronisation de l'état de l'interface avec le fragment d'URL
 * (`#q=…&cat=…&kind=…&view=…&sort=…`).
 *
 * Permet de partager ou de mettre en favori une recherche précise.
 * `replaceState` est utilisé volontairement : pas de pollution de l'historique.
 */

export type UrlParams = Record<string, string | undefined>;

export function readUrlParams(): UrlParams {
  const hash = window.location.hash.replace(/^#/, '');
  if (!hash) return {};
  const params = new URLSearchParams(hash);
  const result: UrlParams = {};
  params.forEach((value, key) => {
    if (value) result[key] = value;
  });
  return result;
}

function serialize(params: UrlParams): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) search.set(key, value);
  }
  return search.toString();
}

/** Écrit l'état courant dans le fragment d'URL (sans entrée d'historique). */
export function useUrlSync(params: UrlParams) {
  const serialized = serialize(params);
  const last = useRef<string | null>(null);

  useEffect(() => {
    if (last.current === serialized) return;
    last.current = serialized;
    const base = `${window.location.pathname}${window.location.search}`;
    window.history.replaceState(null, '', serialized ? `${base}#${serialized}` : base);
  }, [serialized]);
}
