import { memo } from 'react';
import { ToolCard } from './ToolCard';
import { ToolCategory } from '../data/tools';

interface Props {
  section: ToolCategory;
  favorites: Set<string>;
  onToggleFavorite: (url: string) => void;
}

export const CategorySection = memo(function CategorySection({ section, favorites, onToggleFavorite }: Props) {
  return (
    <section>
      <div className="flex items-center justify-between gap-4 border-b border-[#12304d] pb-2.5 mb-3.5">
        <h2 className="text-[0.82rem] font-bold tracking-[0.16em] uppercase text-cyan-300/90">
          {section.category}
        </h2>
        <span className="text-[0.72rem] bg-[#0a1930] border border-[#12304d] text-[#d8efff] rounded-full px-2.5 py-1">
          {section.items.length}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {section.items.map(tool => (
          <ToolCard
            key={tool.url}
            tool={tool}
            isFavorite={favorites.has(tool.url)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </section>
  );
});
