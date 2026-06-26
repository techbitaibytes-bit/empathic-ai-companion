import { n as GlassCard, r as GlowButton } from "./AnimatedBackground-BeCIfK8k.js";
import { n as STORAGE_KEYS, r as useLocalStorage } from "./TopBar-BJq6YPo0.js";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { motion } from "motion/react";
//#region src/components/MoodLogger.tsx
var MOODS = [
	{
		emoji: "😞",
		label: "Down"
	},
	{
		emoji: "😟",
		label: "Anxious"
	},
	{
		emoji: "😐",
		label: "Flat"
	},
	{
		emoji: "😊",
		label: "Okay"
	},
	{
		emoji: "😌",
		label: "Calm"
	},
	{
		emoji: "🤩",
		label: "Bright"
	}
];
function MoodLogger() {
	const [moods, setMoods] = useLocalStorage(STORAGE_KEYS.moods, []);
	const [selected, setSelected] = useState(null);
	const [intensity, setIntensity] = useState(5);
	const [note, setNote] = useState("");
	const save = () => {
		if (selected === null) return;
		const m = MOODS[selected];
		setMoods([{
			id: crypto.randomUUID(),
			ts: Date.now(),
			emoji: m.emoji,
			label: m.label,
			intensity,
			note: note.trim() || void 0
		}, ...moods].slice(0, 100));
		setSelected(null);
		setNote("");
		setIntensity(5);
		try {
			toast.success("Mood logged 💜");
		} catch {}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
				className: "text-sm font-semibold tracking-wide uppercase text-muted-foreground",
				children: "How are you, really?"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs text-muted-foreground/80",
				children: "Tap an orb. No judgment."
			})] }),
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-3 gap-3",
				children: MOODS.map((m, i) => {
					const active = selected === i;
					return /* @__PURE__ */ jsxs(motion.button, {
						whileHover: { scale: 1.08 },
						whileTap: { scale: .95 },
						onClick: () => setSelected(i),
						className: "group relative flex flex-col items-center gap-1 rounded-2xl p-3 transition-colors",
						style: { background: active ? "radial-gradient(circle at 50% 30%, oklch(0.62 0.22 290 / 0.45), oklch(0.62 0.22 290 / 0.1) 60%, transparent 75%)" : "transparent" },
						children: [/* @__PURE__ */ jsx("span", {
							className: `text-3xl transition-all duration-300 ${active ? "drop-shadow-[0_0_18px_oklch(0.78_0.16_200/0.7)]" : "group-hover:scale-110"}`,
							children: m.emoji
						}), /* @__PURE__ */ jsx("span", {
							className: "text-[10px] tracking-wide text-muted-foreground",
							children: m.label
						})]
					}, m.label);
				})
			}),
			/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between text-xs text-muted-foreground",
					children: [/* @__PURE__ */ jsx("span", { children: "Intensity" }), /* @__PURE__ */ jsx("span", {
						className: "font-mono text-foreground",
						children: intensity
					})]
				}),
				/* @__PURE__ */ jsx("input", {
					type: "range",
					min: 1,
					max: 10,
					value: intensity,
					onChange: (e) => setIntensity(Number(e.target.value)),
					className: "mood-slider mt-2 w-full",
					style: {
						appearance: "none",
						height: 8,
						borderRadius: 999,
						background: `linear-gradient(90deg, oklch(0.62 0.22 290) 0%, oklch(0.78 0.16 200) ${intensity * 10}%, oklch(0.25 0.04 275) ${intensity * 10}%)`
					}
				}),
				/* @__PURE__ */ jsx("style", { children: `
          .mood-slider::-webkit-slider-thumb { appearance: none; width: 22px; height: 22px; border-radius: 999px; background: white; box-shadow: 0 0 16px 2px oklch(0.78 0.16 200 / 0.8); cursor: pointer; border: 2px solid oklch(0.78 0.16 200); }
          .mood-slider::-moz-range-thumb { width: 22px; height: 22px; border-radius: 999px; background: white; box-shadow: 0 0 16px 2px oklch(0.78 0.16 200 / 0.8); cursor: pointer; border: 2px solid oklch(0.78 0.16 200); }
        ` })
			] }),
			/* @__PURE__ */ jsx("textarea", {
				value: note,
				onChange: (e) => setNote(e.target.value),
				placeholder: "One sentence about why? (optional)",
				rows: 2,
				className: "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring"
			}),
			/* @__PURE__ */ jsx(GlowButton, {
				size: "sm",
				onClick: save,
				disabled: selected === null,
				children: "Log mood"
			}),
			moods.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("h4", {
					className: "mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
					children: "Recent"
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex flex-col gap-2 max-h-56 overflow-y-auto pr-1",
					children: moods.slice(0, 6).map((e) => /* @__PURE__ */ jsxs(GlassCard, {
						className: "p-3 text-xs",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ jsxs("span", { children: [
								/* @__PURE__ */ jsx("span", {
									className: "mr-2 text-base",
									children: e.emoji
								}),
								/* @__PURE__ */ jsx("span", {
									className: "font-medium",
									children: e.label
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "ml-2 text-muted-foreground",
									children: [
										"·",
										e.intensity,
										"/10"
									]
								})
							] }), /* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground",
								children: new Date(e.ts).toLocaleString([], {
									dateStyle: "short",
									timeStyle: "short"
								})
							})]
						}), e.note && /* @__PURE__ */ jsx("p", {
							className: "mt-1 text-muted-foreground",
							children: e.note
						})]
					}, e.id))
				}),
				moods.length >= 2 && /* @__PURE__ */ jsx(MoodSparkline, { moods: moods.slice(0, 14).reverse() }),
				moods.length >= 3 && /* @__PURE__ */ jsx(MoodInsights, { moods })
			] })
		]
	});
}
function MoodSparkline({ moods }) {
	const max = 10;
	const w = 280;
	const h = 80;
	const plotHeight = h - 20;
	const pts = moods.map((m, i) => {
		return `${moods.length > 1 ? i / (moods.length - 1) * w : w / 2},${h - m.intensity / max * plotHeight}`;
	}).join(" ");
	return /* @__PURE__ */ jsxs("div", {
		className: "mt-4",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2",
			children: "Mood trend"
		}), /* @__PURE__ */ jsxs("svg", {
			viewBox: `0 0 ${w} ${h}`,
			className: "w-full rounded-xl overflow-hidden",
			style: { background: "oklch(0.15 0.04 275 / 0.5)" },
			children: [
				/* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", {
					id: "mg",
					x1: "0",
					y1: "0",
					x2: "1",
					y2: "0",
					children: [/* @__PURE__ */ jsx("stop", {
						offset: "0%",
						stopColor: "oklch(0.62 0.22 290)"
					}), /* @__PURE__ */ jsx("stop", {
						offset: "100%",
						stopColor: "oklch(0.78 0.16 200)"
					})]
				}) }),
				/* @__PURE__ */ jsx("polyline", {
					points: pts,
					fill: "none",
					stroke: "url(#mg)",
					strokeWidth: "2.5",
					strokeLinecap: "round",
					strokeLinejoin: "round"
				}),
				moods.map((m, i) => {
					const x = moods.length > 1 ? i / (moods.length - 1) * w : w / 2;
					const pointY = h - m.intensity / max * plotHeight;
					const emojiY = pointY - 10;
					return /* @__PURE__ */ jsxs("g", { children: [/* @__PURE__ */ jsx("circle", {
						cx: x,
						cy: pointY,
						r: 3,
						fill: "oklch(0.78 0.16 200)"
					}), /* @__PURE__ */ jsx("text", {
						x,
						y: emojiY,
						textAnchor: "middle",
						fontSize: "14",
						style: { userSelect: "none" },
						children: m.emoji
					})] }, i);
				})
			]
		})]
	});
}
function MoodInsights({ moods }) {
	const [insight, setInsight] = useState(null);
	const [loading, setLoading] = useState(false);
	const weekAgo = Date.now() - 10080 * 60 * 1e3;
	const weekMoods = moods.filter((m) => m.ts > weekAgo);
	if (weekMoods.length < 3) return null;
	const moodCounts = {};
	weekMoods.forEach((m) => {
		moodCounts[m.label] = (moodCounts[m.label] || 0) + 1;
	});
	const mostFrequent = Object.entries(moodCounts).sort(([, a], [, b]) => b - a)[0];
	const mostFrequentMood = weekMoods.find((m) => m.label === mostFrequent[0]);
	const avgIntensity = Math.round(weekMoods.reduce((sum, m) => sum + m.intensity, 0) / weekMoods.length);
	useEffect(() => {
		const generateInsight = async () => {
			setLoading(true);
			try {
				const moodyStr = weekMoods.slice(0, 5).map((m) => `${m.emoji} ${m.label} (${m.intensity}/10)`).join(", ");
				const res = await fetch("/api/chat", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						messages: [{
							role: "user",
							content: `Based on this week's moods: ${moodyStr}. Give a one-sentence compassionate observation about their emotional week. Keep it under 15 words.`
						}],
						systemPrompt: "You are EmpathAI. Provide warm, brief insights about emotional patterns."
					})
				});
				if (!res.ok || !res.body) throw new Error("AI error");
				const reader = res.body.getReader();
				const decoder = new TextDecoder();
				let acc = "";
				while (true) {
					const { value, done } = await reader.read();
					if (done) break;
					acc += decoder.decode(value, { stream: true });
				}
				setInsight(acc.trim());
			} catch (e) {
				setInsight(null);
			} finally {
				setLoading(false);
			}
		};
		generateInsight();
	}, []);
	return /* @__PURE__ */ jsxs("div", {
		className: "mt-4 rounded-xl glass px-4 py-3",
		children: [/* @__PURE__ */ jsx("h4", {
			className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2",
			children: "Your week"
		}), /* @__PURE__ */ jsxs("div", {
			className: "space-y-2 text-xs",
			children: [
				mostFrequentMood && /* @__PURE__ */ jsxs("p", { children: [
					/* @__PURE__ */ jsx("span", {
						className: "text-sm",
						children: mostFrequentMood.emoji
					}),
					" Most:",
					" ",
					/* @__PURE__ */ jsx("span", {
						className: "font-medium",
						children: mostFrequentMood.label
					})
				] }),
				/* @__PURE__ */ jsxs("p", { children: [
					"Average intensity:",
					" ",
					/* @__PURE__ */ jsxs("span", {
						className: "font-medium",
						children: [avgIntensity, "/10"]
					})
				] }),
				insight && /* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground italic",
					children: loading ? "..." : insight
				})
			]
		})]
	});
}
//#endregion
export { MoodSparkline as n, MoodLogger as t };
