import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Check, X } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* Puce de filtre                                                              */
/* -------------------------------------------------------------------------- */

interface ChipProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  count?: number;
  title?: string;
}

export function Chip({ active, onClick, children, count, title }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-[0.74rem] font-semibold transition-all duration-150 ${
        active
          ? 'border-app-accent bg-app-accent text-app-accentInk'
          : 'border-app-border bg-app-panel text-app-muted hover:border-app-accent/50 hover:text-app-accent'
      }`}
    >
      {children}
      {typeof count === 'number' && (
        <span className={`text-[0.68rem] font-bold ${active ? 'opacity-70' : 'text-app-dim'}`}>{count}</span>
      )}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Puce statistique                                                            */
/* -------------------------------------------------------------------------- */

export function StatPill({
  icon,
  label,
  value,
  tone = 'accent',
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  tone?: 'accent' | 'emerald' | 'gold';
}) {
  const toneCls = {
    accent: 'text-app-accent',
    emerald: 'text-app-emerald',
    gold: 'text-app-gold',
  }[tone];

  return (
    <div className="flex items-center gap-2 rounded-full border border-app-border bg-app-panel px-3.5 py-2 text-[0.8rem] text-app-muted">
      <span className={toneCls} aria-hidden>
        {icon}
      </span>
      {label} : <span className={`font-bold ${toneCls}`}>{value}</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Bouton avec confirmation en deux temps                                      */
/* -------------------------------------------------------------------------- */

interface ConfirmButtonProps {
  onConfirm: () => void;
  children: ReactNode;
  confirmLabel?: string;
  className?: string;
  disabled?: boolean;
}

/** Évite les suppressions accidentelles : le premier clic demande confirmation. */
export function ConfirmButton({
  onConfirm,
  children,
  confirmLabel = 'Confirmer ?',
  className = '',
  disabled,
}: ConfirmButtonProps) {
  const [armed, setArmed] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function handleClick() {
    if (!armed) {
      setArmed(true);
      timer.current = window.setTimeout(() => setArmed(false), 3500);
      return;
    }
    window.clearTimeout(timer.current);
    setArmed(false);
    onConfirm();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[0.78rem] font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
        armed
          ? 'border-app-orange bg-app-orange/15 text-app-orange'
          : 'border-app-border bg-app-panel text-app-muted hover:border-app-accent/40 hover:text-app-accent'
      } ${className}`}
      aria-live="polite"
    >
      {armed ? <Check size={13} aria-hidden /> : <X size={13} aria-hidden />}
      {armed ? confirmLabel : children}
    </button>
  );
}
