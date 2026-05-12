import { useState, useMemo, useCallback } from 'react';
import { Search, Star, Clock, LayoutGrid, Shield } from 'lucide-react';
import { toolkitRaw, normalizeToolkit, ToolCategory } from './data/tools';
import { CategorySection } from './components/CategorySection';
import { useFavorites } from './hooks/useFavorites';

const toolkit = normalizeToolkit(toolkitRaw);
const ALL_CATEGORIES = ['Toutes', ...toolkit.map(s => s.category)];
const TOTAL = toolkit.reduce((sum, s) => sum + s.items.length, 0);

type SortMode = 'default' | 'newest' | 'favorites';

const SORT_OPTIONS: { value: SortMode; label: string; icon: React.ReactNode }[] = [
  { value: 'default', label: 'A–Z', icon: <LayoutGrid size={13} /> },
  { value: 'newest', label: 'Nouveauté', icon: <Clock size={13} /> },
  { value: 'favorites', label: 'Favoris', icon: <Star size={13} /> },
];

export default function App() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Toutes');
  const [sortMode, setSortMode] = useState<SortMode>('default');
  const { favorites, toggle, isFavorite } = useFavorites();

  const filtered = useMemo<ToolCategory[]>(() => {
    const q = search.trim().toLowerCase();

    let sections = toolkit
      .map(section => {
        const items = section.items.filter(item => {
          const matchCat = activeCategory === 'Toutes' || section.category === activeCategory;
          if (!matchCat) return false;
          if (!q) return true;
          return `${item.name} ${item.description} ${section.category} ${item.tags.join(' ')}`.toLowerCase().includes(q);
        });
        return { ...section, items };
      })
      .filter(s => s.items.length > 0);

    if (sortMode === 'favorites') {
      sections = sections
        .map(s => ({ ...s, items: s.items.filter(i => favorites.has(i.url)) }))
        .filter(s => s.items.length > 0);
    }

    return sections;
  }, [search, activeCategory, sortMode, favorites]);

  const visibleCount = useMemo(() => filtered.reduce((s, c) => s + c.items.length, 0), [filtered]);

  const handleCategoryClick = useCallback((cat: string) => {
    setActiveCategory(cat);
  }, []);

  return (
    <div className="min-h-screen bg-[#020817] text-[#ecf7ff] font-sans">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-6">

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
          <div className="flex flex-wrap gap-2 mt-4">
            {['Outils IA', 'Géolocalisation', 'Telegram OSINT', 'Breaches & Leaks', 'Ressources'].map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setSortMode('default'); }}
                className="bg-[#081426] border border-[#12304d] hover:border-cyan-400/40 text-[#d7f5ff] rounded-full px-3.5 py-2 text-[0.8rem] transition-all duration-150 hover:text-cyan-300"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search + sort */}
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

            {/* Sort buttons */}
            <div className="flex gap-2">
              {SORT_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setSortMode(opt.value)}
                  className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl border text-[0.78rem] font-semibold transition-all duration-150 whitespace-nowrap ${
                    sortMode === opt.value
                      ? 'bg-cyan-400 text-[#03131e] border-cyan-400'
                      : 'bg-[#081426] border-[#12304d] text-[#d4eefb] hover:border-cyan-400/40'
                  }`}
                >
                  {opt.icon}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mt-3 max-h-[120px] overflow-y-auto custom-scroll">
            {ALL_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
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
            {sortMode === 'favorites'
              ? 'Aucun favori pour le moment. Cliquez sur ⭐ sur une carte pour en ajouter.'
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
    </div>
  );
}
