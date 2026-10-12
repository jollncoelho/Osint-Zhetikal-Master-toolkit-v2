import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { dismissToast, ToastTone, useToasts } from '../hooks/useToasts';

const TONE_ICON: Record<ToastTone, typeof Info> = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
};

const TONE_CLASS: Record<ToastTone, string> = {
  success: 'text-app-emerald',
  info: 'text-app-accent',
  warning: 'text-app-orange',
};

/** Pile de notifications, en bas à droite. */
export function Toasts() {
  const toasts = useToasts();
  if (toasts.length === 0) return null;

  return (
    <div
      className="no-print pointer-events-none fixed bottom-4 right-4 z-[70] flex w-[min(92vw,22rem)] flex-col gap-2"
      role="status"
      aria-live="polite"
    >
      {toasts.map(item => {
        const Icon = TONE_ICON[item.tone];
        return (
          <div
            key={item.id}
            className="pointer-events-auto flex items-center gap-2.5 rounded-xl border border-app-border bg-app-panel px-3.5 py-2.5 shadow-pop animate-toastIn"
          >
            <Icon size={16} className={`flex-shrink-0 ${TONE_CLASS[item.tone]}`} aria-hidden />
            <p className="flex-1 text-[0.8rem] font-medium text-app-text">{item.message}</p>
            <button
              type="button"
              onClick={() => dismissToast(item.id)}
              className="rounded-md p-1 text-app-dim transition-colors hover:text-app-text"
              aria-label="Fermer la notification"
            >
              <X size={13} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
