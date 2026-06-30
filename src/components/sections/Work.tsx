import { useRef, useState } from "react";
import { AnimatePresence, useScroll } from "motion/react";
import { projects } from "@/data/content";
import { StackCard } from "@/components/work/StackCard";
import { CaseStudy } from "@/components/work/CaseStudy";
import { Reveal } from "@/components/ui/Reveal";

export function Work() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openIndex = projects.findIndex((p) => p.id === openId);
  const open = openIndex >= 0 ? projects[openIndex] : null;

  // Drive the whole deck off one scroll progress value.
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section id="work" className="relative px-[var(--spacing-gutter)] pb-32 pt-24 sm:pb-48 sm:pt-32">
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
              Selected Work
            </span>
            <h2 className="mt-4 max-w-2xl font-display text-display font-medium tracking-tight text-balance">
              Systems people build on.
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-ink/60">
            {projects.length} projects across identity, fintech, AI tooling,
            performance and platform engineering. Scroll the deck — tap any card
            for the full case study.
          </p>
        </Reveal>
      </div>

      {/* Scroll-driven stacked deck */}
      <div ref={container} className="relative mt-4">
        {projects.map((project, i) => (
          <StackCard
            key={project.id}
            project={project}
            index={i}
            total={projects.length}
            progress={scrollYProgress}
            onOpen={setOpenId}
          />
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <CaseStudy
            project={open}
            index={openIndex}
            onClose={() => setOpenId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
