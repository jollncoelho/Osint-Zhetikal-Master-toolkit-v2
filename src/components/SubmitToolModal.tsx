import { useEffect, useState } from 'react';
import { X, Github, ExternalLink, AlertCircle } from 'lucide-react';

interface Props {
  open: boolean;
  categories: string[];
  onClose: () => void;
}

/** Dépôt qui reçoit les propositions d'outils. */
const REPO_ISSUES_URL =
  'https://github.com/jollncoelho/Osint-Zhetikal-Master-toolkit-v2/issues/new';

const inputCls =
  'w-full rounded-xl border border-app-border bg-app-panel2 px-3.5 py-2.5 text-[0.88rem] text-app-text placeholder:text-app-dim outline-none transition-all focus:border-app-accent/50';

export function SubmitToolModal({ open, categories, onClose }: Props) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState(categories[0] ?? '');
  const [description, setDescription] = useState('');
  const [pricing, setPricing] = useState<'free' | 'paid'>('free');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const urlValid = /^https?:\/\/\S+\.\S+/.test(url.trim());
  const canSubmit = name.trim().length > 1 && urlValid;

  const body = [
    `### Proposition d'outil OSINT`,
    ``,
    `**Nom de l'outil :** ${name.trim()}`,
    `**URL :** ${url.trim()}`,
    `**Catégorie :** ${category}`,
    `**Type :** ${pricing === 'free' ? '100% Gratuit' : 'Payant / Freemium'}`,
    ``,
    `**Description :**`,
    description.trim() || '_Non renseignée_',
    ``,
    `> Proposé via le Zhetikal OSINT Master-Toolkit.`,
  ].join('\n');

  const issueUrl = `${REPO_ISSUES_URL}?title=${encodeURIComponent(
    `[Outil] ${name.trim() || 'Nouvel outil'}`
  )}&body=${encodeURIComponent(body)}&labels=${encodeURIComponent('nouvel outil')}`;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto custom-scroll rounded-3xl border border-app-accent/30 bg-app-panel p-6 shadow-pop animate-slideUp"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Proposer un outil"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-xl p-2 text-app-muted transition-all hover:bg-app-panel2 hover:text-app-text"
          aria-label="Fermer"
        >
          <X size={18} />
        </button>

        <div className="mb-1 flex items-center gap-2 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-app-accent">
          <Github size={14} aria-hidden />
          Proposer un outil
        </div>
        <p className="mb-4 text-[0.82rem] text-app-muted">
          Remplissez le formulaire : un lien pré-rempli vers une issue GitHub sera généré pour soumettre votre proposition à la
          communauté.
        </p>

        <div className="flex flex-col gap-3">
          <Field label="Nom de l'outil" required>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ex : Sherlock"
              className={inputCls}
              autoComplete="off"
            />
          </Field>

          <Field label="URL" required>
            <input
              value={url}
              onChange={e => setUrl(e.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="https://..."
              className={inputCls}
              inputMode="url"
              autoComplete="off"
            />
          </Field>
          {touched && url && !urlValid && (
            <p className="flex items-center gap-1.5 text-[0.76rem] text-app-orange">
              <AlertCircle size={13} aria-hidden />
              L'URL doit commencer par http:// ou https://
            </p>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Field label="Catégorie">
              <select value={category} onChange={e => setCategory(e.target.value)} className={inputCls}>
                {categories.map(c => (
                  <option key={c} value={c} className="bg-app-panel">
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Type">
              <select
                value={pricing}
                onChange={e => setPricing(e.target.value as 'free' | 'paid')}
                className={inputCls}
              >
                <option value="free" className="bg-app-panel">
                  100% Gratuit
                </option>
                <option value="paid" className="bg-app-panel">
                  Payant / Freemium
                </option>
              </select>
            </Field>
          </div>

          <Field label="Description">
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              placeholder="Courte description de l'outil..."
              className={`${inputCls} resize-none`}
            />
          </Field>
        </div>

        {canSubmit ? (
          <a
            href={issueUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-app-accent px-4 py-3 text-[0.88rem] font-bold text-app-accentInk transition-all hover:brightness-110"
          >
            <Github size={16} aria-hidden />
            Générer l'issue GitHub
            <ExternalLink size={13} aria-hidden />
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="mt-5 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-2xl border border-app-border bg-app-panel2 px-4 py-3 text-[0.88rem] font-bold text-app-dim"
          >
            <Github size={16} aria-hidden />
            Renseignez le nom et une URL valide
          </button>
        )}
        <p className="mt-2 text-center text-[0.74rem] text-app-dim">
          Le clic ouvre GitHub avec le titre et le corps pré-remplis.
        </p>
      </div>
    </div>
  );
}

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[0.78rem] font-semibold text-app-muted">
        {label}
        {required && <span className="text-app-orange"> *</span>}
      </span>
      {children}
    </label>
  );
}
