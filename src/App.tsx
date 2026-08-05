import { useState, useMemo, useCallback } from 'react';
import { Search, Star, LayoutGrid, Shield, Home, Shuffle, Github, FileJson, FileText } from 'lucide-react';
import { toolkitRaw, normalizeToolkit, ToolCategory, Tool } from './data/tools';
import { CategorySection } from './components/CategorySection';
import { RandomToolModal } from './components/RandomToolModal';
import { SubmitToolModal } from './components/SubmitToolModal';
import { useFavorites } from './hooks/useFavorites';
import { favoritesToJSON, favoritesToMarkdown, downloadFile, collectFavoriteTools } from './utils/exportFavorites';

const toolkit = normalizeToolkit(toolkitRaw);
const ALL_CATEGORIES = ['Toutes', ...toolkit.map(s => s.category)];
const TOTAL = toolkit.reduce((sum, s) => sum + s.items.length, 0);
const ALL_TAGS = ['free', 'paid', 'cli'];
const ALL_TOOLS: Tool[] = toolkit.flatMap(s => s.items);

type View = 'all' | 'favorites';

const TAG_LABELS: Record<string, string> = {
  free: 'Gratuit',
  paid: 'Payant',
  cli: 'CLI',
};

const TAG_STYLES: Record<string, { active: string; idle: string }> = {
  free: { active: 'bg-emerald-400 text-[#03131e] border-emerald-400', idle: 'bg-emerald-500/8 text-emerald-300 border-emerald-500/25 hover:border-emerald-400/60' },
  paid: { active: 'bg-orange-400 text-[#03131e] border-orange-400', idle: 'bg-orange-500/8 text-orange-300 border-orange-500/25 hover:border-orange-400/60' },
  cli: { active: 'bg-sky-400 text-[#03131e] border-sky-400', idle: 'bg-sky-500/8 text-sky-300 border-sky-500/25 hover:border-sky-400/60' },
};

export default function App() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Toutes');
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [onlyFree, setOnlyFree] = useState(false);
  const [view, setView] = useState<View>('all');
  const [randomOpen, setRandomOpen] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);
  const { favorites, toggle } = useFavorites();

  const toggleTag = useCallback((tag: string) => {
    setActiveTags(prev => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }, []);

  const filtered = useMemo<ToolCategory[]>(() => {
    const q = search.trim().toLowerCase();

    return toolkit
      .map(section => {
        const matchCat = activeCategory === 'Toutes' || section.category === activeCategory;
        if (!matchCat && view !== 'favorites') return { ...section, items: [] as Tool[] };

        const items = section.items.filter(item => {
          if (view === 'favorites' && !favorites.has(item.url)) return false;
          if (onlyFree && !item.tags.includes('free')) return false;
          if (activeTags.size > 0) {
            const hasAll = [...activeTags].every(t => item.tags.includes(t as 'free' | 'paid' | 'cli'));
            if (!hasAll) return false;
          }
          if (!q) return true;
          return `${item.name} ${item.description} ${section.category} ${item.tags.join(' ')}`.toLowerCase().includes(q);
        });
        return { ...section, items };
      })
      .filter(s => s.items.length > 0);
  }, [search, activeCategory, activeTags, onlyFree, view, favorites]);

  const visibleCount = useMemo(() => filtered.reduce((s, c) => s + c.items.length, 0), [filtered]);
  const favTools = useMemo(() => collectFavoriteTools(toolkit, favorites), [favorites]);

  const handleExport = useCallback((format: 'json' | 'md') => {
    if (favTools.length === 0) return;
    if (format === 'json') {
      downloadFile('zhetikal-favoris.json', favoritesToJSON(favTools), 'application/json');
    } else {
      downloadFile('zhetikal-favoris.md', favoritesToMarkdown(favTools), 'text/markdown');
    }
  }, [favTools]);

  const switchView = useCallback((v: View) => {
    setView(v);
    if (v === 'favorites') setActiveCategory('Toutes');
  }, []);

  return (
    <div className="min-h-screen bg-[#020817] text-[#ecf7ff] font-sans">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-6">

        {/* Top bar: home + header actions */}
        <div className="flex flex-wrap justify-between items-center gap-3 mb-3">
          <a
            href="https://prohacking77.me"
            target="_blank"
            rel="noreferrer"
            title="Retour à l'accueil"
            className="group flex items-center gap-2 bg-[#081426] border border-[#12304d] hover:border-cyan-400/50 hover:bg-cyan-400/8 text-[#86a6be] hover:text-cyan-300 rounded-xl px-3 py-2 transition-all duration-200"
          >
            <Home size={15} />
            <span className="text-[0.78rem] font-medium">prohacking77.me</span>
          </a>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setRandomOpen(true)}
              className="flex items-center gap-1.5 bg-[#081426] border border-[#12304d] hover:border-cyan-400/50 text-[#d7f5ff] hover:text-cyan-300 rounded-xl px-3 py-2 text-[0.78rem] font-semibold transition-all duration-200"
            >
              <Shuffle size={14} />
              Outil au hasard
            </button>
            <button
              onClick={() => setSubmitOpen(true)}
              className="flex items-center gap-1.5 bg-[#081426] border border-[#12304d] hover:border-cyan-400/50 text-[#d7f5ff] hover:text-cyan-300 rounded-xl px-3 py-2 text-[0.78rem] font-semibold transition-all duration-200"
            >
              <Github size={14} />
              Proposer un outil
            </button>
            <button
              onClick={() => switchView('favorites')}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-[0.78rem] font-semibold border transition-all duration-200 ${
                view === 'favorites'
                  ? 'bg-amber-400 text-[#03131e] border-amber-400'
                  : 'bg-[#081426] border-[#12304d] text-[#d7f5ff] hover:border-amber-400/50 hover:text-amber-300'
              }`}
            >
              <Star size={14} fill={view === 'favorites' ? 'currentColor' : 'none'} />
              Favoris
              {favorites.size > 0 && (
                <span className={`ml-0.5 text-[0.68rem] font-bold rounded-full px-1.5 py-0.5 ${view === 'favorites' ? 'bg-[#03131e]/20 text-[#03131e]' : 'bg-amber-400/15 text-amber-300'}`}>
                  {favorites.size}
                </span>
              )}
            </button>
            <button
              onClick={() => switchView('all')}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-[0.78rem] font-semibold border transition-all duration-200 ${
                view === 'all'
                  ? 'bg-cyan-400 text-[#03131e] border-cyan-400'
                  : 'bg-[#081426] border-[#12304d] text-[#d7f5ff] hover:border-cyan-400/50 hover:text-cyan-300'
              }`}
            >
              <LayoutGrid size={14} />
              Tous
            </button>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-b from-[#071321] to-[#06101f] border border-[#12304d] rounded-[24px] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.28)] mb-7">

          {/* Top row */}
          <div className="flex flex-wrap justify-between gap-4 items-start">
            <div className="flex gap-4 items-center">
              <div className="w-14 h-14 flex-shrink-0 rounded-2xl bg-gradient-to-br from-[#1ec9ff] to-[#4de2c0] text-[#02111d] text-2xl font-black grid place-items-center shadow-lg">
                Z7
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight">
                  Osint Zhetikal Master-toolkit-v2
                </h1>
                <div className="mt-1 text-[#86a6be] text-[0.82rem] tracking-wider">
                  ZHETIKAL · GHOSTINT-TOOLS · FULL EDITION · COMMUNITY EDITION
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-2 flex-wrap">
              <div className="flex items-center gap-2 bg-[#0a1930] border border-[#12304d] text-[#c7eaff] rounded-full px-3.5 py-2 text-[0.82rem]">
                <Shield size={13} className="text-cyan-400" />
                Total : <span className="font-bold text-cyan-300">{TOTAL}</span>
              </div>
              <div className="flex items-center gap-2 bg-[#0a1930] border border-[#12304d] text-[#c7eaff] rounded-full px-3.5 py-2 text-[0.82rem]">
                <LayoutGrid size={13} className="text-emerald-400" />
                Visible : <span className="font-bold text-emerald-300">{visibleCount}</span>
              </div>
              {favorites.size > 0 && (
                <div className="flex items-center gap-2 bg-[#0a1930] border border-[#12304d] text-[#c7eaff] rounded-full px-3.5 py-2 text-[0.82rem]">
                  <Star size={13} className="text-amber-400" fill="currentColor" />
                  Favoris : <span className="font-bold text-amber-300">{favorites.size}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick links */}
          {view === 'all' && (
            <div className="flex flex-wrap gap-2 mt-4">
              {['Outils IA', 'Géolocalisation', 'Telegram OSINT', 'Breaches & Leaks', 'Ressources'].map(cat => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); }}
                  className="bg-[#081426] border border-[#12304d] hover:border-cyan-400/40 text-[#d7f5ff] rounded-full px-3.5 py-2 text-[0.8rem] transition-all duration-150 hover:text-cyan-300"
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Favorites export bar */}
          {view === 'favorites' && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-[#a9c7dc] text-[0.82rem] font-semibold mr-1">Exporter mes favoris :</span>
              <button
                onClick={() => handleExport('json')}
                disabled={favTools.length === 0}
                className="flex items-center gap-1.5 bg-[#081426] border border-[#12304d] hover:border-cyan-400/40 text-cyan-300 rounded-full px-3.5 py-2 text-[0.8rem] font-semibold transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <FileJson size={13} />
                JSON
              </button>
              <button
                onClick={() => handleExport('md')}
                disabled={favTools.length === 0}
                className="flex items-center gap-1.5 bg-[#081426] border border-[#12304d] hover:border-cyan-400/40 text-emerald-300 rounded-full px-3.5 py-2 text-[0.8rem] font-semibold transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <FileText size={13} />
                Markdown
              </button>
              {favTools.length > 0 && (
                <span className="text-[#6f90aa] text-[0.76rem] ml-1">{favTools.length} outil(s) exporté(s)</span>
              )}
            </div>
          )}

          {/* Search + free toggle */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6f90aa] pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher un outil..."
                className="w-full pl-10 pr-4 py-3 bg-[#081426] border border-[#12304d] rounded-2xl text-[#ecf7ff] placeholder-[#6f90aa] text-[0.92rem] outline-none focus:border-cyan-400/40 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.06)] transition-all duration-150"
              />
            </div>

            <button
              onClick={() => setOnlyFree(v => !v)}
              className={`flex items-center gap-1.5 px-4 py-3 rounded-2xl border text-[0.82rem] font-bold whitespace-nowrap transition-all duration-150 ${
                onlyFree
                  ? 'bg-emerald-400 text-[#03131e] border-emerald-400'
                  : 'bg-[#081426] border-[#12304d] text-emerald-300 hover:border-emerald-400/50'
              }`}
            >
              <Star size={14} fill={onlyFree ? 'currentColor' : 'none'} />
              100% Gratuit
            </button>
          </div>

          {/* Tag filters */}
          <div className="flex flex-wrap gap-2 mt-3">
            {ALL_TAGS.map(tag => {
              const active = activeTags.has(tag);
              const s = TAG_STYLES[tag];
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full border text-[0.74rem] font-bold transition-all duration-150 ${active ? s.active : s.idle}`}
                >
                  {TAG_LABELS[tag]}
                </button>
              );
            })}
            {activeTags.size > 0 && (
              <button
                onClick={() => setActiveTags(new Set())}
                className="px-3 py-1.5 rounded-full border border-[#12304d] text-[#86a6be] hover:text-white text-[0.74rem] font-semibold transition-all"
              >
                Réinitialiser
              </button>
            )}
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mt-3 max-h-[120px] overflow-y-auto custom-scroll">
            {ALL_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full border text-[0.72rem] font-semibold transition-all duration-150 whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-cyan-400 text-[#03131e] border-cyan-400'
                    : 'bg-[#081426] border-[#12304d] text-[#d4eefb] hover:border-cyan-400/40 hover:text-cyan-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sections */}
        {filtered.length === 0 ? (
          <div className="mt-6 bg-[#06101f] border border-dashed border-[#12304d] rounded-2xl p-8 text-center text-[#86a6be]">
            {view === 'favorites'
              ? 'Aucun favori pour le moment. Cliquez sur l\'étoile sur une carte d\'outil pour l\'ajouter à vos favoris.'
              : 'Aucun outil trouvé avec cette recherche.'}
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {filtered.map(section => (
              <CategorySection
                key={section.category}
                section={section}
                favorites={favorites}
                onToggleFavorite={toggle}
              />
            ))}
          </div>
        )}

        <div className="mt-8 text-center text-[#6f90aa] text-[0.82rem] pb-6">
          By: Zhétikal — Cliquez sur une carte pour ouvrir l'outil.
        </div>
      </div>

      <RandomToolModal
        open={randomOpen}
        pool={ALL_TOOLS}
        favorites={favorites}
        onToggleFavorite={toggle}
        onClose={() => setRandomOpen(false)}
      />
      <SubmitToolModal
        open={submitOpen}
        categories={toolkit.map(s => s.category)}
        onClose={() => setSubmitOpen(false)}
      />
    </div>
  );
}
