import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";

/**
 * A pointer that rides down a straight vertical track pinned to the left edge as
 * you scroll the page. The track is a single static SVG path; the dot is moved
 * along it with getPointAtLength() only on scroll change (no per-frame rebuilds),
 * so it costs next to nothing. Progress maps to the whole document's scroll.
 */
const W = 44;
const MIDX = W / 2;

function linePath(h: number) {
  return `M${MIDX} 0 L${MIDX} ${h}`;
}

export function ScrollTracer() {
  const [h, setH] = useState(() =>
    typeof window === "undefined" ? 800 : window.innerHeight
  );
  const pathRef = useRef<SVGPathElement | null>(null);
  const dotRef = useRef<SVGGElement | null>(null);
  const lenRef = useRef(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onResize = () => setH(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const place = (p: number) => {
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!path || !dot) return;
    const clamped = Math.min(Math.max(p, 0), 1);
    const pt = path.getPointAtLength(clamped * lenRef.current);
    dot.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
  };

  // Re-measure the track and re-seat the dot whenever the viewport height (and
  // thus the path) changes.
  useEffect(() => {
    if (!pathRef.current) return;
    lenRef.current = pathRef.current.getTotalLength();
    place(scrollYProgress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [h]);

  useMotionValueEvent(scrollYProgress, "change", place);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 h-screen"
    >
      <svg width={W} height={h} viewBox={`0 0 ${W} ${h}`} fill="none">
        <path
          ref={pathRef}
          d={linePath(h)}
          stroke="var(--color-accent)"
          strokeOpacity={0.16}
          strokeWidth={1.5}
        />
        <g ref={dotRef}>
          <circle r={9} fill="var(--color-accent)" opacity={0.14} />
          <circle r={3.5} fill="var(--color-accent)" />
        </g>
      </svg>
    </div>
  );
}
