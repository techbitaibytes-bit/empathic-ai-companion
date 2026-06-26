import { forwardRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  ripple?: boolean;
  children: ReactNode;
}

interface Ripple { id: number; x: number; y: number; }

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(function GlowButton(
  { variant = "primary", size = "md", ripple = true, className, children, onClick, ...rest },
  ref,
) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-sm",
    lg: "h-14 px-8 text-base",
  } as const;

  const variants = {
    primary:
      "text-primary-foreground border border-white/20 [background-image:var(--gradient-cta)] glow-primary hover:brightness-110 hover:shadow-[0_20px_45px_-18px_oklch(0.62_0.22_290/0.8)]",
    accent:
      "text-accent-foreground border border-white/20 bg-accent glow-accent hover:brightness-110 hover:shadow-[0_20px_45px_-18px_oklch(0.78_0.16_200/0.8)]",
    ghost: "text-foreground glass hover:bg-white/10",
  } as const;

  return (
    <button
      ref={ref}
      onClick={(e) => {
        if (ripple) {
          const rect = e.currentTarget.getBoundingClientRect();
          const id = Date.now() + Math.random();
          setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
          setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 700);
        }
        onClick?.(e);
      }}
      className={cn(
        "relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight",
        "transition-all duration-300 will-change-transform",
        "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        sizes[size],
        variants[variant],
        className,
      )}
      {...rest}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute rounded-full bg-white/40"
          style={{ left: r.x - 6, top: r.y - 6, width: 12, height: 12, animation: "ripple 0.7s ease-out forwards" }}
        />
      ))}
    </button>
  );
});
