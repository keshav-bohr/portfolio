import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";

/**
 * Custom editorial cursor: a small ink dot that trails the pointer on a spring,
 * expanding into a labelled disc over interactive targets.
 *
 * Targets opt in with `data-cursor` ("view" | "link") and optional
 * `data-cursor-label`. Disabled on touch / coarse pointers and reduced motion.
 */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });

  const [label, setLabel] = useState<string | null>(null);
  const [variant, setVariant] = useState<"default" | "view" | "link">("default");
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.body.dataset.cursor = "on";

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);

      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      if (el) {
        setVariant((el.dataset.cursor as "view" | "link") ?? "link");
        setLabel(el.dataset.cursorLabel ?? null);
      } else {
        setVariant("default");
        setLabel(null);
      }
    };
    const leave = () => setHidden(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      delete document.body.dataset.cursor;
    };
  }, [x, y]);

  const size = variant === "view" ? 88 : variant === "link" ? 56 : 12;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[120] flex items-center justify-center rounded-full mix-blend-difference"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: size,
        height: size,
        backgroundColor: "#eaebe6",
        opacity: hidden ? 0 : 1,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 32 }}
    >
      <AnimatePresence>
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="font-sans text-[11px] font-medium uppercase tracking-wider text-[#121514]"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
