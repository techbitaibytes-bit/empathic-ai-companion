import { n as GlassCard, r as GlowButton, t as AnimatedBackground } from "./AnimatedBackground-BeCIfK8k.js";
import { t as TopBar } from "./TopBar-BJq6YPo0.js";
import { useCallback, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
import { Globe, Link2, Loader2, MapPin, MessageSquare, Phone, ShieldAlert, Users } from "lucide-react";
//#region src/routes/sanctuary.crisis.tsx?tsr-split=component
function parseResourceCards(raw) {
	return raw.split(/\n(?=\d+\.|\*\*[A-Z])/).map((block) => block.trim()).filter(Boolean).map((block) => {
		const nameMatch = block.match(/\*\*([^*]+)\*\*/);
		const name = nameMatch ? nameMatch[1].trim() : "Support Resource";
		const phoneMatch = block.match(/\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}/);
		const phone = phoneMatch ? phoneMatch[0] : "";
		const typeMatch = block.match(/\*\*[^*]+\*\*,?\s*([^,(]+)/);
		return {
			name,
			type: typeMatch ? typeMatch[1].trim() : "",
			contact: phone,
			description: block.replace(/\*\*/g, "").replace(/^\d+\.\s*/, "").replace(nameMatch?.[0] ?? "", "").replace(phone, "").trim().split(".").find((segment) => segment.length > 30) ?? ""
		};
	});
}
var SUPPORT_ICON_MAP = {
	hotline: Phone,
	counseling: Users,
	group: Users,
	online: Globe,
	lgbtq: Link2,
	default: MapPin
};
function CrisisPage() {
	const [city, setCity] = useState("");
	const [resultsText, setResultsText] = useState("");
	const [supportItems, setSupportItems] = useState([]);
	const [streaming, setStreaming] = useState(false);
	const [error, setError] = useState(null);
	const abortRef = useRef(null);
	const findLocal = useCallback(async () => {
		const q = city.trim();
		if (!q) {
			setError("Please enter a city.");
			return;
		}
		setError(null);
		setResultsText("");
		setSupportItems([]);
		setStreaming(true);
		if (abortRef.current) abortRef.current.abort();
		const ctrl = new AbortController();
		abortRef.current = ctrl;
		const prompt = `The user is located in ${q}. They are a teen looking for mental health and neurodiverse support. List 5 to 8 real, specific local resources including crisis hotlines for their region, free or low-cost youth counseling centers, neurodiverse support groups, LGBTQ+ affirming services if available, and online options if local ones are limited. Format each result with Name, Type, Contact, and a one-sentence warm description.`;
		try {
			const res = await fetch("/api/chat", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ messages: [{
					role: "user",
					content: prompt
				}] }),
				signal: ctrl.signal
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
				setResultsText(acc);
			}
			setSupportItems(parseResourceCards(acc));
		} catch (e) {
			if (e.name === "AbortError") setError("Search cancelled.");
			else setError(e instanceof Error ? e.message : "Something went wrong.");
		} finally {
			setStreaming(false);
			abortRef.current = null;
		}
	}, [city]);
	const iconForType = (type) => {
		const lower = type.toLowerCase();
		return Object.entries(SUPPORT_ICON_MAP).find(([key]) => lower.includes(key))?.[1] ?? SUPPORT_ICON_MAP.default;
	};
	const copyToClipboard = async (value) => {
		try {
			if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) await navigator.clipboard.writeText(value);
		} catch {}
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(AnimatedBackground, {}),
		/* @__PURE__ */ jsx(TopBar, {}),
		/* @__PURE__ */ jsx("div", {
			className: "flex-1 px-4 lg:px-6 py-4 pb-28 md:pb-4",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-4xl grid gap-4",
				children: [
					/* @__PURE__ */ jsxs(GlassCard, {
						strong: true,
						glow: "accent",
						className: "p-6 border-accent/30",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ jsx(ShieldAlert, { className: "h-6 w-6 text-accent shrink-0 mt-0.5" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
								className: "text-xl sm:text-2xl font-semibold tracking-tight",
								children: "Find Support Near Me"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Search for local teen mental health and neurodiverse resources with warm, practical next steps."
							})] })]
						}), /* @__PURE__ */ jsxs("div", {
							className: "mt-5 grid sm:grid-cols-2 gap-3",
							children: [
								/* @__PURE__ */ jsxs("a", {
									href: "tel:988",
									className: "flex items-center gap-3 rounded-2xl glass px-4 py-3 hover:bg-white/5 transition",
									children: [/* @__PURE__ */ jsx(Phone, { className: "h-5 w-5 text-accent" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
										className: "font-semibold",
										children: "Call 988"
									}), /* @__PURE__ */ jsx("div", {
										className: "text-xs text-muted-foreground",
										children: "US Suicide & Crisis Lifeline · 24/7"
									})] })]
								}),
								/* @__PURE__ */ jsxs("a", {
									href: "sms:741741?body=HOME",
									className: "flex items-center gap-3 rounded-2xl glass px-4 py-3 hover:bg-white/5 transition",
									children: [/* @__PURE__ */ jsx(MessageSquare, { className: "h-5 w-5 text-accent" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
										className: "font-semibold",
										children: "Text HOME to 741741"
									}), /* @__PURE__ */ jsx("div", {
										className: "text-xs text-muted-foreground",
										children: "Crisis Text Line · US/CA"
									})] })]
								}),
								/* @__PURE__ */ jsxs("a", {
									href: "https://findahelpline.com",
									target: "_blank",
									rel: "noreferrer",
									className: "flex items-center gap-3 rounded-2xl glass px-4 py-3 hover:bg-white/5 transition sm:col-span-2",
									children: [/* @__PURE__ */ jsx(Globe, { className: "h-5 w-5 text-accent" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
										className: "font-semibold",
										children: "findahelpline.com"
									}), /* @__PURE__ */ jsx("div", {
										className: "text-xs text-muted-foreground",
										children: "International directory of free helplines"
									})] })]
								}),
								/* @__PURE__ */ jsxs("a", {
									href: "tel:9152987821",
									className: "flex items-center gap-3 rounded-2xl glass px-4 py-3 hover:bg-white/5 transition sm:col-span-2",
									children: [/* @__PURE__ */ jsx(Phone, { className: "h-5 w-5 text-accent" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
										className: "font-semibold",
										children: "iCall India — 9152987821"
									}), /* @__PURE__ */ jsx("div", {
										className: "text-xs text-muted-foreground",
										children: "Free counselling · Mon–Sat 8am–10pm IST"
									})] })]
								})
							]
						})]
					}),
					/* @__PURE__ */ jsxs(GlassCard, {
						className: "mt-4 p-6",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "text-lg font-semibold tracking-tight",
								children: "Right now: a grounding breath"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Breathe in for 4. Hold for 7. Out for 8. Repeat."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-6 flex flex-col items-center gap-4",
								children: [/* @__PURE__ */ jsx(motion.div, {
									className: "h-28 w-28 rounded-full",
									style: {
										background: "radial-gradient(circle, oklch(0.62 0.22 290 / 0.6), oklch(0.78 0.16 200 / 0.2))",
										boxShadow: "0 0 40px oklch(0.62 0.22 290 / 0.3)"
									},
									animate: { scale: [
										1,
										1.4,
										1.4,
										1,
										1
									] },
									transition: {
										duration: 19,
										repeat: Infinity,
										ease: "easeInOut",
										times: [
											0,
											.21,
											.58,
											.79,
											1
										]
									}
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-muted-foreground/70",
									children: "Follow the circle. Let your breath lead."
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs(GlassCard, {
						className: "p-6",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "text-lg font-semibold tracking-tight",
								children: "Find Support Near Me"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Enter a city or postal code and the AI will suggest nearby teen-friendly resources."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-4 flex gap-3 flex-col sm:flex-row",
								children: [/* @__PURE__ */ jsx("input", {
									value: city,
									onChange: (e) => setCity(e.target.value),
									placeholder: "City or postal code",
									className: "flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
								}), /* @__PURE__ */ jsx(GlowButton, {
									size: "sm",
									onClick: findLocal,
									disabled: streaming,
									children: streaming ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : "Find Support"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-4 space-y-4",
								children: [
									/* @__PURE__ */ jsx(GlassCard, {
										className: "p-4",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between gap-4",
											children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
												className: "text-sm font-semibold",
												children: "988 Suicide & Crisis Lifeline"
											}), /* @__PURE__ */ jsx("p", {
												className: "text-xs text-muted-foreground",
												children: "Always available 24/7 in the US — call or text 988."
											})] }), /* @__PURE__ */ jsx(GlowButton, {
												size: "sm",
												variant: "ghost",
												onClick: () => copyToClipboard("988"),
												children: "Copy"
											})]
										})
									}),
									error && /* @__PURE__ */ jsx("div", {
										className: "text-xs text-destructive",
										children: error
									}),
									streaming && !resultsText && /* @__PURE__ */ jsx("div", {
										className: "text-sm text-muted-foreground",
										children: "Searching..."
									}),
									supportItems.length > 0 ? /* @__PURE__ */ jsx("div", {
										className: "grid gap-3",
										children: supportItems.map((item, index) => {
											return /* @__PURE__ */ jsx("div", {
												className: "rounded-2xl glass px-4 py-3 flex flex-col gap-1",
												children: /* @__PURE__ */ jsxs("div", {
													className: "flex items-start gap-3",
													children: [/* @__PURE__ */ jsx(iconForType(item.type), { className: "h-5 w-5 text-accent shrink-0 mt-0.5" }), /* @__PURE__ */ jsxs("div", {
														className: "flex-1",
														children: [
															/* @__PURE__ */ jsx("div", {
																className: "font-semibold text-sm",
																children: item.name
															}),
															item.type && /* @__PURE__ */ jsx("div", {
																className: "text-xs text-accent",
																children: item.type
															}),
															item.description && /* @__PURE__ */ jsx("div", {
																className: "text-xs text-muted-foreground line-clamp-2",
																children: item.description
															}),
															item.contact && /* @__PURE__ */ jsxs("a", {
																href: `tel:${item.contact.replace(/\D/g, "")}`,
																className: "mt-1 text-xs font-mono text-accent hover:underline",
																children: ["📞 ", item.contact]
															})
														]
													})]
												})
											}, `${item.name}-${index}`);
										})
									}) : !streaming && resultsText ? /* @__PURE__ */ jsx("div", {
										className: "rounded-2xl bg-white/5 p-4 text-sm text-muted-foreground",
										children: "We couldn't format those suggestions yet. Please try again."
									}) : !streaming && /* @__PURE__ */ jsx("div", {
										className: "rounded-2xl bg-white/5 p-4 text-sm text-muted-foreground",
										children: "No results yet. Enter a location and click Find Support."
									}),
									/* @__PURE__ */ jsx("div", {
										className: "rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-muted-foreground",
										children: "These suggestions are AI-generated. Always verify contact details before reaching out."
									})
								]
							})
						]
					})
				]
			})
		})
	] });
}
//#endregion
export { CrisisPage as component };
