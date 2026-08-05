import { useState } from 'react';
import { X, Github, ExternalLink } from 'lucide-react';

interface Props {
  open: boolean;
  categories: string[];
  onClose: () => void;
}

const REPO_ISSUES_URL = 'https://github.com/prohacking77/Zhetikal-OSINT/issues/new';

export function SubmitToolModal({ open, categories, onClose }: Props) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState(categories[0] ?? '');
  const [description, setDescription] = useState('');
  const [pricing, setPricing] = useState<'free' | 'paid'>('free');

  if (!open) return null;

  const body = [
    `### Proposition d'outil OSINT`,
    ``,
    `**Nom de l'outil :** ${name}`,
    `**URL :** ${url}`,
    `**Catégorie :** ${category}`,
    `**Type :** ${pricing === 'free' ? '100% Gratuit' : 'Payant / Freemium'}`,
    ``,
    `**Description :**`,
    description,
    ``,
    `> Proposé via la Master-Toolkit OSINT Zhetikal.`,
  ].join('\n');

  const issueUrl = `${REPO_ISSUES_URL}?title=${encodeURIComponent(`[Outil] ${name || 'Nouvel outil'}`)}&body=${encodeURIComponent(body)}`;

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

        <div className="flex items-center gap-2 text-cyan-300 text-[0.78rem] font-bold tracking-[0.18em] uppercase mb-1">
          <Github size={14} />
          Proposer un outil
        </div>
        <p className="text-[#86a6be] text-[0.82rem] mb-4">
          Remplissez le formulaire — un lien pré-rempli vers une issue GitHub sera généré pour soumettre votre proposition à la communauté.
        </p>

        <div className="flex flex-col gap-3">
          <Field label="Nom de l'outil">
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Ex : Sherlock" className={inputCls} />
          </Field>
          <Field label="URL">
            <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." className={inputCls} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Catégorie">
              <select value={category} onChange={e => setCategory(e.target.value)} className={inputCls}>
                {categories.map(c => <option key={c} value={c} className="bg-[#081426]">{c}</option>)}
              </select>
            </Field>
            <Field label="Type">
              <select value={pricing} onChange={e => setPricing(e.target.value as 'free' | 'paid')} className={inputCls}>
                <option value="free" className="bg-[#081426]">100% Gratuit</option>
                <option value="paid" className="bg-[#081426]">Payant / Freemium</option>
              </select>
            </Field>
          </div>
          <Field label="Description">
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="Courte description de l'outil..." className={`${inputCls} resize-none`} />
          </Field>
        </div>

        <a
          href={issueUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 flex items-center justify-center gap-2 w-full px-4 py-3 rounded-2xl text-[0.88rem] font-bold bg-cyan-400 text-[#03131e] hover:bg-cyan-300 transition-all"
        >
          <Github size={16} />
          Générer l'issue GitHub
          <ExternalLink size={13} />
        </a>
        <p className="mt-2 text-center text-[#6f90aa] text-[0.74rem]">
          Le clic ouvre GitHub avec le titre et le corps pré-remplis.
        </p>
      </div>
    </div>
  );
}

const inputCls = "w-full px-3.5 py-2.5 bg-[#081426] border border-[#12304d] rounded-xl text-[#ecf7ff] placeholder-[#6f90aa] text-[0.88rem] outline-none focus:border-cyan-400/40 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.06)] transition-all duration-150";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[#a9c7dc] text-[0.78rem] font-semibold">{label}</span>
      {children}
    </label>
  );
}
