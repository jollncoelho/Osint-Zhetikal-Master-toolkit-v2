import { useState, memo } from 'react';
import { Star, ExternalLink, Copy, Check } from 'lucide-react';
import { Tool, getDomain } from '../data/tools';

interface Props {
  tool: Tool;
  isFavorite: boolean;
  onToggleFavorite: (url: string) => void;
}

const TAG_STYLES: Record<string, string> = {
  free: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  paid: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
  cli: 'bg-sky-500/10 text-sky-400 border border-sky-500/20',
};

export const ToolCard = memo(function ToolCard({ tool, isFavorite, onToggleFavorite }: Props) {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);
  const domain = getDomain(tool.url);
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  async function handleCopy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(tool.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  function handleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(tool.url);
  }

  return (
    <div className="group card-item relative flex flex-col bg-gradient-to-b from-[#06101f]/98 to-[#08182c]/98 border border-[#12304d] rounded-2xl p-4 transition-all duration-200 hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-[0_16px_32px_rgba(0,0,0,0.35),0_0_0_1px_rgba(34,211,238,0.08)] overflow-hidden min-h-[180px]">
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_40%)] group-hover:opacity-100 opacity-60 transition-opacity" />

      {/* Favorite button */}
      <button
        onClick={handleFavorite}
        className={`absolute top-3 right-3 z-10 p-1.5 rounded-lg transition-all duration-150 ${
          isFavorite
            ? 'text-amber-400 bg-amber-400/10'
            : 'text-[#86a6be] hover:text-amber-400 hover:bg-amber-400/10 opacity-0 group-hover:opacity-100'
        }`}
        aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      >
        <Star size={14} fill={isFavorite ? 'currentColor' : 'none'} />
      </button>

      <div className="relative z-10 flex gap-3 items-start flex-1">
        {/* Favicon */}
        <div className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-[#0a1930] border border-[#12304d] overflow-hidden flex items-center justify-center">
          {!imgError ? (
            <img
              src={faviconUrl}
              alt=""
              width={20}
              height={20}
              onError={() => setImgError(true)}
              className="w-5 h-5 object-contain"
              loading="lazy"
            />
          ) : (
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-[#ecf7ff] font-semibold text-[0.95rem] leading-tight pr-6 truncate">
            {tool.name}
          </h3>
          <p className="mt-1.5 text-[#86a6be] text-[0.83rem] leading-[1.45] line-clamp-2">
            {tool.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {tool.tags.map(tag => (
              <span key={tag} className={`text-[0.68rem] font-bold px-2 py-0.5 rounded-md ${TAG_STYLES[tag] ?? ''}`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="relative z-10 flex gap-2 mt-3">
        <a
          href={tool.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[0.78rem] font-medium bg-cyan-400/12 text-cyan-300 border border-[#12304d] hover:bg-cyan-400/20 hover:border-cyan-400/50 transition-all duration-150"
          onClick={e => e.stopPropagation()}
        >
          <ExternalLink size={12} />
          Ouvrir
        </a>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[0.78rem] font-medium bg-[#0a1930] text-[#d8efff] border border-[#12304d] hover:border-cyan-400/40 hover:text-white transition-all duration-150"
        >
          {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
          {copied ? 'Copié' : 'Copier'}
        </button>
      </div>
    </div>
  );
});
