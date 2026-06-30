import { motion } from "motion/react";
import { personal } from "@/data/content";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";

const links = [
  { label: "Email", value: personal.email, href: `mailto:${personal.email}` },
  { label: "LinkedIn", value: "keshav-bohra", href: personal.linkedin },
  {
    label: "GitHub",
    // Display whatever handle/host is in personal.github (strip protocol + trailing slash).
    value: personal.github.replace(/^https?:\/\//, "").replace(/\/$/, ""),
    href: personal.github,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      data-nav-dark
      className="relative overflow-hidden bg-night px-[var(--spacing-gutter)] py-28 text-paper sm:py-40"
    >
      <div className="mx-auto max-w-[1600px]">
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent-soft">
          Contact
        </span>

        <Reveal>
          <h2 className="mt-6 max-w-[14ch] font-display text-mega font-medium leading-[0.95] tracking-tight">
            Let's build something
            <span className="italic text-accent-soft"> durable.</span>
          </h2>
        </Reveal>

        <Magnetic strength={10} className="mt-12 inline-block">
          <a
            href={`mailto:${personal.email}`}
            data-cursor="link"
            className="group inline-flex items-center gap-4 rounded-full bg-paper px-8 py-5 text-lg font-medium text-night"
          >
            Start a conversation
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </Magnetic>

        {/* Direct links */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-paper/10 bg-paper/10 sm:grid-cols-3">
          {links.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              data-cursor="link"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-night p-7 transition-colors hover:bg-night-2"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/40">
                {l.label}
              </div>
              <div className="mt-2 flex items-center justify-between gap-2 text-lg text-paper/90">
                {l.value}
                <span className="text-paper/40 transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
