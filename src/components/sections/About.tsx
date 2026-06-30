import { motion } from "motion/react";
import { about, skills, recognition, experience } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { riseItem } from "@/lib/motion";

export function About() {
  return (
    <section id="about" className="relative bg-paper-2 py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-[var(--spacing-gutter)]">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          {/* Philosophy */}
          <div>
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
              About
            </span>
            <Reveal>
              <p className="mt-6 max-w-2xl font-display text-3xl font-light leading-snug tracking-tight text-balance sm:text-4xl">
                {about.lead}
              </p>
            </Reveal>

            <Reveal group className="mt-12 space-y-6">
              {about.philosophy.map((p, i) => (
                <motion.p
                  key={i}
                  variants={riseItem}
                  className="max-w-xl text-pretty leading-relaxed text-ink/70"
                >
                  {p}
                </motion.p>
              ))}
            </Reveal>

            {/* Recognition */}
            <Reveal group className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {recognition.map((r) => (
                <motion.div
                  key={r.title}
                  variants={riseItem}
                  className="bg-paper-2 p-6"
                >
                  <div className="font-display text-lg font-medium">{r.title}</div>
                  <div className="mt-1 text-sm text-ink/55">{r.detail}</div>
                </motion.div>
              ))}
            </Reveal>
          </div>

          {/* Skills + timeline */}
          <div className="space-y-12">
            <Reveal group className="space-y-6">
              {skills.map((group) => (
                <motion.div
                  key={group.label}
                  variants={riseItem}
                  className="border-b border-line pb-6"
                >
                  <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">
                    {group.label}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-ink/15 px-3 py-1 text-sm text-ink/75"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </Reveal>

            <Reveal group className="space-y-5">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">
                Experience
              </div>
              {experience.map((e) => (
                <motion.div
                  key={e.company}
                  variants={riseItem}
                  className="flex items-baseline justify-between gap-4"
                >
                  <div>
                    <div className="font-display text-lg font-medium">
                      {e.company}
                      <span className="ml-2 text-sm font-sans font-normal text-ink/50">
                        {e.location}
                      </span>
                    </div>
                    <div className="text-sm text-ink/60">{e.role}</div>
                  </div>
                  <div className="shrink-0 text-right text-sm text-ink/45">
                    {e.period}
                  </div>
                </motion.div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
