import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { projects } from "@/data/content";
import { ProjectCard } from "@/components/work/ProjectCard";
import { CaseStudy } from "@/components/work/CaseStudy";
import { Reveal } from "@/components/ui/Reveal";
import { riseItem } from "@/lib/motion";

/**
 * Editorial bento layout: every project is on screen at once in an asymmetric
 * grid (two "feature" cards read larger). No pinning / scroll-driven deck — the
 * whole section is ~1–1.5 screens, so Contact is a short scroll away. Tapping a
 * card still morphs it open into the full case study.
 *
 * `span` is the lg-and-up grid placement (index-matched to `projects`); below
 * lg the cards flow in a plain 1/2-column stack. `feature` bumps the title size.
 */
const LAYOUT = [
  { span: "lg:col-span-4 lg:row-span-2", feature: true }, // 0 — tall hero
  { span: "lg:col-span-2" }, // 1
  { span: "lg:col-span-2" }, // 2
  { span: "lg:col-span-2" }, // 3
  { span: "lg:col-span-2" }, // 4
  { span: "lg:col-span-2" }, // 5
  { span: "lg:col-span-3" }, // 6
  { span: "lg:col-span-3" }, // 7
  { span: "lg:col-span-2" }, // 8
  { span: "lg:col-span-4" }, // 9
  { span: "lg:col-span-6", feature: true }, // 10 — wide banner
];

export function Work() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openIndex = projects.findIndex((p) => p.id === openId);
  const open = openIndex >= 0 ? projects[openIndex] : null;

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
            performance and platform engineering. Tap any card for the full case
            study.
          </p>
        </Reveal>

        {/* Bento grid — staggered reveal, all projects visible at once. */}
        <Reveal
          group
          className="mt-8 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-6 lg:auto-rows-[18rem]"
        >
          {projects.map((project, i) => {
            const { span = "", feature } = LAYOUT[i] ?? {};
            return (
              <motion.div key={project.id} variants={riseItem} className={span}>
                <ProjectCard
                  project={project}
                  index={i}
                  feature={feature}
                  onOpen={setOpenId}
                />
              </motion.div>
            );
          })}
        </Reveal>
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
