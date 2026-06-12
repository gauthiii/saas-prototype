const n=`/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Theme accent (RGB triples so Tailwind opacity modifiers keep working).
     Overridden at runtime by the Theme studio; baked in on project export. */
  --accent-rgb: 29 78 216;
  --accent-dark-rgb: 24 64 177;
  --grad-rgb: 126 34 206;
  --accent: rgb(var(--accent-rgb));
  --bg: #f7f8fa;
  --surface: #ffffff;
  --line: #e6e8ee;
  --ink: #0f1218;
  --ink-2: #5b6372;
}
.dark {
  --bg: #0a0c10;
  --surface: #0f1218;
  --line: #232938;
  --ink: #eef0f4;
  --ink-2: #8b93a5;
}

html, body, #root { height: 100%; }
body {
  @apply font-body antialiased;
  background: var(--bg);
  color: var(--ink);
}

@layer components {
  .surface { background: var(--surface); border: 1px solid var(--line); }
  .ink-2 { color: var(--ink-2); }
  .card { @apply surface rounded-xl shadow-card transition-shadow duration-200; }
  .card-hover { @apply hover:shadow-lift hover:-translate-y-px transition-all duration-200; }
  .btn {
    @apply inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium
      transition-all duration-150 active:scale-[.98] focus-visible:outline-none
      focus-visible:ring-2 focus-visible:ring-accent/50;
  }
  .btn-primary { @apply btn bg-accent text-white hover:bg-accent-dark shadow-card; }
  .btn-ghost { @apply btn surface hover:border-accent/40; }
  .field {
    @apply w-full rounded-lg surface px-3 py-2 text-sm outline-none transition
      focus:border-accent/60 focus:ring-2 focus:ring-accent/20 placeholder:text-[var(--ink-2)];
  }
  .label { @apply block text-xs font-semibold uppercase tracking-wider ink-2 mb-1.5; }
  .eyebrow { @apply text-[11px] font-semibold uppercase tracking-[.14em] ink-2; }
  .skeleton {
    @apply rounded-md;
    background: linear-gradient(90deg, var(--line) 25%, var(--surface) 50%, var(--line) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.6s linear infinite;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
`;export{n as default};
