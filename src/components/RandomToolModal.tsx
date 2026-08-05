import { useEffect, useMemo, useState } from 'react';
import { Star, ExternalLink, Copy, Check, X, Shuffle } from 'lucide-react';
import { Tool, getDomain } from '../data/tools';

interface Props {
  open: boolean;
  pool: Tool[];
  favorites: Set<string>;
  onToggleFavorite: (url: string) => void;
  onClose: () => void;
}

const TAG_STYLES: Record<string, string> = {
  free: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  paid: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
  cli: 'bg-sky-500/10 text-sky-400 border border-sky-500/20',
};

function pickRandom(pool: Tool[]): Tool | null {
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function RandomToolModal({ open, pool, favorites, onToggleFavorite, onClose }: Props) {
  const [tool, setTool] = useState<Tool | null>(null);
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (open) {
      setTool(pickRandom(pool));
      setCopied(false);
      setImgError(false);
    }
  }, [open, pool]);

  const domain = useMemo(() => (tool ? getDomain(tool.url) : ''), [tool]);
  const faviconUrl = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64` : '';
  const isFav = tool ? favorites.has(tool.url) : false;

  if (!open) return null;

  async function handleCopy() {
    if (!tool) return;
    try {
      await navigator.clipboard.writeText(tool.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-[fadeIn_0.15s_ease]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-gradient-to-b from-[#071321] to-[#06101f] border border-cyan-400/30 rounded-3xl p-6 shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-[#86a6be] hover:text-white hover:bg-white/5 transition-all"
          aria-label="Fermer"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 text-cyan-300 text-[0.78rem] font-bold tracking-[0.18em] uppercase mb-4">
          <Shuffle size={14} />
          Outil au hasard
        </div>

        {tool ? (
          <>
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#0a1930] border border-[#12304d] overflow-hidden flex items-center justify-center">
                {!imgError ? (
                  <img src={faviconUrl} alt="" width={24} height={24} onError={() => setImgError(true)} className="w-6 h-6 object-contain" />
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                )}
              </div>
              <div className="min-w-0 flex-1 pr-8">
                <h3 className="text-[#ecf7ff] font-bold text-lg leading-tight">{tool.name}</h3>
                <p className="mt-1.5 text-[#a9c7dc] text-[0.9rem] leading-relaxed">{tool.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {tool.tags.map(tag => (
                    <span key={tag} className={`text-[0.7rem] font-bold px-2 py-0.5 rounded-md ${TAG_STYLES[tag] ?? ''}`}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 bg-[#081426] border border-[#12304d] rounded-xl px-3 py-2">
              <ExternalLink size={13} className="text-cyan-400 flex-shrink-0" />
              <a href={tool.url} target="_blank" rel="noreferrer" className="text-cyan-300 text-[0.82rem] truncate hover:underline">
                {tool.url}
              </a>
            </div>

            <div className="flex gap-2 mt-4">
              <a
                href={tool.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[0.82rem] font-semibold bg-cyan-400 text-[#03131e] hover:bg-cyan-300 transition-all"
              >
                <ExternalLink size={14} />
                Ouvrir l'outil
              </a>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[0.82rem] font-semibold bg-[#0a1930] text-[#d8efff] border border-[#12304d] hover:border-cyan-400/40 transition-all"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copied ? 'Copié' : 'Copier'}
              </button>
              <button
                onClick={() => onToggleFavorite(tool.url)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[0.82rem] font-semibold border transition-all ${
                  isFav
                    ? 'bg-amber-400/15 text-amber-400 border-amber-400/40'
                    : 'bg-[#0a1930] text-[#d8efff] border-[#12304d] hover:border-amber-400/40 hover:text-amber-400'
                }`}
              >
                <Star size={14} fill={isFav ? 'currentColor' : 'none'} />
                {isFav ? 'Favori' : 'Ajouter'}
              </button>
              <button
                onClick={() => { setTool(pickRandom(pool)); setCopied(false); setImgError(false); }}
                className="ml-auto flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[0.82rem] font-semibold bg-[#0a1930] text-cyan-300 border border-[#12304d] hover:border-cyan-400/40 transition-all"
              >
                <Shuffle size={14} />
                Autre
              </button>
            </div>
          </>
        ) : (
          <p className="text-[#86a6be] text-center py-6">Aucun outil disponible.</p>
        )}
      </div>
    </div>
  );
}
