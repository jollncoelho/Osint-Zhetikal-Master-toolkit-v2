/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Les couleurs passent par des variables CSS (canaux RGB) définies dans
        // src/index.css : un seul endroit à modifier pour changer de thème.
        // Le format « rgb(var(--x) / <alpha-value>) » permet d'utiliser les
        // modificateurs d'opacité de Tailwind (bg-app-panel/70, etc.).
        app: {
          bg: 'rgb(var(--c-bg-rgb) / <alpha-value>)',
          bgSoft: 'rgb(var(--c-bg-soft-rgb) / <alpha-value>)',
          panel: 'rgb(var(--c-panel-rgb) / <alpha-value>)',
          panel2: 'rgb(var(--c-panel-2-rgb) / <alpha-value>)',
          border: 'rgb(var(--c-border-rgb) / <alpha-value>)',
          borderStrong: 'rgb(var(--c-border-strong-rgb) / <alpha-value>)',
          text: 'rgb(var(--c-text-rgb) / <alpha-value>)',
          muted: 'rgb(var(--c-text-muted-rgb) / <alpha-value>)',
          dim: 'rgb(var(--c-text-dim-rgb) / <alpha-value>)',
          accent: 'rgb(var(--c-accent-rgb) / <alpha-value>)',
          accentInk: 'rgb(var(--c-accent-ink-rgb) / <alpha-value>)',
          gold: 'rgb(var(--c-gold-rgb) / <alpha-value>)',
          emerald: 'rgb(var(--c-emerald-rgb) / <alpha-value>)',
          orange: 'rgb(var(--c-orange-rgb) / <alpha-value>)',
          sky: 'rgb(var(--c-sky-rgb) / <alpha-value>)',
          violet: 'rgb(var(--c-violet-rgb) / <alpha-value>)',
          // Couleur translucide prête à l'emploi (sans modificateur d'opacité).
          accentSoft: 'var(--c-accent-soft)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        pop: 'var(--shadow-pop)',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        toastIn: {
          from: { opacity: '0', transform: 'translateY(12px) scale(0.97)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.15s ease',
        slideUp: 'slideUp 0.22s ease both',
        toastIn: 'toastIn 0.2s ease both',
      },
    },
  },
  plugins: [],
};
