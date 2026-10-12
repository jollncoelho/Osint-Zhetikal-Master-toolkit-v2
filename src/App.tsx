import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Search,
  Star,
  LayoutGrid,
  Shuffle,
  Github,
  FileJson,
  FileText,
  RotateCcw,
  History,
  Sun,
  Moon,
  SlidersHorizontal,
  Link2,
  ChevronsDownUp,
  ChevronsUpDown,
  ShieldCheck,
  X,
  Menu,
} from 'lucide-react';
import {
  ALL_TOOLS,
  KIND_COUNTS,
  KIND_LABELS,
  KIND_ORDER,
  SEARCHABLE_BY_ID,
  SEARCHABLE_TOOLS,
  TOTAL_TOOLS,
  Tool,
  ToolKind,
  CATEGORY_COUNTS,
  normalizeQuery,
} from './data/tools';
import { CategorySection } from './components/CategorySection';
import { RandomToolModal } from './components/RandomToolModal';
import { SubmitToolModal } from './components/SubmitToolModal';
import { Sidebar, View } from './components/Sidebar';
import { ScrollTopButton } from './components/ScrollTopButton';
import { Toasts } from './components/Toasts';
import { Chip, ConfirmButton, StatPill } from './components/ui';
import { useFavorites } from './hooks/useFavorites';
import { useRecent } from './hooks/useRecent';
import { useTheme } from './hooks/useTheme';
import { toast } from './hooks/useToasts';
import {
  collectFavoriteTools,
  copyText,
  downloadFile,
  toolsToJSON,
  toolsToMarkdown,
  toolsToUrlList,
} from './utils/exportFavorites';
import { readUrlParams, useUrlSync } from './utils/urlState';

type SortKey = 'default' | 'name' | 'name-desc' | 'category' | 'category-desc';

const SORT_LABELS: Record<SortKey, string> = {
  default: 'Pertinence',
  name: 'Nom (A → Z)',
  'name-desc': 'Nom (Z → A)',
  category: 'Catégorie (A → Z)',
  'category-desc': 'Catégorie (Z → A)',
};

const CATEGORY_ORDER = new Map(SEARCHABLE_TOOLS.map((tool, index) => [tool.category, index]));

/** Trie une liste d'outils selon la clé demandée (l'ordre initial est préservé sinon). */
function sortTools(items: Tool[], sort: SortKey): Tool[] {
  if (sort === 'name') return [...items].sort((a, b) => a.name.localeCompare(b.name, 'fr'));
  if (sort === 'name-desc') return [...items].sort((a, b) => b.name.localeCompare(a.name, 'fr'));
  return items;
}

export default function App() {
  const initial = useMemo(readUrlParams, []);

  const [search, setSearch] = useState(initial.q ?? '');
  const [activeCategory, setActiveCategory] = useState(initial.cat ?? 'Toutes');
  const [activeKinds, setActiveKinds] = useState<Set<ToolKind>>(
    () => new Set((initial.kind ?? '').split(',').filter(Boolean) as ToolKind[])
  );
  const [sort, setSort] = useState<SortKey>((initial.sort as SortKey) ?? 'default');
  const [view, setView] = useState<View>((initial.view as View) ?? 'all');
  const [revealAll, setRevealAll] = useState(false);
  const [randomOpen, setRandomOpen] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const { favorites, ids: favoriteIds, toggle: toggleFavorite, clear: clearFavorites } = useFavorites();
  const { recentIds, push: pushRecent, clear: clearRecent } = useRecent();
  const { theme, toggle: toggleTheme } = useTheme();

  const searchRef = useRef<HTMLInputElement>(null);

  /* ---------------------------------------------------------------- */
  /* URL : partage / mise en favori d'une vue précise                  */
  /* ---------------------------------------------------------------- */
  useUrlSync({
    q: search || undefined,
    cat: activeCategory !== 'Toutes' ? activeCategory : undefined,
    kind: activeKinds.size > 0 ? [...activeKinds].join(',') : undefined,
    view: view !== 'all' ? view : undefined,
    sort: sort !== 'default' ? sort : undefined,
  });

  /* ---------------------------------------------------------------- */
  /* Raccourcis clavier                                                */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.tagName === 'SELECT';

      if (event.key === '/' && !typing) {
        event.preventDefault();
        searchRef.current?.focus();
        return;
      }
      if ((event.key === 'k' || event.key === 'K') && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        searchRef.current?.focus();
        return;
      }
      if (event.key === 'Escape' && typing) {
        setSearch('');
        (target as HTMLInputElement).blur();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  /* ---------------------------------------------------------------- */
  /* Filtrage                                                          */
  /* ---------------------------------------------------------------- */
  const sourceList = useMemo(() => {
    if (view === 'favorites') {
      return favoriteIds.map(id => SEARCHABLE_BY_ID.get(id)).filter(Boolean) as typeof SEARCHABLE_TOOLS;
    }
    if (view === 'recent') {
      return recentIds.map(id => SEARCHABLE_BY_ID.get(id)).filter(Boolean) as typeof SEARCHABLE_TOOLS;
    }
    return SEARCHABLE_TOOLS;
  }, [view, favoriteIds, recentIds]);

  const filtered = useMemo(() => {
    const terms = normalizeQuery(search).split(/\s+/).filter(Boolean);

    return sourceList.filter(tool => {
      if (activeCategory !== 'Toutes' && tool.category !== activeCategory) return false;
      if (activeKinds.size > 0 && !activeKinds.has(tool.kind)) return false;
      if (terms.length > 0 && !terms.every(term => tool.haystack.includes(term))) return false;
      return true;
    });
  }, [sourceList, activeCategory, activeKinds, search]);

  /** Regroupement par catégorie (ou section unique pour favoris / récents). */
  const sections = useMemo(() => {
    if (view !== 'all') {
      return [
        {
          category: view === 'favorites' ? 'Mes favoris' : 'Consultés récemment',
          items: sortTools(filtered, sort),
        },
      ];
    }

    const grouped = new Map<string, Tool[]>();
    for (const tool of filtered) {
      const bucket = grouped.get(tool.category);
      if (bucket) bucket.push(tool);
      else grouped.set(tool.category, [tool]);
    }

    let names = [...grouped.keys()].sort(
      (a, b) => (CATEGORY_ORDER.get(a) ?? 0) - (CATEGORY_ORDER.get(b) ?? 0)
    );
    if (sort === 'category') names = [...names].sort((a, b) => a.localeCompare(b, 'fr'));
    if (sort === 'category-desc') names = [...names].sort((a, b) => b.localeCompare(a, 'fr'));

    return names.map(name => ({ category: name, items: sortTools(grouped.get(name) ?? [], sort) }));
  }, [filtered, view, sort]);

  const visibleCount = filtered.length;
  const favoriteTools = useMemo(() => collectFavoriteTools(favoriteIds), [favoriteIds]);

  const activeFilterCount =
    (search.trim() ? 1 : 0) +
    (activeCategory !== 'Toutes' ? 1 : 0) +
    activeKinds.size +
    (sort !== 'default' ? 1 : 0);

  /* ---------------------------------------------------------------- */
  /* Actions                                                           */
  /* ---------------------------------------------------------------- */

  const resetFilters = useCallback(() => {
    setSearch('');
    setActiveCategory('Toutes');
    setActiveKinds(new Set());
    setSort('default');
    setRevealAll(false);
  }, []);

  const switchView = useCallback((next: View) => {
    setView(next);
    setActiveCategory('Toutes');
    setRevealAll(false);
    setMobileNavOpen(false);
  }, []);

  const toggleKind = useCallback((kind: ToolKind) => {
    setActiveKinds(prev => {
      const next = new Set(prev);
      if (next.has(kind)) next.delete(kind);
      else next.add(kind);
      return next;
    });
  }, []);

  const handleOpenTool = useCallback((tool: Tool) => pushRecent(tool.id), [pushRecent]);

  const handleExport = useCallback(
    (format: 'json' | 'md' | 'urls') => {
      if (favoriteTools.length === 0) {
        toast('Aucun favori à exporter', 'warning');
        return;
      }
      const stamp = new Date().toISOString().slice(0, 10);
      if (format === 'json') {
        downloadFile(`zhetikal-favoris-${stamp}.json`, toolsToJSON(favoriteTools), 'application/json');
      } else if (format === 'md') {
        downloadFile(`zhetikal-favoris-${stamp}.md`, toolsToMarkdown(favoriteTools), 'text/markdown');
      } else {
        downloadFile(`zhetikal-favoris-${stamp}.txt`, toolsToUrlList(favoriteTools), 'text/plain');
      }
      toast(`Export de ${favoriteTools.length} outil(s)`, 'success');
    },
    [favoriteTools]
  );

  const handleCopyAll = useCallback(async () => {
    if (favoriteTools.length === 0) return;
    const ok = await copyText(toolsToUrlList(favoriteTools));
    toast(ok ? `${favoriteTools.length} lien(s) copié(s)` : 'Copie impossible', ok ? 'success' : 'warning');
  }, [favoriteTools]);

  const categoriesForNav = useMemo(
    () => SEARCHABLE_TOOLS.reduce<{ category: string; count: number }[]>((acc, tool) => {
      if (!acc.some(c => c.category === tool.category)) {
        acc.push({ category: tool.category, count: CATEGORY_COUNTS[tool.category] ?? 0 });
      }
      return acc;
    }, []),
    []
  );

  const randomPool = useMemo(() => (filtered.length > 0 ? filtered : ALL_TOOLS), [filtered]);

  /* ---------------------------------------------------------------- */
  /* Rendu                                                             */
  /* ---------------------------------------------------------------- */

  const emptyMessage =
    view === 'favorites'
      ? 'Aucun favori pour le moment. Cliquez sur l\'étoile d\'une carte pour l\'ajouter ici.'
      : view === 'recent'
        ? 'Aucun outil consulté récemment.'
        : 'Aucun outil ne correspond à votre recherche.';

  return (
    <div className="min-h-screen bg-app-bg text-app-text">
      <a href="#resultats" className="skip-link">
        Aller aux résultats
      </a>

      <div className="mx-auto flex max-w-[1500px] gap-4 px-3 py-4 sm:px-5">
        {/* Barre latérale (bureau) */}
        <Sidebar
          categories={categoriesForNav}
          activeCategory={activeCategory}
          onSelectCategory={category => {
            setActiveCategory(category);
            setMobileNavOpen(false);
          }}
          view={view}
          onSelectView={switchView}
          favoritesCount={favoriteIds.length}
          recentCount={recentIds.length}
        />

        <main className="min-w-0 flex-1">
          {/* ---------------------------- En-tête ---------------------------- */}
          <header className="mb-4 rounded-[24px] border border-app-border bg-gradient-to-b from-app-bgSoft to-app-panel p-4 shadow-card sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <img
                  src="/logo.svg"
                  alt=""
                  aria-hidden
                  width={52}
                  height={52}
                  className="h-[52px] w-[52px] flex-shrink-0 shadow-lg"
                />
                <div>
                  <h1 className="text-[1.35rem] font-bold leading-tight tracking-tight sm:text-[1.6rem]">
                    OSINT Master-Toolkit
                    <span className="ml-2 align-middle rounded-md border border-app-accent/30 bg-app-accentSoft px-1.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-app-accent">
                      v2
                    </span>
                  </h1>
                  <p className="mt-1 text-[0.78rem] tracking-wider text-app-muted">
                    ZHETIKAL · GHOSTINT-TOOLS · ÉDITION COMMUNAUTAIRE
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-app-border bg-app-panel text-app-muted transition-all hover:border-app-accent/50 hover:text-app-accent"
                  aria-label={theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre'}
                  title={theme === 'dark' ? 'Thème clair' : 'Thème sombre'}
                >
                  {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                </button>
                <button
                  type="button"
                  onClick={() => setRandomOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-app-border bg-app-panel px-3 py-2 text-[0.78rem] font-semibold text-app-text transition-all hover:border-app-accent/50 hover:text-app-accent"
                >
                  <Shuffle size={14} aria-hidden />
                  Au hasard
                </button>
                <button
                  type="button"
                  onClick={() => setSubmitOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-app-border bg-app-panel px-3 py-2 text-[0.78rem] font-semibold text-app-text transition-all hover:border-app-accent/50 hover:text-app-accent"
                >
                  <Github size={14} aria-hidden />
                  Proposer
                </button>
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(v => !v)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-app-border bg-app-panel px-3 py-2 text-[0.78rem] font-semibold text-app-text transition-all hover:border-app-accent/50 lg:hidden"
                  aria-expanded={mobileNavOpen}
                >
                  <Menu size={14} aria-hidden />
                  Catégories
                </button>
              </div>
            </div>

            {/* Statistiques */}
            <div className="mt-4 flex flex-wrap gap-2">
              <StatPill icon={<ShieldCheck size={13} />} label="Total" value={TOTAL_TOOLS} />
              <StatPill icon={<LayoutGrid size={13} />} label="Affichés" value={visibleCount} tone="emerald" />
              {favoriteIds.length > 0 && (
                <StatPill icon={<Star size={13} fill="currentColor" />} label="Favoris" value={favoriteIds.length} tone="gold" />
              )}
            </div>

            {/* Recherche */}
            <div className="relative mt-4">
              <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-app-dim" aria-hidden />
              <input
                ref={searchRef}
                type="search"
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder="Rechercher un outil, une catégorie, un domaine…"
                aria-label="Rechercher un outil"
                className="w-full rounded-2xl border border-app-border bg-app-panel py-3 pl-11 pr-24 text-[0.92rem] text-app-text outline-none transition-all placeholder:text-app-dim focus:border-app-accent/50"
              />
              <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1.5">
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="rounded-lg p-1.5 text-app-dim transition-colors hover:text-app-text"
                    aria-label="Effacer la recherche"
                  >
                    <X size={14} />
                  </button>
                )}
                <kbd className="hidden rounded-md border border-app-border bg-app-panel2 px-1.5 py-0.5 font-mono text-[0.68rem] text-app-dim sm:block">
                  /
                </kbd>
              </div>
            </div>

            {/* Filtres */}
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 custom-scroll sm:flex-wrap sm:overflow-visible sm:pb-0">
              <span className="inline-flex flex-shrink-0 items-center gap-1.5 self-center text-[0.72rem] font-bold uppercase tracking-wider text-app-dim">
                <SlidersHorizontal size={12} aria-hidden />
                Type
              </span>
              {KIND_ORDER.filter(kind => (KIND_COUNTS[kind] ?? 0) > 0).map(kind => (
                <Chip
                  key={kind}
                  active={activeKinds.has(kind)}
                  onClick={() => toggleKind(kind)}
                  count={KIND_COUNTS[kind]}
                  title={`Filtrer les ressources de type ${KIND_LABELS[kind]}`}
                >
                  {KIND_LABELS[kind]}
                </Chip>
              ))}
            </div>

            {/* Catégories (mobile) */}
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 custom-scroll lg:hidden">
              <Chip active={activeCategory === 'Toutes'} onClick={() => setActiveCategory('Toutes')}>
                Toutes
              </Chip>
              {categoriesForNav.map(({ category }) => (
                <Chip key={category} active={activeCategory === category} onClick={() => setActiveCategory(category)}>
                  {category}
                </Chip>
              ))}
            </div>

            {/* Tri + actions */}
            <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-app-border pt-3">
              <label className="flex items-center gap-2 text-[0.76rem] text-app-muted">
                Trier par
                <select
                  value={sort}
                  onChange={event => setSort(event.target.value as SortKey)}
                  className="rounded-lg border border-app-border bg-app-panel2 px-2.5 py-1.5 text-[0.76rem] font-semibold text-app-text outline-none focus:border-app-accent/50"
                >
                  {(Object.keys(SORT_LABELS) as SortKey[]).map(key => (
                    <option key={key} value={key} className="bg-app-panel">
                      {SORT_LABELS[key]}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                onClick={() => setRevealAll(v => !v)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-app-border bg-app-panel px-2.5 py-1.5 text-[0.76rem] font-semibold text-app-muted transition-all hover:border-app-accent/50 hover:text-app-accent"
              >
                {revealAll ? <ChevronsDownUp size={13} aria-hidden /> : <ChevronsUpDown size={13} aria-hidden />}
                {revealAll ? 'Tout replier' : 'Tout déplier'}
              </button>

              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-app-accent/30 bg-app-accentSoft px-3 py-1.5 text-[0.76rem] font-semibold text-app-accent transition-all hover:border-app-accent/60"
                >
                  <RotateCcw size={12} aria-hidden />
                  Réinitialiser ({activeFilterCount})
                </button>
              )}
            </div>

            {/* Barre d'export (favoris) */}
            {view === 'favorites' && (
              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-app-border pt-3">
                <span className="text-[0.8rem] font-semibold text-app-muted">Exporter :</span>
                <button
                  type="button"
                  onClick={() => handleExport('json')}
                  disabled={favoriteTools.length === 0}
                  className="inline-flex items-center gap-1.5 rounded-full border border-app-border bg-app-panel px-3.5 py-2 text-[0.78rem] font-semibold text-app-accent transition-all hover:border-app-accent/50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FileJson size={13} aria-hidden />
                  JSON
                </button>
                <button
                  type="button"
                  onClick={() => handleExport('md')}
                  disabled={favoriteTools.length === 0}
                  className="inline-flex items-center gap-1.5 rounded-full border border-app-border bg-app-panel px-3.5 py-2 text-[0.78rem] font-semibold text-app-emerald transition-all hover:border-app-emerald/50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FileText size={13} aria-hidden />
                  Markdown
                </button>
                <button
                  type="button"
                  onClick={handleCopyAll}
                  disabled={favoriteTools.length === 0}
                  className="inline-flex items-center gap-1.5 rounded-full border border-app-border bg-app-panel px-3.5 py-2 text-[0.78rem] font-semibold text-app-muted transition-all hover:border-app-accent/50 hover:text-app-accent disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Link2 size={13} aria-hidden />
                  Copier les liens
                </button>
                {favoriteIds.length > 0 && (
                  <ConfirmButton
                    onConfirm={() => {
                      clearFavorites();
                      toast('Favoris vidés', 'info');
                    }}
                    confirmLabel="Confirmer la suppression ?"
                    className="ml-auto"
                  >
                    Tout retirer
                  </ConfirmButton>
                )}
              </div>
            )}
          </header>

          {/* --------------------------- Résultats --------------------------- */}
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-[0.8rem] text-app-muted" aria-live="polite">
              <span className="font-bold text-app-accent">{visibleCount}</span> outil{visibleCount > 1 ? 's' : ''} affiché
              {visibleCount > 1 ? 's' : ''} sur <span className="font-bold text-app-text">{TOTAL_TOOLS}</span>
              {activeCategory !== 'Toutes' && <> · catégorie « {activeCategory} »</>}
            </p>
            {view === 'recent' && recentIds.length > 0 && (
              <ConfirmButton
                onConfirm={() => {
                  clearRecent();
                  toast('Historique effacé', 'info');
                }}
                confirmLabel="Confirmer ?"
              >
                Effacer l'historique
              </ConfirmButton>
            )}
          </div>

          <div id="resultats" className="flex flex-col gap-8 pb-10">
            {sections.length === 0 || visibleCount === 0 ? (
              <div className="rounded-2xl border border-dashed border-app-border bg-app-panel/40 p-8 text-center">
                <p className="text-[0.9rem] text-app-muted">{emptyMessage}</p>
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-app-accent/30 bg-app-accentSoft px-3.5 py-2 text-[0.78rem] font-semibold text-app-accent"
                  >
                    <RotateCcw size={12} aria-hidden />
                    Réinitialiser les filtres
                  </button>
                )}
              </div>
            ) : (
              sections.map(section => (
                <CategorySection
                  key={section.category}
                  title={section.category}
                  anchorId={view === 'all' ? `cat-${section.category}` : undefined}
                  items={section.items}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                  onOpen={handleOpenTool}
                  limit={view === 'all' ? 12 : 24}
                  revealAll={revealAll}
                  collapsible={view === 'all' && activeCategory === 'Toutes'}
                  collapsedCount={6}
                />
              ))
            )}
          </div>

          <footer className="border-t border-app-border py-6 text-center text-[0.8rem] text-app-dim">
            <p>
              By <span className="font-semibold text-app-muted">Zhétikal</span> — {TOTAL_TOOLS} outils référencés ·{' '}
              <span className="text-app-muted">Usage légal et éthique uniquement</span>
            </p>
            <p className="mt-1.5 text-[0.74rem]">
              Raccourcis : <kbd className="rounded border border-app-border bg-app-panel2 px-1.5 py-0.5 font-mono">/</kbd> rechercher ·{' '}
              <kbd className="rounded border border-app-border bg-app-panel2 px-1.5 py-0.5 font-mono">Échap</kbd> effacer
            </p>
          </footer>
        </main>
      </div>

      {/* Panneau catégories (mobile) */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-[55] bg-black/60 p-4 backdrop-blur-sm lg:hidden" onClick={() => setMobileNavOpen(false)}>
          <nav
            className="max-h-[80vh] overflow-y-auto custom-scroll rounded-2xl border border-app-border bg-app-panel p-4 shadow-pop"
            onClick={event => event.stopPropagation()}
            aria-label="Catégories"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[0.72rem] font-bold uppercase tracking-wider text-app-dim">Catégories</p>
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                className="rounded-lg p-1.5 text-app-dim hover:text-app-text"
                aria-label="Fermer"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex flex-col gap-0.5">
              <button
                type="button"
                onClick={() => {
                  setView('all');
                  setActiveCategory('Toutes');
                  setMobileNavOpen(false);
                }}
                className={`flex items-center rounded-xl px-3 py-2 text-[0.84rem] ${
                  view === 'all' && activeCategory === 'Toutes' ? 'bg-app-accentSoft text-app-accent' : 'text-app-muted'
                }`}
              >
                Toutes catégories
              </button>
              {categoriesForNav.map(({ category, count }) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setView('all');
                    setActiveCategory(category);
                    setMobileNavOpen(false);
                  }}
                  className={`flex items-center rounded-xl px-3 py-2 text-[0.84rem] ${
                    view === 'all' && activeCategory === category ? 'bg-app-accentSoft text-app-accent' : 'text-app-muted'
                  }`}
                >
                  <span className="truncate">{category}</span>
                  <span className="ml-auto text-[0.72rem] text-app-dim">{count}</span>
                </button>
              ))}
            </div>
            <div className="mt-3 flex gap-2 border-t border-app-border pt-3">
              <button
                type="button"
                onClick={() => switchView('favorites')}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-app-border px-3 py-2 text-[0.8rem] text-app-muted"
              >
                <Star size={13} aria-hidden /> Favoris ({favoriteIds.length})
              </button>
              <button
                type="button"
                onClick={() => switchView('recent')}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-app-border px-3 py-2 text-[0.8rem] text-app-muted"
              >
                <History size={13} aria-hidden /> Récents ({recentIds.length})
              </button>
            </div>
          </nav>
        </div>
      )}

      <RandomToolModal
        open={randomOpen}
        pool={randomPool}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onOpen={handleOpenTool}
        onClose={() => setRandomOpen(false)}
      />
      <SubmitToolModal open={submitOpen} categories={categoriesForNav.map(c => c.category)} onClose={() => setSubmitOpen(false)} />

      <ScrollTopButton />
      <Toasts />
    </div>
  );
}
