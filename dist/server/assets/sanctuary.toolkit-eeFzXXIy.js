import { t as cn } from "./utils-C_uf36nf.js";
import { n as GlassCard, r as GlowButton, t as AnimatedBackground } from "./AnimatedBackground-BeCIfK8k.js";
import { n as STORAGE_KEYS, r as useLocalStorage, t as TopBar } from "./TopBar-BJq6YPo0.js";
import { useEffect, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion } from "motion/react";
import { Clipboard, Clock, Hand, Heart, Moon, Music, Sparkles, Users, Wind } from "lucide-react";
import ReactMarkdown from "react-markdown";
//#region src/routes/sanctuary.toolkit.tsx?tsr-split=component
var TOOLS = [
	{
		id: "breath",
		title: "Box Breathing",
		blurb: "4-4-4-4. Slow your nervous system.",
		icon: Wind
	},
	{
		id: "ground",
		title: "5-4-3-2-1",
		blurb: "Anchor yourself in the room.",
		icon: Hand
	},
	{
		id: "gratitude",
		title: "Gratitude",
		blurb: "Three small things, right now.",
		icon: Heart
	},
	{
		id: "affirm",
		title: "Affirmations",
		blurb: "Words to soften the day.",
		icon: Sparkles
	},
	{
		id: "bodyscan",
		title: "Body Scan",
		blurb: "Tour your body, head to toe.",
		icon: Moon
	},
	{
		id: "sound",
		title: "Soundscape",
		blurb: "Gentle audio cues.",
		icon: Music
	},
	{
		id: "task",
		title: "Task Breakdown",
		blurb: "Turn one task into tiny micro-steps.",
		icon: Clipboard
	},
	{
		id: "bodyDouble",
		title: "Body Doubling",
		blurb: "I’m here while you work.",
		icon: Users
	},
	{
		id: "timer",
		title: "Transition Timer",
		blurb: "5-minute change with a gentle message.",
		icon: Clock
	}
];
function ToolkitPage() {
	const [active, setActive] = useState(null);
	const [hovered, setHovered] = useState(null);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(AnimatedBackground, {}),
		/* @__PURE__ */ jsx(TopBar, {}),
		/* @__PURE__ */ jsxs("div", {
			className: "flex-1 grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-4 px-4 lg:px-6 py-4 pb-28 md:pb-4",
			children: [/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-2xl sm:text-3xl font-semibold tracking-tight px-1",
					children: "Healing Toolkit"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-1 text-sm text-muted-foreground px-1",
					children: "Pick a gentle tool for the moment you’re in. Small steps count."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3",
					children: TOOLS.map((t) => {
						const Icon = t.icon;
						const isActive = active === t.id;
						return /* @__PURE__ */ jsx(motion.button, {
							whileHover: { y: -3 },
							whileTap: { scale: .98 },
							onClick: () => setActive(t.id),
							onMouseEnter: () => setHovered(t.id),
							onMouseLeave: () => setHovered(null),
							className: "text-left",
							style: { boxShadow: hovered === t.id ? "var(--shadow-glow-accent)" : void 0 },
							children: /* @__PURE__ */ jsxs(GlassCard, {
								glow: isActive ? "primary" : "none",
								className: cn("p-5 transition-all", isActive && "border-primary/40", isActive && "shimmer-border"),
								children: [
									/* @__PURE__ */ jsx("div", {
										className: cn("mb-3 grid h-10 w-10 place-items-center rounded-xl glass-strong", isActive && "glow-accent"),
										children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 text-accent" })
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "font-semibold tracking-tight",
										children: t.title
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: t.blurb
									})
								]
							})
						}, t.id);
					})
				})
			] }), /* @__PURE__ */ jsx("aside", {
				className: "xl:sticky xl:top-24 xl:self-start",
				children: /* @__PURE__ */ jsx(GlassCard, {
					strong: true,
					className: "p-6 min-h-[24rem]",
					children: /* @__PURE__ */ jsxs(AnimatePresence, {
						mode: "wait",
						children: [
							active === null && /* @__PURE__ */ jsx(motion.div, {
								initial: { opacity: 0 },
								animate: { opacity: 1 },
								exit: { opacity: 0 },
								className: "h-full grid place-items-center text-center text-sm text-muted-foreground",
								children: "Pick a tool to begin."
							}, "empty"),
							active === "breath" && /* @__PURE__ */ jsx(ToolWrapper, { children: /* @__PURE__ */ jsx(BoxBreath, {}) }, "b"),
							active === "ground" && /* @__PURE__ */ jsx(ToolWrapper, { children: /* @__PURE__ */ jsx(Grounding, {}) }, "g"),
							active === "gratitude" && /* @__PURE__ */ jsx(ToolWrapper, { children: /* @__PURE__ */ jsx(Gratitude, {}) }, "gr"),
							active === "affirm" && /* @__PURE__ */ jsx(ToolWrapper, { children: /* @__PURE__ */ jsx(Affirmations, {}) }, "a"),
							active === "bodyscan" && /* @__PURE__ */ jsx(ToolWrapper, { children: /* @__PURE__ */ jsx(BodyScan, {}) }, "bs"),
							active === "sound" && /* @__PURE__ */ jsx(ToolWrapper, { children: /* @__PURE__ */ jsx(Soundscape, {}) }, "s"),
							active === "task" && /* @__PURE__ */ jsx(ToolWrapper, { children: /* @__PURE__ */ jsx(TaskBreakdown, {}) }, "t"),
							active === "bodyDouble" && /* @__PURE__ */ jsx(ToolWrapper, { children: /* @__PURE__ */ jsx(BodyDoubling, {}) }, "bd"),
							active === "timer" && /* @__PURE__ */ jsx(ToolWrapper, { children: /* @__PURE__ */ jsx(TransitionTimer, {}) }, "tt")
						]
					})
				})
			})]
		})
	] });
}
function ToolWrapper({ children }) {
	return /* @__PURE__ */ jsx(motion.div, {
		initial: {
			opacity: 0,
			y: 8
		},
		animate: {
			opacity: 1,
			y: 0
		},
		exit: {
			opacity: 0,
			y: -8
		},
		transition: { duration: .25 },
		children
	});
}
function BoxBreath() {
	const [running, setRunning] = useState(false);
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center text-center",
		children: [
			/* @__PURE__ */ jsx("h3", {
				className: "text-lg font-semibold tracking-tight",
				children: "Box Breathing"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-sm text-muted-foreground mt-1",
				children: "Inhale 4 · Hold 4 · Exhale 4 · Hold 4"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative my-8 grid place-items-center",
				children: [/* @__PURE__ */ jsx(motion.div, {
					className: "h-44 w-44 rounded-full",
					style: {
						background: "radial-gradient(circle at 50% 50%, oklch(0.62 0.22 290 / 0.6), oklch(0.78 0.16 200 / 0.2) 70%, transparent)",
						boxShadow: "var(--shadow-glow-primary)"
					},
					animate: running ? { scale: [
						1,
						1.35,
						1.35,
						1,
						1
					] } : { scale: 1 },
					transition: running ? {
						duration: 16,
						repeat: Infinity,
						ease: "easeInOut",
						times: [
							0,
							.25,
							.5,
							.75,
							1
						]
					} : {}
				}), /* @__PURE__ */ jsx(motion.span, {
					className: "absolute text-sm font-medium tracking-wide uppercase",
					animate: { opacity: 1 },
					children: "breathe"
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ jsx(GlowButton, {
					size: "sm",
					onClick: () => setRunning(true),
					disabled: running,
					children: "Begin"
				}), /* @__PURE__ */ jsx(GlowButton, {
					size: "sm",
					variant: "ghost",
					onClick: () => setRunning(false),
					disabled: !running,
					children: "Stop"
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground mt-3",
				children: "Follow the orb. Five rounds is plenty."
			})
		]
	});
}
function Grounding() {
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx("h3", {
			className: "text-lg font-semibold tracking-tight",
			children: "5-4-3-2-1 Grounding"
		}),
		/* @__PURE__ */ jsx("p", {
			className: "text-sm text-muted-foreground mt-1",
			children: "Name them softly to yourself."
		}),
		/* @__PURE__ */ jsx("ol", {
			className: "mt-5 flex flex-col gap-2",
			children: [
				{
					n: 5,
					sense: "see"
				},
				{
					n: 4,
					sense: "feel"
				},
				{
					n: 3,
					sense: "hear"
				},
				{
					n: 2,
					sense: "smell"
				},
				{
					n: 1,
					sense: "taste"
				}
			].map((s) => /* @__PURE__ */ jsxs("li", {
				className: "flex items-center gap-3 rounded-xl glass px-3 py-3",
				children: [/* @__PURE__ */ jsx("span", {
					className: "grid h-9 w-9 place-items-center rounded-lg font-mono text-sm bg-accent/15 text-accent border border-accent/30",
					children: s.n
				}), /* @__PURE__ */ jsxs("span", {
					className: "text-sm",
					children: ["things you can ", /* @__PURE__ */ jsx("span", {
						className: "font-semibold capitalize gradient-text",
						children: s.sense
					})]
				})]
			}, s.n))
		})
	] });
}
function Gratitude() {
	const [items, setItems] = useLocalStorage(STORAGE_KEYS.gratitude, []);
	const [text, setText] = useState("");
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx("h3", {
			className: "text-lg font-semibold tracking-tight",
			children: "Gratitude"
		}),
		/* @__PURE__ */ jsx("p", {
			className: "text-sm text-muted-foreground mt-1",
			children: "Tiny things count most."
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mt-4 flex gap-2",
			children: [/* @__PURE__ */ jsx("input", {
				value: text,
				onChange: (e) => setText(e.target.value),
				onKeyDown: (e) => {
					if (e.key === "Enter" && text.trim()) {
						setItems([{
							id: crypto.randomUUID(),
							text: text.trim(),
							ts: Date.now()
						}, ...items].slice(0, 50));
						setText("");
					}
				},
				placeholder: "The warmth of my mug…",
				className: "flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
			}), /* @__PURE__ */ jsx(GlowButton, {
				size: "sm",
				disabled: !text.trim(),
				onClick: () => {
					setItems([{
						id: crypto.randomUUID(),
						text: text.trim(),
						ts: Date.now()
					}, ...items].slice(0, 50));
					setText("");
				},
				children: "Add"
			})]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mt-4 flex flex-col gap-2 max-h-72 overflow-y-auto pr-1",
			children: [items.map((g) => /* @__PURE__ */ jsx("div", {
				className: "rounded-xl glass px-3 py-2 text-sm",
				children: g.text
			}, g.id)), items.length === 0 && /* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground/70",
				children: "Nothing yet. Even one thing helps."
			})]
		})
	] });
}
function Affirmations() {
	const LINES = [
		"I'm allowed to take up space.",
		"This feeling is information, not a verdict.",
		"I can do hard things, slowly.",
		"My nervous system is doing its best.",
		"I'm worthy of softness today.",
		"I don't have to earn rest.",
		"I can be a beginner again.",
		"I'm safe in this moment."
	];
	const [i, setI] = useState(0);
	const [generated, setGenerated] = useState(null);
	const [loading, setLoading] = useState(false);
	const generate = async () => {
		setLoading(true);
		setGenerated(null);
		try {
			const res = await fetch("/api/chat", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					messages: [{
						role: "user",
						content: "Generate 3 short, warm, personalized affirmations (one per line)."
					}],
					systemPrompt: "You are EmpathAI. Produce three gentle affirmations, each on its own line. Keep them short and personal."
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
			const lines = acc.split(/\r?\n/).map((l) => l.trim()).filter(Boolean).slice(0, 3);
			if (lines.length) setGenerated(lines);
		} catch (e) {} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "text-center",
		children: [
			/* @__PURE__ */ jsx("h3", {
				className: "text-lg font-semibold tracking-tight",
				children: "Affirmations"
			}),
			/* @__PURE__ */ jsx(AnimatePresence, {
				mode: "wait",
				children: /* @__PURE__ */ jsxs(motion.p, {
					initial: {
						opacity: 0,
						y: 8
					},
					animate: {
						opacity: 1,
						y: 0
					},
					exit: {
						opacity: 0,
						y: -8
					},
					className: "my-8 text-xl sm:text-2xl font-medium tracking-tight gradient-text",
					children: [
						"\"",
						generated ? generated[i % generated.length] : LINES[i],
						"\""
					]
				}, generated ? generated.join("|") : LINES[i])
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-center gap-2",
				children: [/* @__PURE__ */ jsx(GlowButton, {
					size: "sm",
					onClick: () => setI((p) => (p + 1) % (generated ? generated.length : LINES.length)),
					children: "Next →"
				}), /* @__PURE__ */ jsx(GlowButton, {
					size: "sm",
					onClick: generate,
					disabled: loading,
					variant: "ghost",
					children: loading ? "Generating…" : "Generate 3 affirmations"
				})]
			})
		]
	});
}
function BodyScan() {
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx("h3", {
			className: "text-lg font-semibold tracking-tight",
			children: "Body Scan"
		}),
		/* @__PURE__ */ jsx("p", {
			className: "text-sm text-muted-foreground mt-1",
			children: "Spend a breath at each place."
		}),
		/* @__PURE__ */ jsx("ol", {
			className: "mt-5 flex flex-col gap-2",
			children: [
				"Crown of head",
				"Face & jaw",
				"Neck & shoulders",
				"Chest & heart",
				"Belly",
				"Hips",
				"Legs",
				"Feet"
			].map((p, idx) => /* @__PURE__ */ jsxs("li", {
				className: "flex items-center gap-3 rounded-xl glass px-3 py-2.5",
				children: [/* @__PURE__ */ jsx("span", {
					className: "font-mono text-xs text-muted-foreground w-6",
					children: idx + 1
				}), /* @__PURE__ */ jsx("span", {
					className: "text-sm",
					children: p
				})]
			}, p))
		})
	] });
}
function Soundscape() {
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx("h3", {
			className: "text-lg font-semibold tracking-tight",
			children: "Soundscape"
		}),
		/* @__PURE__ */ jsx("p", {
			className: "text-sm text-muted-foreground mt-1",
			children: "Open in a new tab. Pick what fits the moment."
		}),
		/* @__PURE__ */ jsx("div", {
			className: "mt-4 flex flex-col gap-2",
			children: [
				{
					name: "Rain",
					url: "https://www.youtube.com/results?search_query=gentle+rain+ambience"
				},
				{
					name: "Ocean",
					url: "https://www.youtube.com/results?search_query=ocean+waves+ambience"
				},
				{
					name: "Forest",
					url: "https://www.youtube.com/results?search_query=forest+ambience"
				},
				{
					name: "Soft piano",
					url: "https://www.youtube.com/results?search_query=soft+piano+for+anxiety"
				}
			].map((s) => /* @__PURE__ */ jsxs("a", {
				href: s.url,
				target: "_blank",
				rel: "noreferrer",
				className: "rounded-xl glass px-3 py-2.5 text-sm hover:bg-white/5 transition",
				children: [s.name, " →"]
			}, s.name))
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mt-4 text-xs text-muted-foreground/70",
			children: "Built-in player coming soon."
		})
	] });
}
function TaskBreakdown() {
	const [task, setTask] = useState("");
	const [response, setResponse] = useState(null);
	const [loading, setLoading] = useState(false);
	const submit = async () => {
		if (!task.trim()) return;
		setLoading(true);
		setResponse(null);
		try {
			const prompt = `Break this task into a clear list of tiny micro-steps: ${task.trim()}`;
			const res = await fetch("/api/chat", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					messages: [{
						role: "user",
						content: prompt
					}],
					systemPrompt: "You are a calm helper. Turn the task into a numbered list of small, doable steps."
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
			setResponse(acc.trim());
		} catch {
			setResponse("Sorry, I couldn’t create steps right now.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx("h3", {
			className: "text-lg font-semibold tracking-tight",
			children: "Task Breakdown"
		}),
		/* @__PURE__ */ jsx("p", {
			className: "text-sm text-muted-foreground mt-1",
			children: "Paste one task and get very small next steps."
		}),
		/* @__PURE__ */ jsx("textarea", {
			value: task,
			onChange: (e) => setTask(e.target.value),
			rows: 5,
			placeholder: "The one thing I need to do…",
			className: "mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
		}),
		/* @__PURE__ */ jsx("div", {
			className: "mt-3 flex gap-2",
			children: /* @__PURE__ */ jsx(GlowButton, {
				size: "sm",
				onClick: submit,
				disabled: loading || !task.trim(),
				children: loading ? "Working…" : "Break it down"
			})
		}),
		response && /* @__PURE__ */ jsx("div", {
			className: "mt-4 rounded-2xl bg-white/5 p-4 text-sm",
			children: /* @__PURE__ */ jsx(ReactMarkdown, { children: response })
		})
	] });
}
function BodyDoubling() {
	const [copied, setCopied] = useState(false);
	const prompt = "I'll be here while you work. What's the one thing?";
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx("h3", {
			className: "text-lg font-semibold tracking-tight",
			children: "Body Doubling"
		}),
		/* @__PURE__ */ jsx("p", {
			className: "text-sm text-muted-foreground mt-1",
			children: "A gentle prompt for shared focus."
		}),
		/* @__PURE__ */ jsx("div", {
			className: "mt-5 rounded-2xl bg-white/5 p-4",
			children: /* @__PURE__ */ jsx("p", {
				className: "text-sm",
				children: prompt
			})
		}),
		/* @__PURE__ */ jsx("div", {
			className: "mt-4 flex gap-2",
			children: /* @__PURE__ */ jsx(GlowButton, {
				size: "sm",
				onClick: async () => {
					await navigator.clipboard.writeText(prompt);
					setCopied(true);
					setTimeout(() => setCopied(false), 2e3);
				},
				children: copied ? "Copied" : "Copy prompt"
			})
		})
	] });
}
function TransitionTimer() {
	const [seconds, setSeconds] = useState(300);
	const [running, setRunning] = useState(false);
	useEffect(() => {
		if (!running || seconds <= 0) return;
		const timer = window.setTimeout(() => setSeconds((s) => s - 1), 1e3);
		return () => window.clearTimeout(timer);
	}, [running, seconds]);
	const start = () => {
		setSeconds(300);
		setRunning(true);
	};
	const minutes = Math.floor(seconds / 60);
	const secs = seconds % 60;
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx("h3", {
			className: "text-lg font-semibold tracking-tight",
			children: "Transition Timer"
		}),
		/* @__PURE__ */ jsx("p", {
			className: "text-sm text-muted-foreground mt-1",
			children: "A gentle five-minute countdown to help you shift gears."
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mt-6 rounded-2xl bg-white/5 p-6 text-center",
			children: [/* @__PURE__ */ jsx("div", {
				className: "text-4xl font-semibold",
				children: `${minutes}:${secs.toString().padStart(2, "0")}`
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: seconds > 0 ? "Focus here until the timer ends." : "Time’s up. You did it."
			})]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mt-4 flex gap-2 justify-center",
			children: [/* @__PURE__ */ jsx(GlowButton, {
				size: "sm",
				onClick: start,
				disabled: running,
				children: "Start 5 min"
			}), /* @__PURE__ */ jsx(GlowButton, {
				size: "sm",
				variant: "ghost",
				onClick: () => setRunning(false),
				disabled: !running,
				children: "Stop"
			})]
		})
	] });
}
//#endregion
export { ToolkitPage as component };
