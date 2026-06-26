import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: "none" | "primary" | "accent" | "soft";
  strong?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(function GlassCard(
  { glow = "none", strong = false, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        strong ? "glass-strong" : "glass",
        "rounded-[1.5rem] transition-all duration-300",
        glow === "primary" && "glow-primary",
        glow === "accent" && "glow-accent",
        glow === "soft" && "glow-soft",
        className,
      )}
      {...rest}
    />
  );
});
