import { motion, useTransform, type MotionValue } from "motion/react";
import type { Project } from "@/data/content";
import { ProjectVisual } from "./ProjectVisual";

type Props = {
  project: Project;
  index: number;
  total: number;
  /** Scroll progress (0–1) of the whole stack container. */
  progress: MotionValue<number>;
  onOpen: (id: string) => void;
};

/**
 * One card in the scroll stack. Each card pins at the centre of the viewport
 * (sticky) while its slot scrolls; as later cards arrive, this one scales down
 * and offsets so the deck recedes behind the active card. The scale lives on a
 * wrapper (not the layoutId article) so the expand-to-case-study morph stays clean.
 */
export function StackCard({ project, index, total, progress, onOpen }: Props) {
  // Earlier cards shrink further; the newest stays ~full size.
  const targetScale = 1 - (total - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div className="sticky top-0 flex h-screen items-center justify-center">
      <motion.div
        style={{ scale, top: index * 16 }}
        className="relative w-full max-w-[1040px]"
      >
        <motion.article
          layoutId={`card-${project.id}`}
          onClick={() => onOpen(project.id)}
          data-cursor="view"
          data-cursor-label="Open"
          whileHover="hover"
          initial="rest"
          animate="rest"
          className="group relative h-[62vh] min-h-[23rem] cursor-pointer overflow-hidden rounded-[1.5rem] border border-ink/10 bg-paper shadow-[0_36px_90px_-48px_rgba(21,25,26,0.55)]"
        >
          <motion.div layoutId={`visual-${project.id}`} className="absolute inset-0">
            <ProjectVisual index={index} folio={project.index} tone="light" />
          </motion.div>

          <div className="relative flex h-full flex-col justify-between p-7 sm:p-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-ink/55">
                {project.discipline}
              </span>
              <span className="text-xs font-medium text-ink/45">
                {project.company}
                {project.client !== project.company ? ` · ${project.client}` : ""}
              </span>
            </div>

            <div>
              <motion.h3
                layoutId={`title-${project.id}`}
                className="max-w-2xl font-display text-4xl font-medium text-ink sm:text-5xl"
              >
                {project.title}
              </motion.h3>
              <motion.p
                variants={{ rest: { opacity: 0.7 }, hover: { opacity: 1 } }}
                className="mt-3 max-w-md text-sm leading-relaxed text-ink/65"
              >
                {project.blurb}
              </motion.p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-ink/15 px-3 py-1 text-xs text-ink/65"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.article>
      </motion.div>
    </div>
  );
}
