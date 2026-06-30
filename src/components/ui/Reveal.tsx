import { type ReactNode } from "react";
import { motion } from "motion/react";
import { riseItem, stagger } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger direct children that use `riseItem`. */
  group?: boolean;
  as?: "div" | "section" | "ul" | "li" | "header";
};

/**
 * Scroll-triggered reveal. Wrap a block to fade+rise it into view once.
 * Set `group` to orchestrate staggered children (each child should be a
 * <motion.* variants={riseItem}> element).
 */
export function Reveal({ children, className, group, as = "div" }: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={group ? stagger : riseItem}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
    >
      {children}
    </MotionTag>
  );
}
