import { type ReactNode } from "react";
import { motion } from "motion/react";

type MarqueeProps = {
  children: ReactNode;
  /** Seconds for one full loop. */
  speed?: number;
  reverse?: boolean;
  className?: string;
};

/**
 * Seamless infinite marquee. Renders the row twice and translates by -50%
 * so the loop is invisible. Used for the skills band / accolades ticker.
 */
export function Marquee({ children, speed = 28, reverse, className }: MarqueeProps) {
  return (
    <div className={`flex overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="flex shrink-0 items-center gap-x-10 pr-10"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        <div className="flex shrink-0 items-center gap-x-10 pr-10">{children}</div>
        <div className="flex shrink-0 items-center gap-x-10 pr-10" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
