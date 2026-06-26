import { useEffect, useState, useCallback } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initial;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore quota */
    }
  }, [key, value]);

  const reset = useCallback(() => setValue(initial), [initial]);
  return [value, setValue, reset] as const;
}

export const STORAGE_KEYS = {
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
  history: "empathai.history.v1",
};

export function clearAllEmpathaiData() {
  if (typeof window === "undefined") return;
  Object.values(STORAGE_KEYS).forEach((k) => window.localStorage.removeItem(k));
}

export type ReactionEmoji = "💜" | "🥺" | "💡" | "🌟" | "🤗";

export interface MoodEntry {
  id: string;
  ts: number;
  emoji: string;
  label: string;
  intensity: number; // 1-10
  note?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  ts: number;
  reactions?: Partial<Record<ReactionEmoji, number>>;
}

export interface UserData {
  name: string;
  reason: string;
}

export interface ChatSession {
  id: string;
  title: string;
  ts: number;
  messages: ChatMessage[];
  modeId: string;
}

