import dataset from './toolkit.json';

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

/** Type de ressource, déduit de l'URL (fiable et vérifiable). */
export type ToolKind = 'web' | 'github' | 'cse' | 'tor' | 'docs' | 'api' | 'startpage';

export interface Tool {
  /** Identifiant stable, utilisé comme clé React et pour les liens profonds. */
  id: string;
  name: string;
  url: string;
  description: string;
  tags: string[];
  kind: ToolKind;
  /** Fonction déduite du nom de l'outil (Recherche, Vérification, Suivi…). */
  action?: string;
}

export interface ToolCategory {
  category: string;
  items: Tool[];
}

export interface DatasetMetadata {
  generated: string;
  total: number;
  categories: number;
  descriptionsEnriched: number;
  descriptionsOriginales: number;
  doublonsSupprimes: number;
  kinds: Record<string, number>;
}

/* -------------------------------------------------------------------------- */
/* Données                                                                     */
/* -------------------------------------------------------------------------- */

const data = dataset as unknown as { metadata: DatasetMetadata; categories: ToolCategory[] };

export const toolkit: ToolCategory[] = data.categories;
export const datasetMeta: DatasetMetadata = data.metadata;

/** Tous les outils, à plat. */
export const ALL_TOOLS: Tool[] = toolkit.flatMap(section => section.items);

export const TOTAL_TOOLS = ALL_TOOLS.length;
export const TOTAL_CATEGORIES = toolkit.length;

/** Index url → outil, pour les recherches rapides. */
export const TOOL_BY_ID = new Map(ALL_TOOLS.map(tool => [tool.id, tool]));
export const TOOL_BY_URL = new Map(ALL_TOOLS.map(tool => [tool.url, tool]));

/* -------------------------------------------------------------------------- */
/* Libellés                                                                    */
/* -------------------------------------------------------------------------- */

export const KIND_LABELS: Record<ToolKind, string> = {
  web: 'Outil web',
  github: 'GitHub',
  cse: 'Google CSE',
  tor: 'Tor',
  docs: 'Documentation',
  api: 'API',
  startpage: 'Startpage',
};

export const KIND_SHORT: Record<ToolKind, string> = {
  web: 'Web',
  github: 'GitHub',
  cse: 'CSE',
  tor: 'Tor',
  docs: 'Docs',
  api: 'API',
  startpage: 'Links',
};

/** Ordre d'affichage des filtres de type. */
export const KIND_ORDER: ToolKind[] = ['web', 'github', 'cse', 'tor', 'docs', 'api', 'startpage'];

/** Compteur d'outils par type. */
export const KIND_COUNTS: Record<string, number> = ALL_TOOLS.reduce<Record<string, number>>(
  (acc, tool) => {
    acc[tool.kind] = (acc[tool.kind] ?? 0) + 1;
    return acc;
  },
  {}
);

/* -------------------------------------------------------------------------- */
/* Utilitaires                                                                 */
/* -------------------------------------------------------------------------- */

export function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function getFaviconUrl(url: string, size = 64): string {
  return `https://www.google.com/s2/favicons?domain=${getDomain(url)}&sz=${size}`;
}

/**
 * Texte dans lequel la recherche s'effectue, pré-calculé une seule fois
 * (accents retirés) pour que le filtrage reste instantané sur 1 200+ outils.
 */
export interface SearchableTool extends Tool {
  haystack: string;
  category: string;
}

function deaccent(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export const SEARCHABLE_TOOLS: SearchableTool[] = toolkit.flatMap(section =>
  section.items.map(tool => ({
    ...tool,
    category: section.category,
    haystack: deaccent(
      `${tool.name} ${tool.description} ${section.category} ${getDomain(tool.url)} ${tool.tags.join(' ')} ${tool.action ?? ''}`
    ),
  }))
);

/** Accès direct à un outil enrichi (avec son index de recherche) par identifiant. */
export const SEARCHABLE_BY_ID = new Map(SEARCHABLE_TOOLS.map(tool => [tool.id, tool]));

/** Normalise une requête utilisateur pour la recherche (accents + casse). */
export function normalizeQuery(query: string): string {
  return deaccent(query.trim());
}

/** Nombre d'outils par catégorie. */
export const CATEGORY_COUNTS: Record<string, number> = toolkit.reduce<Record<string, number>>(
  (acc, section) => {
    acc[section.category] = section.items.length;
    return acc;
  },
  {}
);
