import { n as GlassCard, r as GlowButton } from "./AnimatedBackground-BeCIfK8k.js";
import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Brain, Download, Mic2, Settings2, Shield, Trash2, User } from "lucide-react";
//#region src/lib/storage.ts
function useLocalStorage(key, initial) {
	const [value, setValue] = useState(() => {
		if (typeof window === "undefined") return initial;
		try {
			const raw = window.localStorage.getItem(key);
			return raw ? JSON.parse(raw) : initial;
		} catch {
			return initial;
		}
	});
	useEffect(() => {
		if (typeof window === "undefined") return;
		try {
			window.localStorage.setItem(key, JSON.stringify(value));
		} catch {}
	}, [key, value]);
	return [
		value,
		setValue,
		useCallback(() => setValue(initial), [initial])
	];
}
var STORAGE_KEYS = {
	chat: "empathai.chat.v1",
	mode: "empathai.mode.v1",
	moods: "empathai.moods.v1",
	gratitude: "empathai.gratitude.v1",
	safetyPlan: "empathai.safetyPlan.v1",
	theme: "empathai.theme.v1",
	neuroMode: "empathai.neuroMode.v1",
	simpleLanguageMode: "empathai.simpleLanguageMode.v1",
	highContrastMode: "empathai.highContrastMode.v1",
	textSize: "empathai.textSize.v1",
	voiceSettings: "empathai.voiceSettings.v1",
	onboarded: "empathai.onboarded.v1",
	user: "empathai.user.v1",
	history: "empathai.history.v1"
};
function clearAllEmpathaiData() {
	if (typeof window === "undefined") return;
	Object.values(STORAGE_KEYS).forEach((k) => window.localStorage.removeItem(k));
}
//#endregion
//#region src/components/TopBar.tsx
function TopBar({ onExport, voiceEnabled = false, onToggleVoice, onToggleNeuro, onOpenSettings, neuroMode = false, simpleLanguageMode = false }) {
	const [confirming, setConfirming] = useState(false);
	return /* @__PURE__ */ jsx("header", {
		className: "sticky top-0 z-20 px-4 lg:px-6 pt-4",
		children: /* @__PURE__ */ jsxs(GlassCard, {
			strong: true,
			className: "flex items-center gap-3 px-3 py-2.5",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ jsx(Shield, { className: "h-4 w-4 text-accent" }),
					/* @__PURE__ */ jsx("span", {
						className: "hidden sm:inline",
						children: "In crisis?"
					}),
					/* @__PURE__ */ jsx(Link, {
						to: "/sanctuary/crisis",
						className: "underline decoration-dotted underline-offset-4 hover:text-foreground",
						children: "Get help now"
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "ml-auto flex items-center gap-2",
				children: [
					onExport && /* @__PURE__ */ jsxs(GlowButton, {
						variant: "ghost",
						size: "sm",
						onClick: onExport,
						"aria-label": "Export conversation as PDF",
						children: [/* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
							className: "hidden sm:inline",
							children: "Export"
						})]
					}),
					onToggleVoice && /* @__PURE__ */ jsxs(GlowButton, {
						variant: voiceEnabled ? "accent" : "ghost",
						size: "sm",
						onClick: onToggleVoice,
						title: voiceEnabled ? "Disable voice mode" : "Enable voice mode",
						"aria-label": "Toggle voice mode",
						children: [/* @__PURE__ */ jsx(Mic2, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
							className: "hidden sm:inline",
							children: "Voice"
						})]
					}),
					onToggleNeuro && /* @__PURE__ */ jsxs(GlowButton, {
						variant: neuroMode ? "accent" : "ghost",
						size: "sm",
						onClick: onToggleNeuro,
						title: neuroMode ? "Disable Neuro Mode" : "Enable Neuro Mode",
						children: [/* @__PURE__ */ jsx(Brain, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
							className: "hidden sm:inline",
							children: "Neuro Mode"
						})]
					}),
					neuroMode && /* @__PURE__ */ jsx("span", {
						className: "hidden sm:inline rounded-full bg-accent/15 px-2 py-1 text-[11px] font-semibold text-accent",
						children: "Neuro Mode On"
					}),
					simpleLanguageMode && /* @__PURE__ */ jsx("span", {
						className: "hidden sm:inline rounded-full bg-primary/15 px-2 py-1 text-[11px] font-semibold text-primary",
						children: "Simple mode on"
					}),
					onOpenSettings && /* @__PURE__ */ jsxs(GlowButton, {
						variant: "ghost",
						size: "sm",
						onClick: onOpenSettings,
						title: "Open settings",
						children: [/* @__PURE__ */ jsx(Settings2, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
							className: "hidden sm:inline",
							children: "Settings"
						})]
					}),
					!confirming ? /* @__PURE__ */ jsxs(GlowButton, {
						variant: "ghost",
						size: "sm",
						onClick: () => setConfirming(true),
						children: [/* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
							className: "hidden sm:inline",
							children: "Clear data"
						})]
					}) : /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ jsx("button", {
							onClick: () => setConfirming(false),
							className: "text-xs px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground",
							children: "Cancel"
						}), /* @__PURE__ */ jsx(GlowButton, {
							size: "sm",
							variant: "accent",
							onClick: () => {
								clearAllEmpathaiData();
								setConfirming(false);
								window.location.reload();
							},
							children: "Yes, wipe"
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "grid h-9 w-9 place-items-center rounded-full glass-strong",
						title: "Anonymous",
						children: /* @__PURE__ */ jsx(User, { className: "h-4 w-4 text-muted-foreground" })
					})
				]
			})]
		})
	});
}
//#endregion
export { STORAGE_KEYS as n, useLocalStorage as r, TopBar as t };
