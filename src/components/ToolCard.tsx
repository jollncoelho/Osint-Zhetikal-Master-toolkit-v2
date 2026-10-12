import { memo, useState } from 'react';
import { Star, ExternalLink, Copy, Check, Terminal, Globe, Github, Lock, FileCode, Search, Zap } from 'lucide-react';
import { Tool, ToolKind, getDomain, getFaviconUrl, KIND_LABELS } from '../data/tools';
import { copyText } from '../utils/exportFavorites';
import { toast } from '../hooks/useToasts';

interface Props {
  tool: Tool;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpen: (tool: Tool) => void;
}

/** Icône associée au type de ressource. */
const KIND_ICON: Record<ToolKind, typeof Globe> = {
  web: Globe,
  github: Github,
  cse: Search,
  tor: Lock,
  docs: FileCode,
  api: Zap,
  startpage: Search,
};

const KIND_BADGE: Record<ToolKind, string> = {
  web: 'text-app-sky border-app-sky/30 bg-app-sky/10',
  github: 'text-app-violet border-app-violet/30 bg-app-violet/10',
  cse: 'text-app-emerald border-app-emerald/30 bg-app-emerald/10',
  tor: 'text-app-orange border-app-orange/30 bg-app-orange/10',
  docs: 'text-app-muted border-app-border bg-app-panel2',
  api: 'text-app-gold border-app-gold/30 bg-app-gold/10',
  startpage: 'text-app-muted border-app-border bg-app-panel2',
};

export const ToolCard = memo(function ToolCard({ tool, isFavorite, onToggleFavorite, onOpen }: Props) {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const domain = getDomain(tool.url);
  const isCLI = tool.tags.includes('cli');
  const isPaid = tool.tags.includes('paid');
  const KindIcon = KIND_ICON[tool.kind] ?? Globe;

  async function handleCopy() {
    const ok = await copyText(tool.url);
    if (ok) {
      setCopied(true);
      toast('Lien copié dans le presse-papiers', 'success');
      window.setTimeout(() => setCopied(false), 1500);
    } else {
      toast('Impossible de copier le lien', 'warning');
    }
  }

  return (
    <article className="group card-item relative flex flex-col rounded-2xl border border-app-border bg-gradient-to-b from-app-bgSoft to-app-panel p-4 min-h-[190px] transition-all duration-200 hover:-translate-y-1 hover:border-app-accent/60 hover:shadow-card">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-60 transition-opacity group-hover:opacity-100"
        style={{ background: 'var(--glow)' }}
      />

      {/* Lien principal : toute la carte est cliquable */}
      <a
        href={tool.url}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`Ouvrir ${tool.name} (nouvel onglet)`}
        className="absolute inset-0 z-[1] rounded-2xl"
        onClick={() => onOpen(tool)}
      />

      {/* Bouton favori */}
      <button
        type="button"
        onClick={() => onToggleFavorite(tool.id)}
        className={`absolute right-3 top-3 z-20 rounded-lg p-1.5 transition-all duration-150 ${
          isFavorite
            ? 'bg-app-gold/15 text-app-gold'
            : 'text-app-dim opacity-0 hover:bg-app-gold/15 hover:text-app-gold focus-visible:opacity-100 group-hover:opacity-100'
        }`}
        aria-pressed={isFavorite}
        aria-label={isFavorite ? `Retirer ${tool.name} des favoris` : `Ajouter ${tool.name} aux favoris`}
        title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      >
        <Star size={15} fill={isFavorite ? 'currentColor' : 'none'} />
      </button>

      <div className="relative z-[2] pointer-events-none flex flex-1 items-start gap-3">
        {/* Favicon */}
        <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-app-border bg-app-panel2">
          {!imgError ? (
            <img
              src={getFaviconUrl(tool.url, 64)}
              alt=""
              width={20}
              height={20}
              onError={() => setImgError(true)}
              className="h-5 w-5 object-contain"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span className="text-[0.8rem] font-bold text-app-accent">{tool.name.slice(0, 1).toUpperCase()}</span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 pr-6 text-[0.93rem] font-semibold leading-snug text-app-text" title={tool.name}>
            {tool.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-[0.81rem] leading-[1.45] text-app-muted">
            {tool.description}
          </p>

          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[0.66rem] font-bold ${KIND_BADGE[tool.kind]}`}
            >
              <KindIcon size={10} aria-hidden />
              {KIND_LABELS[tool.kind]}
            </span>
            {isCLI && (
              <span
                title="Outil en ligne de commande — nécessite un terminal"
                className="inline-flex items-center gap-1 rounded-md border border-app-sky/30 bg-app-sky/10 px-1.5 py-0.5 text-[0.66rem] font-bold text-app-sky"
              >
                <Terminal size={10} aria-hidden />
                CLI
              </span>
            )}
            {isPaid && (
              <span className="inline-flex items-center gap-1 rounded-md border border-app-orange/30 bg-app-orange/10 px-1.5 py-0.5 text-[0.66rem] font-bold text-app-orange">
                Payant
              </span>
            )}
          </div>

          <p className="mt-2 truncate font-mono text-[0.7rem] text-app-dim" title={domain}>
            {domain}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="relative z-20 mt-3 flex gap-2">
        <a
          href={tool.url}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 rounded-xl border border-app-border bg-app-accentSoft px-3 py-1.5 text-[0.77rem] font-medium text-app-accent transition-all duration-150 hover:border-app-accent/50 hover:brightness-110"
          onClick={() => onOpen(tool)}
        >
          <ExternalLink size={12} aria-hidden />
          Ouvrir
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-xl border border-app-border bg-app-panel2 px-3 py-1.5 text-[0.77rem] font-medium text-app-text transition-all duration-150 hover:border-app-accent/40"
        >
          {copied ? <Check size={12} className="text-app-emerald" aria-hidden /> : <Copy size={12} aria-hidden />}
          {copied ? 'Copié' : 'Copier'}
        </button>
      </div>
    </article>
  );
});
