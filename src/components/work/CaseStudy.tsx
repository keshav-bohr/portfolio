import { useEffect } from "react";
import { motion } from "motion/react";
import type { Project } from "@/data/content";
import { ProjectVisual } from "./ProjectVisual";
import { BeforeAfter } from "./BeforeAfter";

type Props = {
  project: Project;
  index: number;
  onClose: () => void;
};

export function CaseStudy({ project, index, onClose }: Props) {
  // Esc to close + scroll lock while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [onClose]);

  return (
    // `data-lenis-prevent` hands wheel/touch back to native scroll so the
    // (often taller-than-viewport) case study can scroll inside the overlay.
    <div data-lenis-prevent className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-night/70 backdrop-blur-sm"
      />

      <div className="relative mx-auto my-4 w-[min(1100px,94vw)] sm:my-10">
        <motion.article
          layoutId={`card-${project.id}`}
          className="overflow-hidden rounded-[1.5rem] bg-night text-paper shadow-2xl"
        >
          {/* Hero band — the card visual expands into this */}
          <motion.div
            layoutId={`visual-${project.id}`}
            className="relative h-[42vh] min-h-[20rem] w-full"
          >
            <ProjectVisual index={index} folio={project.index} active />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />

            <button
              onClick={onClose}
              data-cursor="link"
              aria-label="Close case study"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors hover:bg-paper hover:text-night"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 2l12 12M14 2L2 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>

            <div className="absolute bottom-0 left-0 p-6 sm:p-10">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-paper/60">
                {project.discipline} · {project.company}
                {project.client !== project.company ? ` · ${project.client}` : ""}
              </span>
              <motion.h2
                layoutId={`title-${project.id}`}
                className="mt-3 max-w-3xl font-display text-4xl font-medium sm:text-6xl"
              >
                {project.title}
              </motion.h2>
            </div>
          </motion.div>

          {/* Body — fades/rises in after the layout morph settles */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-12 p-6 sm:p-10 lg:grid-cols-[1fr_18rem] lg:gap-16"
          >
            <div className="space-y-12">
              <section>
                <SectionLabel>The brief</SectionLabel>
                <p className="text-pretty text-lg leading-relaxed text-paper/85 sm:text-xl">
                  {project.context}
                </p>
              </section>

              <section>
                <SectionLabel>The approach</SectionLabel>
                <ul className="space-y-4">
                  {project.approach.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="mt-1 font-display text-sm text-accent-soft">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="leading-relaxed text-paper/80">{step}</p>
                    </li>
                  ))}
                </ul>
              </section>

              {project.comparison && (
                <section>
                  <SectionLabel>Before / After</SectionLabel>
                  <BeforeAfter
                    before={project.comparison.before}
                    after={project.comparison.after}
                  />
                </section>
              )}
            </div>

            {/* Aside: meta + metrics */}
            <aside className="space-y-10 lg:border-l lg:border-paper/10 lg:pl-10">
              <div>
                <SectionLabel>Role</SectionLabel>
                <p className="text-paper/80">{project.role}</p>
              </div>
              <div>
                <SectionLabel>Stack</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-paper/20 px-3 py-1 text-sm text-paper/75"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <SectionLabel>Outcome</SectionLabel>
                <div className="space-y-5">
                  {project.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="font-display text-4xl font-medium text-accent-soft">
                        {m.value}
                      </div>
                      <div className="mt-1 text-sm text-paper/60">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </motion.div>
        </motion.article>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-paper/40">
      {children}
    </h4>
  );
}
