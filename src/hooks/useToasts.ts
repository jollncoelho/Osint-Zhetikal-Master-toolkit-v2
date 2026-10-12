import { useEffect, useState } from 'react';

export type ToastTone = 'success' | 'info' | 'warning';

export interface Toast {
  id: number;
  message: string;
  tone: ToastTone;
}

type Listener = (toasts: Toast[]) => void;

let toasts: Toast[] = [];
const listeners = new Set<Listener>();
let nextId = 1;

function emit() {
  for (const listener of listeners) listener(toasts);
}

/** Affiche une notification éphémère, utilisable depuis n'importe quel composant. */
export function toast(message: string, tone: ToastTone = 'success') {
  const id = nextId++;
  toasts = [...toasts, { id, message, tone }].slice(-4);
  emit();
  window.setTimeout(() => dismissToast(id), 2600);
}

export function dismissToast(id: number) {
  toasts = toasts.filter(t => t.id !== id);
  emit();
}

/** S'abonne à la file de notifications. */
export function useToasts(): Toast[] {
  const [state, setState] = useState<Toast[]>(toasts);

  useEffect(() => {
    const listener: Listener = next => setState([...next]);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return state;
}
