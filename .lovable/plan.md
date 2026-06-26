# EmpathAI — Soft Cyber Sanctuary Build Plan

Building the full app from scratch (current project is the blank template) with the premium dark wellness aesthetic and all requested features.

## Design system (foundation)

Tailwind v4 tokens in `src/styles.css`, dark-only by default with subtle light toggle:

- `--background` deep midnight navy `#0A0F2C`
- `--primary` amethyst `#6B4EFF`
- `--accent` cyan `#22D3EE`
- lavender gradient + glow shadow tokens (`--shadow-glow-primary`, `--shadow-glow-accent`)
- glass surface tokens (translucent + backdrop blur)
- Inter via `@fontsource-variable/inter` loaded in `src/start.ts`
- Custom utilities: `.glass`, `.glow-primary`, `.glow-accent`, `.breathe` (subtle scale pulse), `.float-orb`
- Animated background: fixed-position canvas of floating gradient orbs + faint particles (CSS-only, no heavy libs)
- Framer Motion (`motion`) for page/component transitions, message pop-in, hover scales, ripple

## Routes

```
src/routes/
  __root.tsx          shell, providers (QueryClient, Theme, Toaster), animated bg
  index.tsx           Landing — immersive hero
  sanctuary.tsx       Dashboard layout (left nav + outlet + right contextual panel)
  sanctuary.chat.tsx          Chat + Mood Logger right panel (default)
  sanctuary.mirror.tsx        Mood Mirror + webcam right panel
  sanctuary.toolkit.tsx       Healing Toolkit grid + tool detail right panel
  sanctuary.crisis.tsx        Crisis Help (hotlines, grounding, safety plan)
  api/chat.ts                 Streaming chat endpoint -> Gemini
```

## Features (all preserved/built)

1. **Landing** — gradient hero "An AI that sees you, helps you feel better", floating orbs, glow CTA "Enter Sanctuary" with ripple, 3 benefit glass cards.
2. **Dashboard shell** — narrow left sidebar (logo + 4 nav items with active glow), top bar (safety banner, "Clear data" button, anon avatar), right contextual panel that swaps per tab.
3. **Chat** — streaming Gemini responses, glass message bubbles (user right/teal glow, AI left/purple glow), markdown rendering, mode chips (pill design w/ active glow), conversation persisted to localStorage, PDF export of transcript.
4. **Modes** — system-prompt presets (Listener, Coach, Therapist-style, CBT, Friend, etc.) as glowing pill chips.
5. **Mood Logger (right panel in Chat)** — floating orb emoji selector, gradient intensity slider w/ glowing thumb, optional note, saved to localStorage with timeline.
6. **Mood Mirror** — face-api.js webcam emotion detection, cinematic rounded glass webcam frame, holographic floating emotion labels, confidence bars, auto-suggest mode based on detected emotion.
7. **Healing Toolkit** — grid of tools: Box Breathing animation, 5-4-3-2-1 grounding, Gratitude journal, Affirmations, Guided body scan, Soundscape player. Each opens in right panel.
8. **Crisis Help** — prominent hotlines (988, local), immediate grounding exercise, safety plan template, always-visible safety banner on every dashboard page.
9. **PDF export** — `jspdf` for chat transcripts + mood log.
10. **Data control** — "Clear all data" wipes localStorage with confirm dialog.

## Backend / AI

- User provides their own Gemini key → stored via `add_secret` as `GEMINI_API_KEY`.
- `src/routes/api/chat.ts` server route calls Gemini `gemini-2.0-flash` directly via `@google/generative-ai` SDK with streaming, system prompt assembled from selected mode + recent mood context.
- No Lovable Cloud, no DB — all user state lives in `localStorage` (mood log, chat history, settings, safety plan).
- face-api.js models loaded from CDN (or `/public/models`) on Mood Mirror page only (lazy).

## Animations & polish

- Framer Motion: page fade/slide, message pop, mode-chip layout transitions, modal scale-in.
- CSS: breathing pulse on primary CTAs, slow gradient drift on background, orb float keyframes.
- All transitions 200–400ms, ease-out; respect `prefers-reduced-motion`.

## Technical notes

- Stack: TanStack Start (existing), Tailwind v4, shadcn/ui, Framer Motion, `@google/generative-ai`, `face-api.js`, `jspdf`, `react-markdown`, `@fontsource-variable/inter`.
- Mobile responsive: sidebar collapses to bottom nav < md; right panel becomes a Sheet drawer.
- A11y: focus rings on glass surfaces, AA contrast on body text, ARIA on mode chips/sliders, keyboard nav, reduced-motion fallback.

## Build order (single turn)

1. Install deps + add Gemini secret prompt
2. Design tokens (`src/styles.css`) + animated bg component
3. Shared primitives: GlassCard, GlowButton, ModeChip, OrbSelector, IntensitySlider
4. Landing page
5. Dashboard layout + sidebar + topbar + right-panel slot
6. Chat route + streaming API route + Mood Logger panel
7. Mood Mirror route + face-api integration
8. Healing Toolkit route + tool components
9. Crisis Help route + safety banner
10. PDF export + clear-data + localStorage hooks

Given scope, this will need follow-up turns to refine face-api models loading and polish individual toolkit exercises after the first pass lands.
