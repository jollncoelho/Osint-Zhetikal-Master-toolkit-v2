import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/** Bouton « revenir en haut », affiché après un défilement significatif. */
export function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 700);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="no-print fixed bottom-4 left-4 z-[65] grid h-11 w-11 place-items-center rounded-full border border-app-border bg-app-panel text-app-accent shadow-pop transition-all hover:border-app-accent/60 hover:brightness-110"
      aria-label="Revenir en haut de la page"
      title="Revenir en haut"
    >
      <ArrowUp size={17} />
    </button>
  );
}
