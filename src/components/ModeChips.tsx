import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { Mode } from "@/lib/modes";

interface Props {
  modes: Mode[];
  activeId: Mode["id"];
  onChange: (id: Mode["id"]) => void;
}

export function ModeChips({ modes, activeId, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {modes.map((m) => {
        const active = m.id === activeId;
        return (
          <button
            key={m.id}
            onClick={() => onChange(m.id)}
            title={m.blurb}
            className={cn(
              "relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all duration-300",
              "border border-white/10 backdrop-blur-md",
              active
                ? "text-foreground bg-white/10 glow-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-white/5",
            )}
          >
            {active && (
              <motion.span
                layoutId="mode-chip-glow"
                className="absolute inset-0 rounded-full"
                style={{ background: "linear-gradient(135deg, oklch(0.62 0.22 290 / 0.35), oklch(0.78 0.16 200 / 0.25))" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{m.emoji}</span>
            <span className="relative z-10 font-medium tracking-tight">{m.label}</span>
          </button>
        );
      })}
    </div>
  );
}
