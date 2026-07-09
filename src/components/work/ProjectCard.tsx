import { motion } from "motion/react";
import type { Project } from "@/data/content";
import { ProjectVisual } from "./ProjectVisual";

type Props = {
  project: Project;
  index: number;
  onOpen: (id: string) => void;
  /** Editorial asymmetry: some cards are taller / wider. */
  feature?: boolean;
};

export function ProjectCard({ project, index, onOpen, feature }: Props) {
  return (
    <motion.article
      layoutId={`card-${project.id}`}
      onClick={() => onOpen(project.id)}
      data-cursor="view"
      data-cursor-label="Open"
      whileHover="hover"
      initial="rest"
      animate="rest"
      className={`group relative h-full cursor-pointer overflow-hidden rounded-[1.25rem] border border-ink/10 bg-paper lg:min-h-0 ${
        feature ? "min-h-[15rem] sm:min-h-[22rem]" : "min-h-[13rem] sm:min-h-[18rem]"
      }`}
    >
      <motion.div
        layoutId={`visual-${project.id}`}
        className="absolute inset-0"
        variants={{ rest: {}, hover: {} }}
      >
        <ProjectVisual index={index} folio={project.index} tone="light" />
      </motion.div>

      <div className="relative flex h-full flex-col justify-between p-5 sm:p-8">
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
            className={`font-display font-medium text-ink ${
              feature ? "text-2xl sm:text-3xl lg:text-5xl" : "text-2xl sm:text-3xl"
            }`}
          >
            {project.title}
          </motion.h3>
          <motion.p
            variants={{
              rest: { opacity: 0.7, y: 0 },
              hover: { opacity: 1, y: -2 },
            }}
            className="mt-2 line-clamp-2 max-w-md text-sm leading-relaxed text-ink/65 sm:mt-3 sm:line-clamp-none"
          >
            {project.blurb}
          </motion.p>

          <div className="mt-3 flex flex-wrap gap-2 sm:mt-5">
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
  );
}
