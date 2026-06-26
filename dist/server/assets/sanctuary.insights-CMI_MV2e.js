import { n as GlassCard, r as GlowButton, t as AnimatedBackground } from "./AnimatedBackground-BeCIfK8k.js";
import { n as STORAGE_KEYS, r as useLocalStorage, t as TopBar } from "./TopBar-BJq6YPo0.js";
import { n as MoodSparkline } from "./MoodLogger-B0t3VJkD.js";
import { useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, BarChart3, Trash2 } from "lucide-react";
//#region src/routes/sanctuary.insights.tsx?tsr-split=component
function InsightsPage() {
	const [moods, setMoods] = useLocalStorage(STORAGE_KEYS.moods, []);
	const [confirming, setConfirming] = useState(false);
	const weekAgo = Date.now() - 10080 * 60 * 1e3;
	const weekMoods = useMemo(() => moods.filter((m) => m.ts > weekAgo), [moods, weekAgo]);
	const mostCommon = useMemo(() => {
		if (!weekMoods.length) return null;
		const counts = weekMoods.reduce((acc, mood) => {
			acc[mood.label] = (acc[mood.label] ?? 0) + 1;
			return acc;
		}, {});
		const [label, count] = Object.entries(counts).sort(([, a], [, b]) => b - a)[0] ?? [];
		const entry = weekMoods.find((m) => m.label === label);
		return entry ? {
			label,
			count,
			emoji: entry.emoji
		} : null;
	}, [weekMoods]);
	const averageIntensity = useMemo(() => {
		if (!weekMoods.length) return 0;
		return Math.round(weekMoods.reduce((sum, mood) => sum + mood.intensity, 0) / weekMoods.length);
	}, [weekMoods]);
	const clearHistory = () => {
		setMoods([]);
		setConfirming(false);
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(AnimatedBackground, {}),
		/* @__PURE__ */ jsx(TopBar, {}),
		/* @__PURE__ */ jsx("div", {
			className: "flex-1 px-4 lg:px-6 py-4 pb-28 md:pb-4",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto flex max-w-6xl flex-col gap-4",
				children: [
					/* @__PURE__ */ jsx(GlassCard, {
						strong: true,
						glow: "accent",
						className: "p-6 border-accent/30",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
								className: "text-2xl font-semibold tracking-tight",
								children: "Your Mood Journey"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "A calm private timeline of how you’ve felt, stored only on this device."
							})] }), /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ jsx(BarChart3, { className: "h-4 w-4 text-accent" }), /* @__PURE__ */ jsxs("span", { children: [moods.length, " total entries"] })]
							})]
						})
					}),
					/* @__PURE__ */ jsx(GlassCard, {
						strong: true,
						className: "p-5",
						children: moods.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
							className: "mb-4",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground",
								children: "Mood trend"
							}), /* @__PURE__ */ jsx("div", {
								className: "mt-3 rounded-2xl border border-white/10 bg-white/5 p-3",
								children: /* @__PURE__ */ jsx(MoodSparkline, { moods: [...moods].slice(0, 14).reverse() })
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "grid gap-3 md:grid-cols-3",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "rounded-2xl border border-white/10 bg-white/5 p-4",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground",
										children: "Total check-ins this week"
									}), /* @__PURE__ */ jsx("p", {
										className: "mt-2 text-2xl font-semibold",
										children: weekMoods.length
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "rounded-2xl border border-white/10 bg-white/5 p-4",
									children: [
										/* @__PURE__ */ jsx("p", {
											className: "text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground",
											children: "Most common mood"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "mt-2 text-2xl font-semibold",
											children: mostCommon ? `${mostCommon.emoji} ${mostCommon.label}` : "—"
										}),
										mostCommon && /* @__PURE__ */ jsxs("p", {
											className: "mt-1 text-xs text-muted-foreground",
											children: [mostCommon.count, " entries"]
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "rounded-2xl border border-white/10 bg-white/5 p-4",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground",
										children: "Average intensity this week"
									}), /* @__PURE__ */ jsxs("p", {
										className: "mt-2 text-2xl font-semibold",
										children: [averageIntensity, "/10"]
									})]
								})
							]
						})] }) : /* @__PURE__ */ jsx("div", {
							className: "rounded-2xl border border-dashed border-white/10 bg-white/5 p-8 text-center text-sm text-muted-foreground",
							children: "Start logging moods in the chat to see your journey here."
						})
					}),
					/* @__PURE__ */ jsxs(GlassCard, {
						strong: true,
						className: "p-5",
						children: [/* @__PURE__ */ jsx("div", {
							className: "flex items-center justify-between gap-3",
							children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
								className: "text-lg font-semibold tracking-tight",
								children: "All mood entries"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground",
								children: "A private timeline of how you've felt."
							})] })
						}), moods.length > 0 ? /* @__PURE__ */ jsx("div", {
							className: "mt-4 space-y-3",
							children: moods.map((entry) => /* @__PURE__ */ jsxs("div", {
								className: "rounded-2xl border border-white/10 bg-white/5 p-4",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap items-center justify-between gap-2",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-2xl",
											children: entry.emoji
										}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "font-medium",
											children: entry.label
										}), /* @__PURE__ */ jsx("p", {
											className: "text-xs text-muted-foreground",
											children: new Date(entry.ts).toLocaleString()
										})] })]
									}), /* @__PURE__ */ jsxs("div", {
										className: "text-right text-xs text-muted-foreground",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "font-medium text-foreground",
											children: [entry.intensity, "/10"]
										}), /* @__PURE__ */ jsx("div", {
											className: "mt-1 h-2 w-24 rounded-full bg-white/10",
											children: /* @__PURE__ */ jsx("div", {
												className: "h-2 rounded-full bg-gradient-to-r from-accent to-primary",
												style: { width: `${entry.intensity / 10 * 100}%` }
											})
										})]
									})]
								}), entry.note && /* @__PURE__ */ jsx("p", {
									className: "mt-3 text-sm text-muted-foreground",
									children: entry.note
								})]
							}, entry.id))
						}) : /* @__PURE__ */ jsx("div", {
							className: "mt-4 rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-sm text-muted-foreground",
							children: "No mood entries yet."
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex justify-end",
						children: !confirming ? /* @__PURE__ */ jsxs(GlowButton, {
							variant: "ghost",
							size: "sm",
							onClick: () => setConfirming(true),
							children: [/* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }), "Clear mood history"]
						}) : /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive",
							children: [
								/* @__PURE__ */ jsx(AlertTriangle, { className: "h-4 w-4" }),
								"Delete all mood entries?",
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: clearHistory,
									className: "font-semibold underline underline-offset-4",
									children: "Yes"
								}),
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => setConfirming(false),
									className: "font-semibold",
									children: "Cancel"
								})
							]
						})
					})
				]
			})
		})
	] });
}
//#endregion
export { InsightsPage as component };
