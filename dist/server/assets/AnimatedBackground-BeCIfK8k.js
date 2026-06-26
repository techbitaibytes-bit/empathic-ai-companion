import { t as cn } from "./utils-C_uf36nf.js";
import { forwardRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/GlowButton.tsx
var GlowButton = forwardRef(function GlowButton({ variant = "primary", size = "md", ripple = true, className, children, onClick, ...rest }, ref) {
	const [ripples, setRipples] = useState([]);
	return /* @__PURE__ */ jsxs("button", {
		ref,
		onClick: (e) => {
			if (ripple) {
				const rect = e.currentTarget.getBoundingClientRect();
				const id = Date.now() + Math.random();
				setRipples((r) => [...r, {
					id,
					x: e.clientX - rect.left,
					y: e.clientY - rect.top
				}]);
				setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 700);
			}
			onClick?.(e);
		},
		className: cn("relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight", "transition-all duration-300 will-change-transform", "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background", {
			sm: "h-9 px-4 text-sm",
			md: "h-11 px-6 text-sm",
			lg: "h-14 px-8 text-base"
		}[size], {
			primary: "text-primary-foreground border border-white/20 [background-image:var(--gradient-cta)] glow-primary hover:brightness-110 hover:shadow-[0_20px_45px_-18px_oklch(0.62_0.22_290/0.8)]",
			accent: "text-accent-foreground border border-white/20 bg-accent glow-accent hover:brightness-110 hover:shadow-[0_20px_45px_-18px_oklch(0.78_0.16_200/0.8)]",
			ghost: "text-foreground glass hover:bg-white/10"
		}[variant], className),
		...rest,
		children: [/* @__PURE__ */ jsx("span", {
			className: "relative z-10 inline-flex items-center gap-2",
			children
		}), ripples.map((r) => /* @__PURE__ */ jsx("span", {
			className: "pointer-events-none absolute rounded-full bg-white/40",
			style: {
				left: r.x - 6,
				top: r.y - 6,
				width: 12,
				height: 12,
				animation: "ripple 0.7s ease-out forwards"
			}
		}, r.id))]
	});
});
//#endregion
//#region src/components/GlassCard.tsx
var GlassCard = forwardRef(function GlassCard({ glow = "none", strong = false, className, ...rest }, ref) {
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn(strong ? "glass-strong" : "glass", "rounded-[1.5rem] transition-all duration-300", glow === "primary" && "glow-primary", glow === "accent" && "glow-accent", glow === "soft" && "glow-soft", className),
		...rest
	});
});
//#endregion
//#region src/components/AnimatedBackground.tsx
function AnimatedBackground() {
	return /* @__PURE__ */ jsxs("div", {
		"aria-hidden": true,
		className: "pointer-events-none fixed inset-0 -z-10 overflow-hidden sanctuary-bg",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "absolute -top-32 -left-32 h-[42rem] w-[42rem] rounded-full blur-3xl opacity-50 float-slow",
				style: { background: "radial-gradient(circle at center, oklch(0.55 0.24 290 / 0.55), transparent 60%)" }
			}),
			/* @__PURE__ */ jsx("div", {
				className: "absolute top-1/3 -right-40 h-[36rem] w-[36rem] rounded-full blur-3xl opacity-40 float-slow",
				style: {
					background: "radial-gradient(circle at center, oklch(0.65 0.18 200 / 0.5), transparent 60%)",
					animationDelay: "-5s"
				}
			}),
			/* @__PURE__ */ jsx("div", {
				className: "absolute -bottom-40 left-1/4 h-[34rem] w-[34rem] rounded-full blur-3xl opacity-40 float-slow",
				style: {
					background: "radial-gradient(circle at center, oklch(0.70 0.14 305 / 0.5), transparent 60%)",
					animationDelay: "-9s"
				}
			}),
			/* @__PURE__ */ jsxs("svg", {
				className: "absolute inset-0 h-full w-full opacity-[0.18] mix-blend-screen",
				xmlns: "http://www.w3.org/2000/svg",
				children: [/* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("pattern", {
					id: "stars",
					x: "0",
					y: "0",
					width: "120",
					height: "120",
					patternUnits: "userSpaceOnUse",
					children: [
						/* @__PURE__ */ jsx("circle", {
							cx: "10",
							cy: "20",
							r: "0.6",
							fill: "white"
						}),
						/* @__PURE__ */ jsx("circle", {
							cx: "60",
							cy: "80",
							r: "0.4",
							fill: "white"
						}),
						/* @__PURE__ */ jsx("circle", {
							cx: "100",
							cy: "40",
							r: "0.5",
							fill: "white"
						}),
						/* @__PURE__ */ jsx("circle", {
							cx: "30",
							cy: "100",
							r: "0.35",
							fill: "white"
						}),
						/* @__PURE__ */ jsx("circle", {
							cx: "80",
							cy: "10",
							r: "0.45",
							fill: "white"
						})
					]
				}) }), /* @__PURE__ */ jsx("rect", {
					width: "100%",
					height: "100%",
					fill: "url(#stars)"
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "absolute inset-0 opacity-[0.04]",
				style: {
					backgroundImage: "radial-gradient(oklch(1 0 0) 1px, transparent 1px)",
					backgroundSize: "3px 3px"
				}
			})
		]
	});
}
//#endregion
export { GlassCard as n, GlowButton as r, AnimatedBackground as t };
