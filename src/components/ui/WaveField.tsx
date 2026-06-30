import { useEffect, useRef } from "react";

/**
 * Subtle, scroll-reactive wave band that lives behind the content (shows through
 * the transparent light sections). Three layered sine strokes drift continuously
 * and shift phase + amplitude with scroll position, so the page feels alive as
 * you move down it. Paths are mutated directly via refs (no React re-render) for
 * a smooth 60fps loop; honours prefers-reduced-motion.
 */
const W = 1000;
const H = 200;
const MID = H / 2;
const STEPS = 64;

function wavePath(amp: number, freq: number, phase: number) {
  let d = "";
  for (let i = 0; i <= STEPS; i++) {
    const x = (i / STEPS) * W;
    const y = MID + Math.sin(x * freq + phase) * amp;
    d += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return d.trim();
}

const LAYERS = [
  { amp: 16, freq: 0.0125, speed: 0.55, phase: 0, opacity: 0.22 },
  { amp: 26, freq: 0.009, speed: -0.4, phase: 2.1, opacity: 0.14 },
  { amp: 20, freq: 0.0108, speed: 0.3, phase: 4.2, opacity: 0.09 },
];

export function WaveField() {
  const paths = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      LAYERS.forEach((l, i) =>
        paths.current[i]?.setAttribute("d", wavePath(l.amp, l.freq, l.phase))
      );
      return;
    }

    let raf = 0;
    let t = 0;
    const loop = () => {
      t += 0.01;
      const scroll = window.scrollY || 0;
      LAYERS.forEach((l, i) => {
        const phase = l.phase + t * l.speed + scroll * 0.0016;
        const amp = l.amp + Math.sin(scroll * 0.001 + i) * 6;
        paths.current[i]?.setAttribute("d", wavePath(amp, l.freq, phase));
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-1/2 -z-10 h-[55vh] -translate-y-1/2"
    >
      <svg
        className="h-full w-full"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        fill="none"
      >
        {LAYERS.map((l, i) => (
          <path
            key={i}
            ref={(el) => {
              paths.current[i] = el;
            }}
            stroke="var(--color-accent)"
            strokeOpacity={l.opacity}
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
}
