import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { hero, personal } from "@/data/content";
import { lineReveal } from "@/lib/motion";

export function Hero() {
  // Drive the fade off absolute window scroll (px) — strictly monotonic — so it
  // fades exactly once and stays gone. A `target`/offset progress was producing
  // a non-monotonic value that made the hero reappear as it scrolled out.
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(() =>
    typeof window === "undefined" ? 800 : window.innerHeight
  );
  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Subtle parallax drift on the headline + a one-way fade of the whole section.
  const y = useTransform(scrollY, [0, vh], [0, 90]);
  const opacity = useTransform(scrollY, [0, vh * 0.55], [1, 0]);

  return (
    <motion.section
      id="top"
      style={{ opacity }}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-[var(--spacing-gutter)] pb-8 pt-24 sm:pt-28"
    >
      <motion.div style={{ y }} className="flex flex-1 flex-col justify-center py-2">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mb-6 flex items-center gap-4"
        >
          <span className="h-px w-12 bg-accent" />
          <span className="text-sm font-medium uppercase tracking-[0.22em] text-ink/60">
            {hero.eyebrow}
          </span>
        </motion.div>

        {/* Kinetic headline with mask reveal */}
        <h1 className="max-w-[18ch] font-display text-mega font-medium tracking-[-0.02em] text-balance">
          {hero.statement.map((frag, i) => (
            <span key={i} className="inline">
              <span className="inline-block overflow-hidden align-bottom">
                <motion.span
                  variants={lineReveal}
                  initial="hidden"
                  animate="show"
                  transition={{ delay: 0.5 + i * 0.12 }}
                  className={`inline-block ${
                    frag.accent ? "italic text-accent" : ""
                  }`}
                >
                  {frag.text}
                </motion.span>
              </span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-ink/70 sm:text-lg"
        >
          {hero.subline}
        </motion.p>
      </motion.div>

      {/* Baseline meta row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="flex flex-col gap-6 border-t border-line pt-6 text-sm sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-2 text-ink/70">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {personal.availability}
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-ink/60">
          <span>{personal.yearsExperience}+ years</span>
          <span>Autodesk · FirstCry · Carnera</span>
          <span>{personal.location}</span>
        </div>
        <a
          href="#work"
          data-cursor="link"
          className="group inline-flex items-center gap-2 font-medium text-ink"
        >
          Scroll to work
          <span className="transition-transform group-hover:translate-y-1">↓</span>
        </a>
      </motion.div>
    </motion.section>
  );
}
