import { useState } from "react";
import { motion } from "motion/react";

/**
 * Editorial before/after. A segmented toggle drives an animated highlight;
 * on wide screens both states sit side-by-side with the active one lifted.
 */
export function BeforeAfter({
  before,
  after,
}: {
  before: string;
  after: string;
}) {
  const [view, setView] = useState<"before" | "after">("after");

  return (
    <div>
      <div className="mb-6 flex items-center gap-1 rounded-full border border-paper/15 p-1">
        {(["before", "after"] as const).map((k) => (
          <button
            key={k}
            onClick={() => setView(k)}
            data-cursor="link"
            className="relative flex-1 rounded-full px-4 py-2 text-sm font-medium capitalize"
          >
            {view === k && (
              <motion.span
                layoutId="ba-toggle"
                className="absolute inset-0 rounded-full bg-paper"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span
              className={`relative z-10 transition-colors ${
                view === k ? "text-night" : "text-paper/60"
              }`}
            >
              {k}
            </span>
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel
          kind="before"
          text={before}
          dimmed={view !== "before"}
          mobileHidden={view !== "before"}
        />
        <Panel
          kind="after"
          text={after}
          dimmed={view !== "after"}
          mobileHidden={view !== "after"}
        />
      </div>
    </div>
  );
}

function Panel({
  kind,
  text,
  dimmed,
  mobileHidden,
}: {
  kind: "before" | "after";
  text: string;
  dimmed: boolean;
  mobileHidden: boolean;
}) {
  const isAfter = kind === "after";
  return (
    <motion.div
      animate={{ opacity: dimmed ? 0.4 : 1, scale: dimmed ? 0.985 : 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-2xl border p-6 ${mobileHidden ? "hidden lg:block" : ""} ${
        isAfter
          ? "border-accent/40 bg-accent/10"
          : "border-paper/15 bg-paper/[0.04]"
      }`}
    >
      <span
        className={`text-xs font-semibold uppercase tracking-[0.2em] ${
          isAfter ? "text-accent-soft" : "text-paper/50"
        }`}
      >
        {kind}
      </span>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-paper/85">{text}</p>
    </motion.div>
  );
}
