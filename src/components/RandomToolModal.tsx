import { useEffect, useState } from 'react';
import { Star, ExternalLink, Copy, Check, X, Shuffle } from 'lucide-react';
import { Tool, getFaviconUrl, KIND_LABELS } from '../data/tools';
import { copyText } from '../utils/exportFavorites';
import { toast } from '../hooks/useToasts';

interface Props {
  open: boolean;
  pool: Tool[];
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  onOpen: (tool: Tool) => void;
  onClose: () => void;
}

function pickRandom(pool: Tool[], excludeId?: string): Tool | null {
  if (pool.length === 0) return null;
  if (pool.length === 1) return pool[0];
  let candidate = pool[Math.floor(Math.random() * pool.length)];
  let guard = 0;
  while (candidate.id === excludeId && guard < 12) {
    candidate = pool[Math.floor(Math.random() * pool.length)];
    guard++;
  }
  return candidate;
}

export function RandomToolModal({ open, pool, favorites, onToggleFavorite, onOpen, onClose }: Props) {
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

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const isFav = tool ? favorites.has(tool.id) : false;

  if (!open) return null;

  async function handleCopy() {
    if (!tool) return;
    const ok = await copyText(tool.url);
    setCopied(ok);
    toast(ok ? 'Lien copié' : 'Impossible de copier', ok ? 'success' : 'warning');
    if (ok) window.setTimeout(() => setCopied(false), 1500);
  }

  function drawAnother() {
    setTool(prev => pickRandom(pool, prev?.id));
    setCopied(false);
    setImgError(false);
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-lg rounded-3xl border border-app-accent/30 bg-app-panel p-6 shadow-pop animate-slideUp"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Outil au hasard"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-xl p-2 text-app-muted transition-all hover:bg-app-panel2 hover:text-app-text"
          aria-label="Fermer"
        >
          <X size={18} />
        </button>

        <div className="mb-4 flex items-center gap-2 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-app-accent">
          <Shuffle size={14} aria-hidden />
          Outil au hasard
          {pool.length > 0 && <span className="font-normal normal-case tracking-normal text-app-dim">({pool.length} dans la sélection)</span>}
        </div>

        {tool ? (
          <>
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-app-border bg-app-panel2">
                {!imgError ? (
                  <img
                    src={getFaviconUrl(tool.url, 64)}
                    alt=""
                    width={24}
                    height={24}
                    onError={() => setImgError(true)}
                    className="h-6 w-6 object-contain"
                  />
                ) : (
                  <span className="font-bold text-app-accent">{tool.name.slice(0, 1).toUpperCase()}</span>
                )}
              </div>
              <div className="min-w-0 flex-1 pr-8">
                <h3 className="text-lg font-bold leading-tight text-app-text">{tool.name}</h3>
                <p className="mt-1.5 text-[0.9rem] leading-relaxed text-app-muted">{tool.description}</p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  <span className="rounded-md border border-app-border bg-app-panel2 px-2 py-0.5 text-[0.68rem] font-bold text-app-muted">
                    {KIND_LABELS[tool.kind]}
                  </span>
                  {tool.action && (
                    <span className="rounded-md border border-app-accent/30 bg-app-accentSoft px-2 py-0.5 text-[0.68rem] font-bold text-app-accent">
                      {tool.action}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl border border-app-border bg-app-panel2 px-3 py-2">
              <ExternalLink size={13} className="flex-shrink-0 text-app-accent" aria-hidden />
              <a href={tool.url} target="_blank" rel="noreferrer noopener" className="truncate text-[0.82rem] text-app-accent hover:underline">
                {tool.url}
              </a>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={tool.url}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => onOpen(tool)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-app-accent px-4 py-2.5 text-[0.82rem] font-semibold text-app-accentInk transition-all hover:brightness-110"
              >
                <ExternalLink size={14} aria-hidden />
                Ouvrir l'outil
              </a>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-xl border border-app-border bg-app-panel2 px-4 py-2.5 text-[0.82rem] font-semibold text-app-text transition-all hover:border-app-accent/40"
              >
                {copied ? <Check size={14} className="text-app-emerald" aria-hidden /> : <Copy size={14} aria-hidden />}
                {copied ? 'Copié' : 'Copier'}
              </button>
              <button
                type="button"
                onClick={() => onToggleFavorite(tool.id)}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-[0.82rem] font-semibold transition-all ${
                  isFav
                    ? 'border-app-gold/40 bg-app-gold/15 text-app-gold'
                    : 'border-app-border bg-app-panel2 text-app-text hover:border-app-gold/40 hover:text-app-gold'
                }`}
                aria-pressed={isFav}
              >
                <Star size={14} fill={isFav ? 'currentColor' : 'none'} aria-hidden />
                {isFav ? 'Favori' : 'Ajouter'}
              </button>
              <button
                type="button"
                onClick={drawAnother}
                className="ml-auto inline-flex items-center gap-1.5 rounded-xl border border-app-border bg-app-panel2 px-4 py-2.5 text-[0.82rem] font-semibold text-app-accent transition-all hover:border-app-accent/40"
              >
                <Shuffle size={14} aria-hidden />
                Autre
              </button>
            </div>
          </>
        ) : (
          <p className="py-6 text-center text-app-muted">
            Aucun outil disponible pour cette sélection. Élargissez vos filtres.
          </p>
        )}
      </div>
    </div>
  );
}
