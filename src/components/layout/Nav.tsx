import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { navLinks, personal } from "@/data/content";
import { Magnetic } from "@/components/ui/Magnetic";

export function Nav() {
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const [overDark, setOverDark] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setCondensed(y > 80));

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Flip the nav to a light scheme when a dark section ([data-nav-dark]) is
  // under the header. We watch a 1px detection line at the nav's height via an
  // IntersectionObserver, rebuilt on resize so the line stays put.
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-dark]")
    );
    if (!sections.length) return;

    const active = new Set<Element>();
    let observer: IntersectionObserver;

    const build = () => {
      observer?.disconnect();
      const line = 28; // px from top ≈ vertical centre of the header
      observer = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) active.add(e.target);
            else active.delete(e.target);
          }
          setOverDark(active.size > 0);
        },
        { rootMargin: `-${line}px 0px -${window.innerHeight - line - 1}px 0px` }
      );
      sections.forEach((s) => observer.observe(s));
    };

    build();
    window.addEventListener("resize", build);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", build);
    };
  }, []);

  // The mobile overlay is light, so while it's open the nav must read as light-bg.
  const dark = overDark && !open;

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`mx-auto flex items-center justify-between px-[var(--spacing-gutter)] transition-all duration-500 ${
            condensed ? "py-3" : "py-6"
          }`}
        >
          <a
            href="#top"
            data-cursor="link"
            className={`font-display text-xl font-semibold tracking-tight transition-colors duration-500 ${
              dark ? "text-paper" : "text-ink"
            }`}
          >
            {personal.firstName}
            <span className="text-accent">.</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor="link"
                className={`link-underline text-sm font-medium tracking-wide transition-colors duration-500 ${
                  dark
                    ? "text-paper/70 hover:text-paper"
                    : "text-ink/70 hover:text-ink"
                }`}
              >
                {link.label}
              </a>
            ))}
            <Magnetic>
              <a
                href={`mailto:${personal.email}`}
                data-cursor="link"
                className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-500 ${
                  dark
                    ? "border-paper/30 text-paper hover:bg-paper hover:text-night"
                    : "border-ink/20 text-ink hover:bg-ink hover:text-paper"
                }`}
              >
                Let's talk
              </a>
            </Magnetic>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <motion.span
              animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              className={`block h-px w-7 transition-colors duration-500 ${
                dark ? "bg-paper" : "bg-ink"
              }`}
            />
            <motion.span
              animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              className={`block h-px w-7 transition-colors duration-500 ${
                dark ? "bg-paper" : "bg-ink"
              }`}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-paper px-[var(--spacing-gutter)] md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-6xl font-light"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href={`mailto:${personal.email}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + navLinks.length * 0.07 }}
              className="mt-8 text-base text-ink/60"
            >
              {personal.email}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
