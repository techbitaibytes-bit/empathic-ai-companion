import { n as GlassCard, r as GlowButton, t as AnimatedBackground } from "./AnimatedBackground-BeCIfK8k.js";
import { n as STORAGE_KEYS, r as useLocalStorage, t as TopBar } from "./TopBar-BJq6YPo0.js";
import { useEffect, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion } from "motion/react";
import { Camera, CameraOff, Loader2 } from "lucide-react";
//#region src/routes/sanctuary.mirror.tsx?tsr-split=component
var EMOTION_EMOJI = {
	neutral: "😐",
	happy: "😊",
	sad: "😢",
	angry: "😠",
	fearful: "😨",
	disgusted: "🤢",
	surprised: "😮"
};
function getMirrorAdvice(emotions, dominant) {
	if (!emotions || !dominant) return null;
	const sorted = Object.entries(emotions).sort((a, b) => b[1] - a[1]);
	const secondScore = sorted[1]?.[1] ?? 0;
	const mixedEmotion = sorted.slice(1, 3).reduce((sum, [, value]) => sum + value, 0) >= .4;
	if (dominant === "angry" || dominant === "fearful" || dominant === "surprised") return {
		title: "Overstimulated",
		message: "Your mirror is showing strong activation. Try a gentle break, softer lights, or a paced breathing moment to help your nervous system settle."
	};
	if (dominant === "neutral" && secondScore >= .22) return {
		title: "Masking fatigue",
		message: "Your face looks calm, but other emotions are also present. That can mean you are masking how you really feel. It’s okay to pause or share that you need a break."
	};
	if (dominant === "neutral" && emotions.neutral >= .72) return {
		title: "Understimulated",
		message: "Your mirror looks quiet and steady. If you feel restless or foggy, a small movement or sensory check-in may help you feel more connected."
	};
	if (mixedEmotion) return {
		title: "Mixed signal",
		message: "There are several emotions present in your expression. That can feel tiring. Notice it without judging yourself and give yourself a gentle moment."
	};
	return {
		title: "Mirror note",
		message: "This reflection is one helpful signal. Use it as a supportive prompt, not a rule, and treat it with kindness."
	};
}
function MirrorPage() {
	const videoRef = useRef(null);
	const [active, setActive] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [modelsAvailable, setModelsAvailable] = useState(null);
	const [emotions, setEmotions] = useState(null);
	const [dominant, setDominant] = useState(null);
	const intervalRef = useRef(null);
	const streamRef = useRef(null);
	const [moods, setMoods] = useLocalStorage(STORAGE_KEYS.moods, []);
	const [savedMsg, setSavedMsg] = useState(null);
	const [manualLabel, setManualLabel] = useState("");
	const [manualIntensity, setManualIntensity] = useState(5);
	const start = async () => {
		setError(null);
		setLoading(true);
		try {
			let faceapi = null;
			try {
				faceapi = await import("face-api.js");
			} catch {
				setModelsAvailable(false);
			}
			const LOCAL_MODEL_PATH = "/models";
			try {
				if (!(await fetch(LOCAL_MODEL_PATH, { method: "HEAD" })).ok) throw new Error("no local models");
			} catch {
				setModelsAvailable(false);
			}
			if (faceapi && modelsAvailable !== false) try {
				await Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri(LOCAL_MODEL_PATH), faceapi.nets.faceExpressionNet.loadFromUri(LOCAL_MODEL_PATH)]);
				setModelsAvailable(true);
			} catch (loadErr) {
				setModelsAvailable(false);
			}
			if (modelsAvailable === false) {
				setError("Emotion sensing unavailable — model files not found in /models. Your words are enough.");
				setLoading(false);
				return;
			}
			const stream = await navigator.mediaDevices.getUserMedia({
				video: { facingMode: "user" },
				audio: false
			});
			streamRef.current = stream;
			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				await videoRef.current.play();
			}
			setActive(true);
			intervalRef.current = setInterval(async () => {
				if (!videoRef.current || videoRef.current.paused || videoRef.current.ended) return;
				const detection = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions({
					inputSize: 224,
					scoreThreshold: .5
				})).withFaceExpressions();
				if (detection?.expressions) {
					const e = detection.expressions;
					setEmotions(e);
					const top = Object.entries(e).sort((a, b) => b[1] - a[1])[0];
					if (top) setDominant(top[0]);
				}
			}, 1500);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Unable to start camera or models.");
			stop();
		} finally {
			setLoading(false);
		}
	};
	const stop = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
		streamRef.current?.getTracks().forEach((t) => t.stop());
		streamRef.current = null;
		if (videoRef.current) videoRef.current.srcObject = null;
		setActive(false);
	};
	useEffect(() => () => stop(), []);
	const sorted = emotions ? Object.entries(emotions).sort((a, b) => b[1] - a[1]).slice(0, 5) : [];
	const mirrorAdvice = getMirrorAdvice(emotions, dominant);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(AnimatedBackground, {}),
		/* @__PURE__ */ jsx(TopBar, {}),
		/* @__PURE__ */ jsxs("div", {
			className: "flex-1 grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4 px-4 lg:px-6 py-4 pb-28 md:pb-4",
			children: [/* @__PURE__ */ jsx("div", {
				className: "flex flex-col min-w-0",
				children: /* @__PURE__ */ jsxs(GlassCard, {
					strong: true,
					className: "p-6 flex-1 flex flex-col items-center justify-center",
					children: [
						/* @__PURE__ */ jsx("h1", {
							className: "text-2xl sm:text-3xl font-semibold tracking-tight",
							children: "Mood Mirror"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-2 text-sm text-muted-foreground text-center max-w-md",
							children: "A gentle, private view of how you’re feeling — with no uploads and no pressure to perform."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-8 relative w-full max-w-2xl aspect-video rounded-3xl overflow-hidden shimmer-border glass-strong",
							children: [
								/* @__PURE__ */ jsx("video", {
									ref: videoRef,
									playsInline: true,
									muted: true,
									className: "absolute inset-0 h-full w-full object-cover -scale-x-100 bg-black/40"
								}),
								!active && /* @__PURE__ */ jsx("div", {
									className: "absolute inset-0 grid place-items-center text-muted-foreground",
									children: /* @__PURE__ */ jsxs("div", {
										className: "text-center",
										children: [/* @__PURE__ */ jsx(Camera, { className: "mx-auto h-10 w-10 mb-3 opacity-60" }), /* @__PURE__ */ jsx("p", {
											className: "text-sm",
											children: "Camera off"
										})]
									})
								}),
								/* @__PURE__ */ jsx(AnimatePresence, { children: active && dominant && /* @__PURE__ */ jsxs(motion.div, {
									initial: {
										opacity: 0,
										y: 10
									},
									animate: {
										opacity: 1,
										y: 0
									},
									exit: { opacity: 0 },
									className: "absolute top-4 left-4 flex items-center gap-2 rounded-full px-4 py-2 glass-strong",
									style: { boxShadow: "0 0 30px -8px oklch(0.78 0.16 200 / 0.7)" },
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-xl",
										children: EMOTION_EMOJI[dominant] ?? "🙂"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-sm font-medium capitalize gradient-text",
										children: dominant
									})]
								}, dominant) }),
								/* @__PURE__ */ jsx("div", {
									className: "pointer-events-none absolute inset-0",
									style: { boxShadow: "inset 0 0 80px 20px oklch(0.13 0.06 275 / 0.6)" }
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-6 flex flex-col gap-3 w-full items-center",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex gap-3 w-full justify-center",
								children: [!active ? /* @__PURE__ */ jsxs(GlowButton, {
									size: "md",
									onClick: start,
									disabled: loading || modelsAvailable === false,
									children: [loading ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Camera, { className: "h-4 w-4" }), loading ? "Loading models…" : "Start mirror"]
								}) : /* @__PURE__ */ jsxs(GlowButton, {
									variant: "ghost",
									size: "md",
									onClick: stop,
									children: [/* @__PURE__ */ jsx(CameraOff, { className: "h-4 w-4" }), "Stop"]
								}), active && dominant && /* @__PURE__ */ jsx(GlowButton, {
									size: "md",
									variant: "accent",
									onClick: () => {
										const label = dominant ?? "neutral";
										const entry = {
											id: crypto.randomUUID(),
											ts: Date.now(),
											emoji: EMOTION_EMOJI[label] ?? "🙂",
											label,
											intensity: 5
										};
										setMoods([entry, ...moods].slice(0, 100));
										setSavedMsg(`Saved ${entry.label} to moods`);
										setTimeout(() => setSavedMsg(null), 2500);
									},
									children: "Use detected emotion"
								})]
							}), modelsAvailable === false && /* @__PURE__ */ jsxs("div", {
								className: "w-full max-w-xl mt-2",
								children: [
									/* @__PURE__ */ jsx("p", {
										className: "text-sm text-muted-foreground mb-2",
										children: "Emotion sensing unavailable. You can pick or type how you feel — your words are enough."
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex gap-2 mb-2",
										children: [/* @__PURE__ */ jsx("input", {
											value: manualLabel,
											onChange: (e) => setManualLabel(e.target.value),
											placeholder: "How are you feeling? (e.g. anxious, calm, sad)",
											className: "flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
										}), /* @__PURE__ */ jsx(GlowButton, {
											size: "sm",
											onClick: () => {
												const label = (manualLabel || "neutral").trim();
												const entry = {
													id: crypto.randomUUID(),
													ts: Date.now(),
													emoji: EMOTION_EMOJI[label] ?? "🙂",
													label,
													intensity: manualIntensity
												};
												setMoods([entry, ...moods].slice(0, 100));
												setSavedMsg(`Saved ${entry.label} to moods`);
												setManualLabel("");
												setTimeout(() => setSavedMsg(null), 2500);
											},
											children: "Save"
										})]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "flex flex-wrap gap-2",
										children: Object.keys(EMOTION_EMOJI).map((k) => /* @__PURE__ */ jsxs(GlowButton, {
											size: "sm",
											variant: "ghost",
											onClick: () => setManualLabel(k),
											children: [/* @__PURE__ */ jsx("span", {
												className: "mr-2",
												children: EMOTION_EMOJI[k]
											}), k]
										}, k))
									})
								]
							})]
						}),
						error && /* @__PURE__ */ jsx("p", {
							className: "mt-3 text-xs text-destructive",
							children: error
						}),
						savedMsg && /* @__PURE__ */ jsx("p", {
							className: "mt-2 text-xs text-accent",
							children: savedMsg
						})
					]
				})
			}), /* @__PURE__ */ jsx("aside", {
				className: "hidden xl:block",
				children: /* @__PURE__ */ jsxs(GlassCard, {
					strong: true,
					className: "p-5 sticky top-24",
					children: [
						/* @__PURE__ */ jsx("h3", {
							className: "text-sm font-semibold tracking-wide uppercase text-muted-foreground",
							children: "Reading"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-1 text-xs text-muted-foreground/80",
							children: "Live confidence per emotion."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-4 flex flex-col gap-3",
							children: [
								sorted.length === 0 && /* @__PURE__ */ jsx("p", {
									className: "text-xs text-muted-foreground/70",
									children: "Start the mirror to see live readings."
								}),
								mirrorAdvice && /* @__PURE__ */ jsxs("div", {
									className: "rounded-3xl border border-primary/20 bg-primary/10 p-4 text-sm text-foreground",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-[11px] uppercase tracking-[0.24em] text-primary",
										children: mirrorAdvice.title
									}), /* @__PURE__ */ jsx("p", {
										className: "mt-2 text-sm text-muted-foreground",
										children: mirrorAdvice.message
									})]
								}),
								sorted.map(([name, v]) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between text-xs mb-1",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "capitalize",
										children: [
											EMOTION_EMOJI[name] ?? "•",
											" ",
											name
										]
									}), /* @__PURE__ */ jsxs("span", {
										className: "font-mono text-muted-foreground",
										children: [Math.round(v * 100), "%"]
									})]
								}), /* @__PURE__ */ jsx("div", {
									className: "h-1.5 rounded-full bg-white/5 overflow-hidden",
									children: /* @__PURE__ */ jsx(motion.div, {
										animate: { width: `${v * 100}%` },
										transition: { duration: .4 },
										className: "h-full rounded-full",
										style: { background: "linear-gradient(90deg, oklch(0.62 0.22 290), oklch(0.78 0.16 200))" }
									})
								})] }, name))
							]
						})
					]
				})
			})]
		})
	] });
}
//#endregion
export { MirrorPage as component };
