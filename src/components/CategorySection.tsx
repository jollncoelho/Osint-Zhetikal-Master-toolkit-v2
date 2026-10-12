import { memo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ToolCard } from './ToolCard';
import { Tool } from '../data/tools';

interface Props {
  title: string;
  items: Tool[];
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  onOpen: (tool: Tool) => void;
  /** Nombre de cartes affichées avant de proposer « voir plus ». */
  limit?: number;
  /** Quand vrai, toutes les cartes sont affichées (bouton « tout déplier »). */
  revealAll?: boolean;
  /** Identifiant d'ancre pour la navigation depuis la barre latérale. */
  anchorId?: string;
  /** Rend la section repliable (mode « Toutes les catégories »). */
  collapsible?: boolean;
  /** Nombre de cartes affichées en mode replié. */
  collapsedCount?: number;
}

export const CategorySection = memo(function CategorySection({
  title,
  items,
  favorites,
  onToggleFavorite,
  onOpen,
  limit = 12,
  revealAll = false,
  anchorId,
  collapsible = false,
  collapsedCount = 4,
}: Props) {
  const [localOpen, setLocalOpen] = useState(false);
  const [sectionOpen, setSectionOpen] = useState(true);

  const effectiveLimit = collapsible && !sectionOpen ? collapsedCount : limit;
  const showAll = revealAll || localOpen;
  const visible = showAll ? items : items.slice(0, effectiveLimit);
  const hidden = items.length - visible.length;

  return (
    <section id={anchorId} className="scroll-mt-28">
      <div className="mb-3.5 flex items-center justify-between gap-4 border-b border-app-border pb-2.5">
        <button
          type="button"
          onClick={() => collapsible && setSectionOpen(v => !v)}
          className={`flex items-center gap-2 text-left ${collapsible ? 'cursor-pointer' : 'cursor-default'}`}
          aria-expanded={collapsible ? sectionOpen : undefined}
        >
          {collapsible && (
            <ChevronDown
              size={15}
              aria-hidden
              className={`text-app-dim transition-transform duration-200 ${sectionOpen ? '' : '-rotate-90'}`}
            />
          )}
          <h2 className="text-[0.82rem] font-bold uppercase tracking-[0.16em] text-app-accent">{title}</h2>
        </button>
        <span className="rounded-full border border-app-border bg-app-panel2 px-2.5 py-1 text-[0.72rem] text-app-muted">
          {items.length}
        </span>
      </div>

      {sectionOpen && (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 min-[1440px]:grid-cols-4">
            {visible.map(tool => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isFavorite={favorites.has(tool.id)}
                onToggleFavorite={onToggleFavorite}
                onOpen={onOpen}
              />
            ))}
          </div>

          {!showAll && hidden > 0 && (
            <button
              type="button"
              onClick={() => setLocalOpen(true)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-app-border bg-app-panel/40 py-2.5 text-[0.8rem] font-semibold text-app-muted transition-colors hover:border-app-accent/50 hover:text-app-accent"
            >
              <ChevronDown size={14} aria-hidden />
              Afficher {hidden} outil{hidden > 1 ? 's' : ''} supplémentaire{hidden > 1 ? 's' : ''}
            </button>
          )}
        </>
      )}
    </section>
  );
});
