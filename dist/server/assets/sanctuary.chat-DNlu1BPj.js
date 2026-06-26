import { t as cn } from "./utils-C_uf36nf.js";
import { n as GlassCard, r as GlowButton, t as AnimatedBackground } from "./AnimatedBackground-BeCIfK8k.js";
import { n as STORAGE_KEYS, r as useLocalStorage, t as TopBar } from "./TopBar-BJq6YPo0.js";
import { t as MoodLogger } from "./MoodLogger-B0t3VJkD.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion } from "motion/react";
import { Clock, Loader2, Plus, Send, Square, Volume2, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import jsPDF from "jspdf";
//#region src/components/ModeChips.tsx
function ModeChips({ modes, activeId, onChange }) {
	return /* @__PURE__ */ jsx("div", {
		className: "flex flex-wrap gap-2",
		children: modes.map((m) => {
			const active = m.id === activeId;
			return /* @__PURE__ */ jsxs("button", {
				onClick: () => onChange(m.id),
				title: m.blurb,
				className: cn("relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all duration-300", "border border-white/10 backdrop-blur-md", active ? "text-foreground bg-white/10 glow-primary" : "text-muted-foreground hover:text-foreground hover:bg-white/5"),
				children: [
					active && /* @__PURE__ */ jsx(motion.span, {
						layoutId: "mode-chip-glow",
						className: "absolute inset-0 rounded-full",
						style: { background: "linear-gradient(135deg, oklch(0.62 0.22 290 / 0.35), oklch(0.78 0.16 200 / 0.25))" },
						transition: {
							type: "spring",
							stiffness: 300,
							damping: 30
						}
					}),
					/* @__PURE__ */ jsx("span", {
						className: "relative z-10",
						children: m.emoji
					}),
					/* @__PURE__ */ jsx("span", {
						className: "relative z-10 font-medium tracking-tight",
						children: m.label
					})
				]
			}, m.id);
		})
	});
}
//#endregion
//#region src/lib/modes.ts
var PERSONABLE_PREFIX = `You are warm, friendly, and expressive. Use occasional tasteful emojis (💜 ✨ 🌙) naturally in responses — never forced. Start responses with empathy, not advice. Mirror the user's energy — if they're casual, be casual. If they're serious, be thoughtful. Never start a sentence with 'I'. Keep responses conversational, like texting a wise friend who happens to know therapy.\n\n`;
var SAFETY = `\n\nSAFETY RULES:\n- You are not a licensed clinician. Never diagnose.\n- If the user expresses intent of self-harm, suicide, or harming others, gently encourage them to contact a crisis line immediately (in the US dial or text 988; elsewhere recommend local emergency services) and offer to stay with them.\n- Avoid clinical jargon. Use warm, plain language.\n- Keep responses concise (2-5 short paragraphs unless the user asks for more). Use markdown sparingly.`;
var NEURO_MODE_PROMPT = `\n\nWhen Neuro Mode is active: respond with shorter sentences of two to three per paragraph maximum, use simple vocabulary at an eighth-grade reading level, be extra patient with zero judgment, use numbered steps for any instructions, acknowledge sensory and emotional states explicitly, and never use sarcasm or idioms.`;
var SIMPLE_LANGUAGE_PROMPT = `\n\nUse very simple, short sentences. Maximum 8 words per sentence. Avoid any complex vocabulary. Write like you are texting a friend.`;
var getCombinedSystemPrompt = (mode, neuroMode, simpleLanguageMode) => {
	let prompt = mode.systemPrompt;
	if (neuroMode) prompt += NEURO_MODE_PROMPT;
	if (simpleLanguageMode) prompt += SIMPLE_LANGUAGE_PROMPT;
	return prompt;
};
var MODES = [
	{
		id: "listener",
		label: "Listener",
		emoji: "🫶",
		blurb: "Gentle presence, mostly reflection.",
		systemPrompt: PERSONABLE_PREFIX + "You are EmpathAI in Listener mode. Your job is to be a quiet, validating presence. Reflect feelings back, ask soft open questions, and do NOT give advice unless explicitly asked. Use short, warm sentences." + SAFETY
	},
	{
		id: "coach",
		label: "Coach",
		emoji: "🌱",
		blurb: "Action-oriented next steps.",
		systemPrompt: PERSONABLE_PREFIX + "You are EmpathAI in Coach mode. Validate briefly, then help the user identify one tiny next step. Offer 2-3 concrete options framed as invitations, never commands." + SAFETY
	},
	{
		id: "cbt",
		label: "CBT Guide",
		emoji: "🧠",
		blurb: "Notice thoughts, gently reframe.",
		systemPrompt: PERSONABLE_PREFIX + "You are EmpathAI in CBT Guide mode. Use cognitive-behavioral techniques: help the user name automatic thoughts, identify cognitive distortions in plain language, and explore balanced alternatives. Be warm, never lecturing." + SAFETY
	},
	{
		id: "friend",
		label: "Friend",
		emoji: "✨",
		blurb: "Casual, warm, like a close friend.",
		systemPrompt: "You are EmpathAI's Friend — talk exactly like a caring, emotionally intelligent best friend texting someone they love. Use natural language, occasional emojis, short sentences. Never sound clinical. React genuinely to what they say. If they say something funny, laugh. If they're sad, hold space. You remember what they told you earlier in the conversation. Never start with 'I'. Max 3-4 sentences unless they need more." + SAFETY
	},
	{
		id: "therapist",
		label: "Therapist-style",
		emoji: "🪷",
		blurb: "Insight-oriented, depth questions.",
		systemPrompt: PERSONABLE_PREFIX + "You are EmpathAI in Therapist-style mode (educational, not clinical). Use insight-oriented prompts inspired by humanistic therapy: reflect, ask deeper open questions, notice patterns gently. Remind the user you are not a licensed therapist when relevant." + SAFETY
	},
	{
		id: "reflective",
		label: "Reflective",
		emoji: "🌙",
		blurb: "Journaling prompts and meaning-making.",
		systemPrompt: PERSONABLE_PREFIX + "You are EmpathAI in Reflective mode. Offer journaling-style prompts, slow the conversation down, and help the user make meaning of what they shared. One question at a time." + SAFETY
	}
];
var getMode = (id) => MODES.find((m) => m.id === id) ?? MODES[0];
//#endregion
//#region src/routes/sanctuary.chat.tsx?tsr-split=component
var REACTION_EMOJIS = [
	"💜",
	"🥺",
	"💡",
	"🌟",
	"🤗"
];
var VOICE_PERSONAS = [
	{
		id: "ara",
		name: "Ara",
		emoji: "🎵",
		description: "Upbeat & warm",
		prefer: [
			"Samantha",
			"Karen",
			"Moira",
			"Victoria",
			"Google US English",
			"Microsoft Zira",
			"female",
			"en-US"
		],
		pitch: 1.1,
		rate: .95
	},
	{
		id: "eve",
		name: "Eve",
		emoji: "🌊",
		description: "Soothing & calm",
		prefer: [
			"Tessa",
			"Fiona",
			"Veena",
			"Google UK English Female",
			"Microsoft Hazel",
			"en-GB"
		],
		pitch: .9,
		rate: .82
	},
	{
		id: "nova",
		name: "Nova",
		emoji: "⚡",
		description: "Energetic & bright",
		prefer: [
			"Google US English",
			"Samantha",
			"Microsoft Zira",
			"en-AU",
			"en-US"
		],
		pitch: 1.2,
		rate: 1.05
	},
	{
		id: "sage",
		name: "Sage",
		emoji: "🧘",
		description: "Deep & meditative",
		prefer: [
			"Daniel",
			"Alex",
			"Fred",
			"Google UK English Male",
			"Microsoft David",
			"en-GB",
			"en-US"
		],
		pitch: .8,
		rate: .78
	}
];
var VOICE_PERSONALITIES = [
	{
		id: "therapist",
		name: "Therapist",
		icon: "🪷",
		description: "Calm & measured",
		pitchMod: 0,
		rateMod: -.05
	},
	{
		id: "storytime",
		name: "Storytime",
		icon: "📖",
		description: "Warm & expressive",
		pitchMod: .1,
		rateMod: 0
	},
	{
		id: "meditation",
		name: "Meditation",
		icon: "🧘",
		description: "Slow & peaceful",
		pitchMod: -.1,
		rateMod: -.15
	},
	{
		id: "motivation",
		name: "Motivation",
		icon: "⚡",
		description: "Energetic & uplifting",
		pitchMod: .15,
		rateMod: .1
	}
];
function resolveVoice(persona, voices) {
	if (voices.length === 0) return null;
	for (const pref of persona.prefer) {
		const match = voices.find((v) => v.name.toLowerCase().includes(pref.toLowerCase()) || v.lang.toLowerCase().includes(pref.toLowerCase()));
		if (match) return match;
	}
	const englishVoices = voices.filter((v) => v.lang.startsWith("en"));
	if (englishVoices.length > 0) return englishVoices[VOICE_PERSONAS.findIndex((p) => p.id === persona.id) % englishVoices.length];
	return voices[0];
}
function ChatPage() {
	const [messages, setMessages] = useLocalStorage(STORAGE_KEYS.chat, []);
	const [modeId, setModeId] = useLocalStorage(STORAGE_KEYS.mode, "listener");
	const [moods] = useLocalStorage(STORAGE_KEYS.moods, []);
	const [input, setInput] = useState("");
	const [streaming, setStreaming] = useState(false);
	const [error, setError] = useState(null);
	const scrollRef = useRef(null);
	const inputRef = useRef(null);
	const [onboarded, setOnboarded] = useLocalStorage(STORAGE_KEYS.onboarded, false);
	const [user, setUser] = useLocalStorage(STORAGE_KEYS.user, null);
	const [showOnboarding, setShowOnboarding] = useState(!onboarded);
	const [history, setHistory] = useLocalStorage(STORAGE_KEYS.history, []);
	const [showHistory, setShowHistory] = useState(false);
	const [simpleMode, setSimpleMode] = useState(false);
	const [voiceMode, setVoiceMode] = useState(false);
	const voiceEnabledRef = useRef(false);
	const [availableVoices, setAvailableVoices] = useState([]);
	const [selectedPersonaId, setSelectedPersonaId] = useState("ara");
	const [selectedPersonalityId, setSelectedPersonalityId] = useState("therapist");
	const [neuroMode, setNeuroMode] = useLocalStorage(STORAGE_KEYS.neuroMode, false);
	const [simpleLanguageMode, setSimpleLanguageMode] = useLocalStorage(STORAGE_KEYS.simpleLanguageMode, false);
	const [highContrastMode, setHighContrastMode] = useLocalStorage(STORAGE_KEYS.highContrastMode, false);
	const [textSize, setTextSize] = useLocalStorage(STORAGE_KEYS.textSize, "medium");
	const [showSettings, setShowSettings] = useState(false);
	useRef(null);
	useEffect(() => {
		if (typeof document === "undefined") return;
		document.documentElement.classList.toggle("neuro-mode", neuroMode);
		document.documentElement.classList.toggle("high-contrast", highContrastMode);
		document.documentElement.style.setProperty("--base-font-size", {
			small: "15px",
			medium: "16px",
			large: "17px",
			xlarge: "18px"
		}[textSize] ?? "16px");
	}, [
		neuroMode,
		highContrastMode,
		textSize
	]);
	const PLACEHOLDERS = [
		"What's on your mind?",
		"Tell me anything.",
		"No judgment here.",
		"How are you, really?",
		"You can start anywhere."
	];
	const [phIdx, setPhIdx] = useState(0);
	useEffect(() => {
		inputRef.current?.focus();
	}, []);
	useEffect(() => {
		setSimpleMode(simpleLanguageMode);
	}, [simpleLanguageMode]);
	useEffect(() => {
		const loadVoices = () => {
			const voices = window.speechSynthesis.getVoices();
			if (voices.length > 0) setAvailableVoices(voices);
		};
		loadVoices();
		window.speechSynthesis.onvoiceschanged = loadVoices;
		return () => {
			window.speechSynthesis.onvoiceschanged = null;
		};
	}, []);
	useEffect(() => {
		const t = setInterval(() => setPhIdx((p) => (p + 1) % PLACEHOLDERS.length), 3e3);
		return () => clearInterval(t);
	}, []);
	useEffect(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [messages, streaming]);
	useEffect(() => {
		if (!onboarded || showOnboarding || messages.length > 0) return;
		const userRaw = typeof window !== "undefined" ? window.localStorage.getItem("empathai.user.v1") : null;
		let parsedUser = null;
		try {
			parsedUser = userRaw ? JSON.parse(userRaw) : null;
		} catch {
			parsedUser = null;
		}
		const name = parsedUser?.name ?? "";
		const reason = parsedUser?.reason ?? "";
		const greeting = name ? `Welcome back, ${name} 💜 How are you feeling today? Last time you mentioned ${reason || "you wanted to talk"} — I'm here whenever you're ready.` : "Welcome back 💜 How are you feeling today? I'm here for you.";
		setMessages([{
			id: crypto.randomUUID(),
			role: "assistant",
			content: greeting,
			ts: Date.now()
		}]);
	}, [
		onboarded,
		showOnboarding,
		messages.length,
		setMessages
	]);
	const startNewConversation = () => {
		if (messages.length > 0) {
			const firstUser = messages.find((m) => m.role === "user")?.content || messages[0]?.content || "New conversation";
			const title = `${firstUser.substring(0, 40)}${firstUser.length > 40 ? "..." : ""}`;
			setHistory([{
				id: crypto.randomUUID(),
				title,
				ts: Date.now(),
				messages,
				modeId
			}, ...history].slice(0, 20));
		}
		setMessages([]);
		setInput("");
	};
	const loadSession = (session) => {
		setMessages(session.messages);
		setModeId(session.modeId);
		setShowHistory(false);
	};
	const quickStartPrompts = {
		listener: [
			"I'm feeling overwhelmed",
			"I had a rough day",
			"I don't know where to start",
			"I just need someone to listen"
		],
		coach: [
			"Help me take one small step",
			"I'm stuck on a problem",
			"I need motivation",
			"Help me make a plan"
		],
		cbt: [
			"I keep thinking the worst",
			"I feel like a failure",
			"My thoughts are spiraling",
			"Help me reframe this"
		],
		friend: [
			"I just want to vent",
			"Something happened today",
			"I need a friend right now",
			"Can we just talk?"
		],
		therapist: [
			"I've been feeling this way for a while",
			"I want to understand myself better",
			"Something from my past is bothering me",
			"Why do I keep doing this?"
		],
		reflective: [
			"Help me journal about today",
			"What does this feeling mean?",
			"I want to make sense of things",
			"Help me reflect"
		]
	};
	const sendMessage = useCallback(async (text) => {
		const trimmed = text.trim();
		if (!trimmed || streaming) return;
		const userMsg = {
			id: crypto.randomUUID(),
			role: "user",
			content: trimmed,
			ts: Date.now()
		};
		const assistantId = crypto.randomUUID();
		const placeholder = {
			id: assistantId,
			role: "assistant",
			content: "",
			ts: Date.now()
		};
		const next = [
			...messages,
			userMsg,
			placeholder
		];
		setMessages(next);
		setInput("");
		setStreaming(true);
		setError(null);
		const recentMood = moods[0] ? `${moods[0].emoji} ${moods[0].label} (${moods[0].intensity}/10)${moods[0].note ? ` — "${moods[0].note}"` : ""}` : void 0;
		try {
			const res = await fetch("/api/chat", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					messages: next.filter((m) => m.id !== assistantId).map(({ role, content }) => ({
						role,
						content
					})),
					systemPrompt: getCombinedSystemPrompt(getMode(modeId), neuroMode, simpleMode || simpleLanguageMode),
					recentMood,
					userName: user?.name
				})
			});
			if (!res.ok || !res.body) {
				const body = await res.text().catch(() => "");
				throw new Error(body || `Request failed (${res.status})`);
			}
			const reader = res.body.getReader();
			const decoder = new TextDecoder();
			let acc = "";
			while (true) {
				const { value, done } = await reader.read();
				if (done) break;
				acc += decoder.decode(value, { stream: true });
				setMessages((prev) => prev.map((m) => m.id === assistantId ? {
					...m,
					content: acc
				} : m));
			}
			if (voiceEnabledRef.current) setMessages((prev) => {
				const lastMsg = prev.find((m) => m.id === assistantId);
				if (lastMsg?.content) speakText(lastMsg.content);
				return prev;
			});
		} catch (e) {
			setError(e instanceof Error ? e.message : "Something went wrong.");
			setMessages((prev) => prev.filter((m) => m.id !== assistantId));
		} finally {
			setStreaming(false);
			inputRef.current?.focus();
		}
	}, [
		messages,
		modeId,
		moods,
		user,
		setMessages,
		streaming
	]);
	const stopSpeech = useCallback(() => {
		if (typeof window === "undefined") return;
		window.speechSynthesis.cancel();
	}, []);
	const speakText = useCallback((text) => {
		if (!text?.trim()) return;
		window.speechSynthesis.cancel();
		const clean = text.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1").replace(/#{1,6}\s*/g, "").replace(/[💜✨🌙💡🌟🤗🥺🎵🌊⚡🧘🪷📖]/g, "").replace(/\n+/g, ". ").trim();
		if (!clean) return;
		setTimeout(() => {
			const utterance = new SpeechSynthesisUtterance(clean);
			const persona = VOICE_PERSONAS.find((p) => p.id === selectedPersonaId) ?? VOICE_PERSONAS[0];
			const personality = VOICE_PERSONALITIES.find((p) => p.id === selectedPersonalityId) ?? VOICE_PERSONALITIES[0];
			if (availableVoices.length > 0) {
				let matched = null;
				for (const pref of persona.prefer) {
					matched = availableVoices.find((v) => v.name.toLowerCase().includes(pref.toLowerCase()) || v.lang.toLowerCase().startsWith(pref.toLowerCase())) ?? null;
					if (matched) break;
				}
				if (!matched) matched = availableVoices.find((v) => v.lang.startsWith("en")) ?? availableVoices[0];
				if (matched) utterance.voice = matched;
			}
			utterance.pitch = Math.max(.5, Math.min(2, persona.pitch + personality.pitchMod));
			utterance.rate = Math.max(.3, Math.min(2, persona.rate + personality.rateMod));
			utterance.volume = 1;
			utterance.onerror = (e) => {
				console.warn("Speech error:", e);
			};
			window.speechSynthesis.speak(utterance);
		}, 100);
	}, [
		availableVoices,
		selectedPersonaId,
		selectedPersonalityId
	]);
	const enableVoice = useCallback(() => {
		if (typeof window === "undefined" || !window.speechSynthesis) return;
		const primer = new SpeechSynthesisUtterance("​");
		primer.volume = 0;
		window.speechSynthesis.speak(primer);
		voiceEnabledRef.current = true;
		setVoiceMode(true);
	}, []);
	const toggleVoiceMode = useCallback(() => {
		if (!voiceMode) {
			enableVoice();
			return;
		}
		voiceEnabledRef.current = false;
		if (typeof window !== "undefined") window.speechSynthesis.cancel();
		stopSpeech();
		setVoiceMode(false);
	}, [
		enableVoice,
		stopSpeech,
		voiceMode
	]);
	useEffect(() => {
		voiceEnabledRef.current = voiceMode;
	}, [voiceMode]);
	const addReaction = useCallback((messageId, emoji) => {
		setMessages((prev) => prev.map((m) => m.id === messageId ? {
			...m,
			reactions: {
				...m.reactions,
				[emoji]: (m.reactions?.[emoji] ?? 0) + 1
			}
		} : m));
	}, [setMessages]);
	const send = useCallback(() => sendMessage(input), [input, sendMessage]);
	const exportPdf = useCallback(() => {
		const doc = new jsPDF({
			unit: "pt",
			format: "letter"
		});
		const margin = 48;
		let y = margin;
		doc.setFont("helvetica", "bold");
		doc.setFontSize(18);
		doc.text("EmpathAI Conversation", margin, y);
		y += 24;
		doc.setFont("helvetica", "normal");
		doc.setFontSize(10);
		doc.setTextColor(120);
		doc.text(`Exported: ${(/* @__PURE__ */ new Date()).toLocaleString()}`, margin, y);
		y += 14;
		doc.text(`Mode: ${getMode(modeId).label}`, margin, y);
		y += 20;
		messages.forEach((m) => {
			if (y > 720) {
				doc.addPage();
				y = margin;
			}
			doc.setFont("helvetica", "bold");
			doc.setFontSize(11);
			doc.setTextColor(m.role === "user" ? 40 : 80);
			doc.text(m.role === "user" ? "You" : "EmpathAI", margin, y);
			y += 14;
			doc.setFont("helvetica", "normal");
			doc.setFontSize(11);
			doc.setTextColor(30);
			doc.splitTextToSize(m.content, 500).forEach((ln) => {
				if (y > 740) {
					doc.addPage();
					y = margin;
				}
				doc.text(ln, margin, y);
				y += 14;
			});
			y += 10;
		});
		if (y > 700) {
			doc.addPage();
			y = margin;
		}
		y += 20;
		doc.setFont("helvetica", "italic");
		doc.setFontSize(9);
		doc.setTextColor(150);
		doc.text("EmpathAI — Not a substitute for professional mental health care.", margin, y);
		doc.text("If you are in crisis, call 988 (US) or visit findahelpline.com", margin, y + 12);
		doc.save(`empathai-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.pdf`);
	}, [messages, modeId]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(AnimatedBackground, {}),
		/* @__PURE__ */ jsx(OnboardingModal, {
			open: showOnboarding,
			onComplete: (name, reason) => {
				setUser({
					name,
					reason
				});
				setOnboarded(true);
				setShowOnboarding(false);
			}
		}),
		/* @__PURE__ */ jsx(TopBar, {
			onExport: messages.length ? exportPdf : void 0,
			voiceEnabled: voiceMode,
			onToggleVoice: toggleVoiceMode,
			onToggleNeuro: () => setNeuroMode((current) => !current),
			onOpenSettings: () => setShowSettings(true),
			neuroMode,
			simpleLanguageMode: simpleMode || simpleLanguageMode
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "flex-1 grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4 px-4 lg:px-6 py-4 pb-28 md:pb-4 min-h-0",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col min-h-0 min-w-0",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 mb-3",
						children: [/* @__PURE__ */ jsxs(GlassCard, {
							strong: true,
							className: "px-4 py-3 flex-1",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ jsx(ModeChips, {
									modes: MODES,
									activeId: modeId,
									onChange: setModeId
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => {
										const next = !simpleMode;
										setSimpleMode(next);
										setSimpleLanguageMode(next);
									},
									className: cn("rounded-full border px-3 py-1.5 text-[11px] font-medium transition-all", simpleMode ? "border-primary/50 bg-primary/15 text-foreground shadow-[0_0_18px_-4px_oklch(0.62_0.22_290/0.8)]" : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:bg-white/10"),
									children: simpleMode ? "Simple ✓" : "Simple"
								})]
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-2 text-xs text-muted-foreground/80",
								children: getMode(modeId).blurb
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ jsx(GlowButton, {
								size: "sm",
								variant: "ghost",
								onClick: () => setShowHistory(!showHistory),
								title: "Past conversations",
								children: /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4" })
							}), /* @__PURE__ */ jsx(GlowButton, {
								size: "sm",
								variant: "ghost",
								onClick: startNewConversation,
								title: "New conversation",
								children: /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" })
							})]
						})]
					}),
					showHistory && history.length > 0 && /* @__PURE__ */ jsxs(GlassCard, {
						strong: true,
						className: "mb-3 p-4 max-h-64 overflow-y-auto",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-xs font-semibold uppercase text-muted-foreground mb-2",
							children: "Past conversations"
						}), /* @__PURE__ */ jsx("div", {
							className: "flex flex-col gap-2",
							children: history.slice(0, 5).map((s) => /* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-white/5 transition cursor-pointer",
								onClick: () => loadSession(s),
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-sm text-foreground truncate",
									children: s.title
								}), /* @__PURE__ */ jsx(GlowButton, {
									size: "sm",
									variant: "ghost",
									children: "Continue"
								})]
							}, s.id))
						})]
					}),
					showSettings && /* @__PURE__ */ jsx("div", {
						className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6",
						children: /* @__PURE__ */ jsxs("div", {
							className: "relative w-full max-w-xl rounded-3xl border border-white/10 bg-slate-950/95 p-6 shadow-2xl backdrop-blur-xl",
							children: [
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => setShowSettings(false),
									className: "absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10",
									"aria-label": "Close settings",
									children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ jsx("h2", {
									className: "text-xl font-semibold tracking-tight",
									children: "Settings"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: "Adjust voice, Neuro Mode, and accessibility preferences."
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-6 grid gap-4",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "rounded-2xl border border-white/10 bg-white/5 p-4",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex items-center justify-between gap-3",
												children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
													className: "text-sm font-semibold",
													children: "Neuro Mode"
												}), /* @__PURE__ */ jsx("p", {
													className: "text-xs text-muted-foreground",
													children: "Shorter, simpler, patient responses."
												})] }), /* @__PURE__ */ jsx(GlowButton, {
													size: "sm",
													variant: neuroMode ? "accent" : "ghost",
													onClick: () => setNeuroMode((current) => !current),
													children: neuroMode ? "On" : "Off"
												})]
											})
										}),
										/* @__PURE__ */ jsx("div", {
											className: "rounded-2xl border border-white/10 bg-white/5 p-4",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex items-center justify-between gap-3",
												children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
													className: "text-sm font-semibold",
													children: "Simple Language Mode"
												}), /* @__PURE__ */ jsx("p", {
													className: "text-xs text-muted-foreground",
													children: "Use very simple words, short sentences, and no jargon."
												})] }), /* @__PURE__ */ jsx(GlowButton, {
													size: "sm",
													variant: simpleLanguageMode ? "accent" : "ghost",
													onClick: () => setSimpleLanguageMode((current) => !current),
													children: simpleLanguageMode ? "On" : "Off"
												})]
											})
										}),
										/* @__PURE__ */ jsx("div", {
											className: "rounded-2xl border border-white/10 bg-white/5 p-4",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex items-center justify-between gap-3",
												children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
													className: "text-sm font-semibold",
													children: "High Contrast Mode"
												}), /* @__PURE__ */ jsx("p", {
													className: "text-xs text-muted-foreground",
													children: "Stronger contrast for easier reading."
												})] }), /* @__PURE__ */ jsx(GlowButton, {
													size: "sm",
													variant: highContrastMode ? "accent" : "ghost",
													onClick: () => setHighContrastMode((current) => !current),
													children: highContrastMode ? "On" : "Off"
												})]
											})
										}),
										/* @__PURE__ */ jsx("div", {
											className: "rounded-2xl border border-white/10 bg-white/5 p-4",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex items-center justify-between gap-3",
												children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
													className: "text-sm font-semibold",
													children: "Text Size"
												}), /* @__PURE__ */ jsx("p", {
													className: "text-xs text-muted-foreground",
													children: "Choose a comfortable base font size."
												})] }), /* @__PURE__ */ jsxs("select", {
													value: textSize,
													onChange: (e) => setTextSize(e.target.value),
													className: "rounded-xl border border-white/10 bg-background px-3 py-2 text-sm text-foreground",
													children: [
														/* @__PURE__ */ jsx("option", {
															value: "small",
															children: "Small"
														}),
														/* @__PURE__ */ jsx("option", {
															value: "medium",
															children: "Medium"
														}),
														/* @__PURE__ */ jsx("option", {
															value: "large",
															children: "Large"
														}),
														/* @__PURE__ */ jsx("option", {
															value: "xlarge",
															children: "Extra Large"
														})
													]
												})]
											})
										})
									]
								})
							]
						})
					}),
					/* @__PURE__ */ jsxs(GlassCard, {
						strong: true,
						className: "mt-3 flex-1 flex flex-col min-h-0 overflow-hidden shimmer-border",
						children: [
							/* @__PURE__ */ jsxs("div", {
								ref: scrollRef,
								className: "flex-1 overflow-y-auto px-4 sm:px-8 py-6 flex flex-col gap-5",
								children: [
									messages.length === 0 && /* @__PURE__ */ jsxs("div", {
										className: "m-auto text-center max-w-md",
										children: [
											/* @__PURE__ */ jsx("div", {
												className: "mx-auto mb-4 grid h-16 w-16 place-items-center rounded-3xl glass-strong glow-soft breathe",
												children: /* @__PURE__ */ jsx("span", {
													className: "text-3xl",
													children: getMode(modeId).emoji
												})
											}),
											/* @__PURE__ */ jsx("h2", {
												className: "text-xl font-semibold tracking-tight",
												children: (() => {
													const hour = (/* @__PURE__ */ new Date()).getHours();
													return hour < 12 ? "Good morning." : hour < 17 ? "Good afternoon." : "Good evening.";
												})()
											}),
											/* @__PURE__ */ jsx("p", {
												className: "mt-2 text-sm text-muted-foreground",
												children: "This is your space. No judgment, no pressure. Tell me what's going on."
											}),
											/* @__PURE__ */ jsx("div", {
												className: "mt-6 grid grid-cols-2 gap-2 text-left",
												children: quickStartPrompts[modeId].map((prompt) => /* @__PURE__ */ jsx("button", {
													onClick: () => sendMessage(prompt),
													className: "rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-foreground hover:shadow-[0_0_18px_-4px_oklch(0.62_0.22_290/0.8)]",
													children: prompt
												}, prompt))
											})
										]
									}),
									/* @__PURE__ */ jsx(AnimatePresence, {
										initial: false,
										children: messages.map((m) => /* @__PURE__ */ jsxs(motion.div, {
											initial: {
												opacity: 0,
												y: 8,
												scale: .98
											},
											animate: {
												opacity: 1,
												y: 0,
												scale: 1
											},
											transition: {
												duration: .3,
												ease: "easeOut"
											},
											className: cn("group flex flex-col", m.role === "user" ? "items-end" : "items-start"),
											children: [
												/* @__PURE__ */ jsx("div", {
													className: cn("max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed", "border backdrop-blur-md", m.role === "user" ? "border-accent/40 bg-accent/15 text-foreground rounded-3xl rounded-tr-sm glow-soft" : "border-primary/40 bg-primary/15 text-foreground rounded-3xl rounded-tl-sm"),
													style: { boxShadow: m.role === "user" ? "0 0 30px -10px oklch(0.78 0.16 200 / 0.6)" : "0 0 30px -10px oklch(0.62 0.22 290 / 0.6)" },
													children: m.role === "assistant" && !m.content && streaming ? /* @__PURE__ */ jsx(TypingIndicator, {}) : /* @__PURE__ */ jsx("div", {
														className: "prose prose-invert prose-sm max-w-none prose-p:my-2 prose-headings:my-2 prose-strong:text-foreground",
														children: /* @__PURE__ */ jsx(ReactMarkdown, { children: m.content })
													})
												}),
												m.role === "assistant" && m.content ? /* @__PURE__ */ jsx("button", {
													type: "button",
													"aria-label": "Listen to this message",
													onClick: () => speakText(m.content),
													className: "mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground/50 hover:text-accent transition-colors",
													children: "🔊 Listen"
												}) : null,
												m.role === "assistant" && /* @__PURE__ */ jsxs("div", {
													className: "mt-2 flex flex-wrap items-center gap-2 opacity-0 group-hover:opacity-100 transition duration-200 text-xs text-muted-foreground",
													children: [/* @__PURE__ */ jsx("div", {
														className: "flex flex-wrap items-center gap-1",
														children: REACTION_EMOJIS.map((emoji) => /* @__PURE__ */ jsxs(motion.button, {
															whileTap: { scale: 1.15 },
															onClick: () => addReaction(m.id, emoji),
															className: "inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 transition hover:bg-white/10",
															children: [/* @__PURE__ */ jsx("span", { children: emoji }), m.reactions?.[emoji] ? /* @__PURE__ */ jsx("span", {
																className: "text-[11px] text-foreground",
																children: m.reactions[emoji]
															}) : null]
														}, emoji))
													}), /* @__PURE__ */ jsxs("div", {
														className: "ml-auto flex items-center gap-2",
														children: [/* @__PURE__ */ jsx(GlowButton, {
															variant: "ghost",
															size: "sm",
															onClick: () => speakText(m.content),
															children: /* @__PURE__ */ jsx(Volume2, { className: "h-4 w-4" })
														}), voiceMode && /* @__PURE__ */ jsx(GlowButton, {
															variant: "ghost",
															size: "sm",
															onClick: stopSpeech,
															children: /* @__PURE__ */ jsx(Square, { className: "h-4 w-4" })
														})]
													})]
												})
											]
										}, m.id))
									}),
									error && /* @__PURE__ */ jsx("div", {
										className: "mx-auto text-xs text-destructive bg-destructive/10 border border-destructive/30 rounded-full px-3 py-1.5",
										children: error
									})
								]
							}),
							voiceMode && /* @__PURE__ */ jsxs("div", {
								className: "mb-4 rounded-3xl border border-white/10 bg-white/5 p-4",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
										children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "text-sm font-semibold text-foreground",
											children: "Voice mode enabled"
										}), /* @__PURE__ */ jsx("p", {
											className: "text-xs text-muted-foreground",
											children: "EmpathAI will speak assistant responses aloud."
										})] }), /* @__PURE__ */ jsx("div", {
											className: "flex flex-wrap items-center gap-2",
											children: /* @__PURE__ */ jsx(GlowButton, {
												size: "sm",
												variant: "ghost",
												onClick: stopSpeech,
												children: "Stop speech"
											})
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "mt-4 grid gap-3 lg:grid-cols-2",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "space-y-3",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground",
												children: [/* @__PURE__ */ jsx("span", { children: "Persona" }), /* @__PURE__ */ jsx("span", {
													className: "rounded-full bg-white/5 px-2 py-1 text-[11px] text-foreground",
													children: VOICE_PERSONAS.find((p) => p.id === selectedPersonaId)?.emoji ?? "🎵"
												})]
											}), /* @__PURE__ */ jsx("div", {
												className: "grid gap-2 sm:grid-cols-2",
												children: VOICE_PERSONAS.map((persona) => /* @__PURE__ */ jsxs("button", {
													type: "button",
													onClick: () => setSelectedPersonaId(persona.id),
													className: cn("rounded-2xl border px-3 py-2 text-left text-sm transition", persona.id === selectedPersonaId ? "border-primary bg-primary/15 text-foreground shadow-[0_0_20px_-10px_rgba(129,140,248,0.7)]" : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:bg-white/10"),
													children: [/* @__PURE__ */ jsx("div", {
														className: "font-semibold",
														children: persona.name
													}), /* @__PURE__ */ jsx("div", {
														className: "mt-1 text-[13px] text-muted-foreground",
														children: persona.description
													})]
												}, persona.id))
											})]
										}), /* @__PURE__ */ jsxs("div", {
											className: "space-y-3",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground",
												children: [/* @__PURE__ */ jsx("span", { children: "Personality" }), /* @__PURE__ */ jsx("span", {
													className: "rounded-full bg-white/5 px-2 py-1 text-[11px] text-foreground",
													children: VOICE_PERSONALITIES.find((p) => p.id === selectedPersonalityId)?.icon ?? "🪷"
												})]
											}), /* @__PURE__ */ jsx("div", {
												className: "grid gap-2 sm:grid-cols-2",
												children: VOICE_PERSONALITIES.map((personality) => /* @__PURE__ */ jsxs("button", {
													type: "button",
													onClick: () => setSelectedPersonalityId(personality.id),
													className: cn("rounded-2xl border px-3 py-2 text-left text-sm transition", personality.id === selectedPersonalityId ? "border-primary bg-primary/15 text-foreground shadow-[0_0_20px_-10px_rgba(129,140,248,0.7)]" : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:bg-white/10"),
													children: [/* @__PURE__ */ jsx("div", {
														className: "font-semibold",
														children: personality.name
													}), /* @__PURE__ */ jsx("div", {
														className: "mt-1 text-[13px] text-muted-foreground",
														children: personality.description
													})]
												}, personality.id))
											})]
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
										children: [
											/* @__PURE__ */ jsx("span", { children: "Selected voice:" }),
											/* @__PURE__ */ jsx("span", {
												className: "rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-foreground",
												children: resolveVoice(VOICE_PERSONAS.find((p) => p.id === selectedPersonaId) ?? VOICE_PERSONAS[0], availableVoices)?.name ?? "Loading available voices..."
											}),
											/* @__PURE__ */ jsx("span", { children: availableVoices.length ? `${availableVoices.length} voices detected` : "Voice loading may take a moment." })
										]
									})
								]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "border-t border-white/5 p-3",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-end gap-2",
									children: [/* @__PURE__ */ jsx("textarea", {
										ref: inputRef,
										value: input,
										onChange: (e) => {
											setInput(e.target.value);
											e.target.style.height = "auto";
											e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
										},
										onKeyDown: (e) => {
											if (e.key === "Enter" && !e.shiftKey) {
												e.preventDefault();
												send();
											}
										},
										rows: 1,
										placeholder: PLACEHOLDERS[phIdx],
										className: "flex-1 resize-none max-h-[160px] rounded-2xl glass border border-white/10 px-4 py-3 text-[15px] placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring"
									}), /* @__PURE__ */ jsx(GlowButton, {
										size: "md",
										"aria-label": "Send message",
										onClick: send,
										disabled: !input.trim() || streaming,
										className: "!h-12 !w-12 !px-0",
										children: streaming ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" })
									})]
								})
							})
						]
					})
				]
			}), /* @__PURE__ */ jsx("aside", {
				className: "hidden xl:block",
				children: /* @__PURE__ */ jsx(GlassCard, {
					strong: true,
					className: "p-5 sticky top-24",
					children: /* @__PURE__ */ jsx(MoodLogger, {})
				})
			})]
		})
	] });
}
function TypingIndicator() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex items-center gap-1 px-4 py-3",
		children: [
			0,
			1,
			2
		].map((i) => /* @__PURE__ */ jsx(motion.div, {
			className: "h-2 w-2 rounded-full bg-primary/60",
			animate: { y: [
				0,
				-6,
				0
			] },
			transition: {
				duration: .6,
				repeat: Infinity,
				delay: i * .15,
				ease: "easeInOut"
			}
		}, i))
	});
}
function OnboardingModal({ open, onComplete }) {
	const [name, setName] = useState("");
	const [reason, setReason] = useState(null);
	const reasons = [
		"School stress",
		"Feeling lonely",
		"Anxiety",
		"Just need to talk"
	];
	const handleSubmit = () => {
		if (name.trim() && reason) onComplete(name.trim(), reason);
	};
	return /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm",
		children: /* @__PURE__ */ jsx(motion.div, {
			initial: {
				scale: .95,
				opacity: 0,
				y: 20
			},
			animate: {
				scale: 1,
				opacity: 1,
				y: 0
			},
			exit: {
				scale: .95,
				opacity: 0,
				y: 20
			},
			transition: { duration: .3 },
			className: "w-full max-w-md px-6 py-8 rounded-3xl",
			style: {
				background: "radial-gradient(circle at 50% 0%, oklch(0.62 0.22 290 / 0.15), oklch(0.15 0.04 275 / 0.5))",
				border: "1px solid oklch(0.62 0.22 290 / 0.2)",
				boxShadow: "0 25px 50px -12px oklch(0.62 0.22 290 / 0.3), inset 0 1px 1px oklch(1 0 0 / 0.1)"
			},
			children: /* @__PURE__ */ jsxs("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
						className: "text-2xl font-bold tracking-tight text-foreground",
						children: "Welcome to your sanctuary."
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Let's get to know each other."
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
						className: "text-sm font-medium text-foreground",
						children: "What's your name?"
					}), /* @__PURE__ */ jsx("input", {
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "Tell me your name",
						className: "mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary",
						onKeyDown: (e) => {
							if (e.key === "Enter" && name.trim() && reason) handleSubmit();
						}
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
						className: "text-sm font-medium text-foreground",
						children: "What brings you here today?"
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-3 grid grid-cols-2 gap-2",
						children: reasons.map((r) => /* @__PURE__ */ jsx(motion.button, {
							whileHover: { scale: 1.05 },
							whileTap: { scale: .95 },
							onClick: () => setReason(r),
							className: cn("rounded-lg px-3 py-2.5 text-xs font-medium transition-all", reason === r ? "border-primary/50 bg-primary/15 text-foreground" : "border border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10"),
							style: reason === r ? { boxShadow: "0 0 20px -5px oklch(0.78 0.16 200 / 0.6)" } : {},
							children: r
						}, r))
					})] }),
					/* @__PURE__ */ jsx(GlowButton, {
						onClick: handleSubmit,
						disabled: !name.trim() || !reason,
						className: "w-full",
						children: "Enter your sanctuary →"
					})
				]
			})
		})
	}) });
}
//#endregion
export { ChatPage as component };
