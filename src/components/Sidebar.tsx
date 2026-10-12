import { memo } from 'react';
import { LayoutGrid, Star, History, Layers } from 'lucide-react';
import { TOTAL_TOOLS } from '../data/tools';

export type View = 'all' | 'favorites' | 'recent';

interface Props {
  categories: { category: string; count: number }[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  view: View;
  onSelectView: (view: View) => void;
  favoritesCount: number;
  recentCount: number;
}

export const Sidebar = memo(function Sidebar({
  categories,
  activeCategory,
  onSelectCategory,
  view,
  onSelectView,
  favoritesCount,
  recentCount,
}: Props) {
  const navItem = (active: boolean) =>
    `flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-[0.82rem] font-medium transition-colors ${
      active
        ? 'bg-app-accentSoft text-app-accent'
        : 'text-app-muted hover:bg-app-panel2 hover:text-app-text'
    }`;

  return (
    <aside className="sticky top-4 hidden max-h-[calc(100vh-2rem)] w-64 flex-shrink-0 flex-col overflow-hidden rounded-2xl border border-app-border bg-app-panel/70 lg:flex">
      <div className="flex items-center gap-3 border-b border-app-border p-4">
        <img src="/logo.svg" alt="" aria-hidden width={40} height={40} className="h-10 w-10 flex-shrink-0" />
        <div className="min-w-0">
          <p className="truncate text-[0.86rem] font-bold text-app-text">Zhetikal Toolkit</p>
          <p className="text-[0.7rem] text-app-dim">{TOTAL_TOOLS} outils OSINT</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto custom-scroll p-3" aria-label="Navigation principale">
        <div className="mb-3 flex flex-col gap-1">
          <button type="button" onClick={() => onSelectView('all')} className={navItem(view === 'all')} aria-current={view === 'all'}>
            <LayoutGrid size={15} aria-hidden />
            Tous les outils
            <span className="ml-auto text-[0.7rem] text-app-dim">{TOTAL_TOOLS}</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectView('favorites')}
            className={navItem(view === 'favorites')}
            aria-current={view === 'favorites'}
          >
            <Star size={15} aria-hidden />
            Favoris
            <span className="ml-auto text-[0.7rem] text-app-dim">{favoritesCount}</span>
          </button>
          <button type="button" onClick={() => onSelectView('recent')} className={navItem(view === 'recent')} aria-current={view === 'recent'}>
            <History size={15} aria-hidden />
            Récents
            <span className="ml-auto text-[0.7rem] text-app-dim">{recentCount}</span>
          </button>
        </div>

        <div className="mb-2 flex items-center gap-2 px-3 pt-1">
          <Layers size={13} className="text-app-dim" aria-hidden />
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-app-dim">Catégories</p>
        </div>

        <div className="flex flex-col gap-0.5">
          <button
            type="button"
            onClick={() => {
              onSelectView('all');
              onSelectCategory('Toutes');
            }}
            className={navItem(view === 'all' && activeCategory === 'Toutes')}
          >
            <span className="truncate">Toutes catégories</span>
          </button>
          {categories.map(({ category, count }) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                onSelectView('all');
                onSelectCategory(category);
              }}
              className={navItem(view === 'all' && activeCategory === category)}
            >
              <span className="truncate">{category}</span>
              <span className="ml-auto flex-shrink-0 text-[0.7rem] text-app-dim">{count}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="border-t border-app-border p-3">
        <p className="px-1 text-[0.68rem] leading-relaxed text-app-dim">
          Usage légal et éthique uniquement. Respectez la vie privée et les lois en vigueur.
        </p>
      </div>
    </aside>
  );
});
