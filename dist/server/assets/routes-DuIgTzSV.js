import { n as GlassCard, r as GlowButton, t as AnimatedBackground } from "./AnimatedBackground-BeCIfK8k.js";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
import { ArrowRight, Compass, Eye, Heart, MoonStar, ShieldCheck, Sparkles } from "lucide-react";
//#region src/routes/index.tsx?tsr-split=component
function Landing() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(AnimatedBackground, {}), /* @__PURE__ */ jsxs("main", {
		className: "relative min-h-screen flex flex-col",
		children: [
			/* @__PURE__ */ jsxs("nav", {
				className: "flex items-center justify-between px-6 lg:px-12 py-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsx("div", {
						className: "grid h-10 w-10 place-items-center rounded-2xl shimmer-border",
						style: { background: "var(--gradient-cta)" },
						children: /* @__PURE__ */ jsx(Heart, {
							className: "h-4 w-4 text-white",
							fill: "white"
						})
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
						className: "font-semibold tracking-tight",
						children: "EmpathAI"
					}), /* @__PURE__ */ jsx("div", {
						className: "text-[11px] uppercase tracking-[0.24em] text-muted-foreground",
						children: "Soft Twilight Sanctuary"
					})] })]
				}), /* @__PURE__ */ jsx(Link, {
					to: "/sanctuary/chat",
					className: "text-sm text-muted-foreground hover:text-foreground transition",
					children: "Enter sanctuary →"
				})]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "flex-1 flex flex-col items-center justify-center px-6 text-center py-20",
				children: [/* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						y: 14
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .7,
						ease: "easeOut"
					},
					className: "max-w-4xl",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "mb-6 inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_oklch(0.78_0.16_200/0.8)]" }), "Built with care • Privacy-first • Not a replacement for professional help"]
						}),
						/* @__PURE__ */ jsxs("h1", {
							className: "text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.04em] leading-[1.02]",
							children: [
								"A soft place to",
								/* @__PURE__ */ jsx("br", { className: "hidden sm:block" }),
								/* @__PURE__ */ jsx("span", {
									className: "gradient-text",
									children: "feel understood"
								}),
								"."
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-7 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed",
							children: "EmpathAI is a calm, private sanctuary for teens and young adults — with a mood mirror, healing toolkit, and local crisis support that feel warm, practical, and genuinely human."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-10 flex flex-wrap items-center justify-center gap-3",
							children: [/* @__PURE__ */ jsx(Link, {
								to: "/sanctuary/chat",
								children: /* @__PURE__ */ jsxs(GlowButton, {
									size: "lg",
									className: "breathe",
									children: ["Enter Sanctuary ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
								})
							}), /* @__PURE__ */ jsx(Link, {
								to: "/sanctuary/crisis",
								className: "rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-muted-foreground transition hover:border-accent/40 hover:text-foreground",
								children: "Need urgent support?"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-2 rounded-full glass px-3 py-1.5",
									children: [/* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4 text-accent" }), " Private by design"]
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-2 rounded-full glass px-3 py-1.5",
									children: [/* @__PURE__ */ jsx(MoonStar, { className: "h-4 w-4 text-accent" }), " Calm, nonjudgmental support"]
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-2 rounded-full glass px-3 py-1.5",
									children: [/* @__PURE__ */ jsx(Compass, { className: "h-4 w-4 text-accent" }), " Neurodiverse-friendly tools"]
								})
							]
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-5xl",
					children: [
						{
							icon: Heart,
							title: "Six gentle modes",
							body: "Switch between listener, coach, reflective, and caring support styles without losing the thread of the conversation."
						},
						{
							icon: Eye,
							title: "Mood Mirror",
							body: "Optional, on-device emotion sensing from your webcam with no uploads and a calm, private readout."
						},
						{
							icon: Sparkles,
							title: "Healing toolkit",
							body: "Body doubling, task breakdown, grounding, breathing, and soft affirmations built for real moments."
						}
					].map((b, i) => /* @__PURE__ */ jsx(motion.div, {
						initial: {
							opacity: 0,
							y: 12
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							delay: .25 + i * .1,
							duration: .6
						},
						children: /* @__PURE__ */ jsxs(GlassCard, {
							className: "p-6 h-full text-left hover:-translate-y-1 transition-transform",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "mb-3 grid h-10 w-10 place-items-center rounded-xl glass-strong",
									children: /* @__PURE__ */ jsx(b.icon, { className: "h-5 w-5 text-accent" })
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "font-semibold tracking-tight",
									children: b.title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-2 text-sm text-muted-foreground leading-relaxed",
									children: b.body
								})
							]
						})
					}, b.title))
				})]
			}),
			/* @__PURE__ */ jsx("footer", {
				className: "text-center py-8 text-xs text-muted-foreground/70",
				children: "Not a substitute for professional care. Stored privately in your browser."
			})
		]
	})] });
}
//#endregion
export { Landing as component };
