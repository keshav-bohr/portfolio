import { personal } from "@/data/content";

export function Footer() {
  const year = 2026; // build-stamped; update as needed
  return (
    <footer data-nav-dark className="bg-night px-[var(--spacing-gutter)] py-10 text-paper/50">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 text-sm sm:flex-row">
        <p>
          © {year} {personal.name}. Built with React, TypeScript & Tailwind.
        </p>
        <p className="font-display italic text-paper/70">
          Designed & engineered using Claude.
        </p>
      </div>
    </footer>
  );
}
