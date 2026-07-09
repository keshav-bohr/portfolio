import { motion } from "motion/react";

/**
 * Generative, image-free art panel for each project. A layered gradient mesh
 * keyed to the project index, with the folio number set large in the serif.
 * Keeps the showcase visually rich without sourcing photography.
 */
const PALETTES = [
  ["#356b5d", "#1f3d36", "#10130f"], // spruce (brand accent)
  ["#3a5a74", "#21384a", "#0e1318"], // petrol blue
  ["#5a5f7a", "#33384f", "#101015"], // indigo slate
  ["#4a6b66", "#27403c", "#0f1413"], // teal grey
  ["#6b5a72", "#3b2f40", "#121015"], // muted aubergine
  ["#566b4a", "#33402a", "#0f1310"], // moss
  ["#3f6b6b", "#234040", "#0e1313"], // deep teal
  ["#4f5d74", "#2c3447", "#0e1015"], // steel blue
  ["#6a5e54", "#3c342d", "#121010"], // taupe
  ["#456b58", "#264035", "#0f130f"], // forest
  ["#3d5f6b", "#22383f", "#0e1214"], // ocean
  ["#5e6b4a", "#37402a", "#11130d"], // olive
];

export function ProjectVisual({
  index,
  folio,
  active = false,
  tone = "dark",
}: {
  index: number;
  folio: string;
  active?: boolean;
  /** "dark" = full gradient panel (case study); "light" = soft tint on a pale card. */
  tone?: "dark" | "light";
}) {
  const [a, b, c] = PALETTES[index % PALETTES.length];
  const light = tone === "light";
  const lightBase = "#f5f6f2";

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{ scale: active ? 1.06 : 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          // On light cards the palette colours are dropped to a low-alpha wash
          // over a pale base; on dark they fill the panel as before.
          background: light
            ? `radial-gradient(120% 120% at 18% 12%, ${a}2b 0%, transparent 55%),
               radial-gradient(120% 120% at 88% 85%, ${b}1f 0%, transparent 60%),
               ${lightBase}`
            : `radial-gradient(120% 120% at 20% 15%, ${a} 0%, transparent 45%),
               radial-gradient(120% 120% at 85% 80%, ${b} 0%, transparent 50%),
               ${c}`,
        }}
      />
      {/* Fine grid lines for an architectural / blueprint texture */}
      <div
        className={`absolute inset-0 ${light ? "opacity-[0.05]" : "opacity-[0.12]"}`}
        style={{
          backgroundImage: light
            ? "linear-gradient(to right, #15191a 1px, transparent 1px), linear-gradient(to bottom, #15191a 1px, transparent 1px)"
            : "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <span
        className={`pointer-events-none absolute bottom-4 right-5 font-display text-[5rem] font-light leading-none sm:text-[7rem] ${
          light ? "" : "text-paper/15"
        }`}
        style={light ? { color: `${a}24` } : undefined}
      >
        {folio}
      </span>
    </div>
  );
}
