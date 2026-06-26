import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AlertTriangle, BarChart3, Trash2 } from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { GlassCard } from "@/components/GlassCard";
import { GlowButton } from "@/components/GlowButton";
import { TopBar } from "@/components/TopBar";
import { useLocalStorage, STORAGE_KEYS, type MoodEntry } from "@/lib/storage";
import { MoodSparkline } from "@/components/MoodLogger";

export const Route = createFileRoute("/sanctuary/insights")({
  head: () => ({ meta: [{ title: "Insights — EmpathAI" }] }),
  component: InsightsPage,
});

function InsightsPage() {
  const [moods, setMoods] = useLocalStorage<MoodEntry[]>(STORAGE_KEYS.moods, []);
  const [confirming, setConfirming] = useState(false);

  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const weekMoods = useMemo(() => moods.filter((m) => m.ts > weekAgo), [moods, weekAgo]);

  const mostCommon = useMemo(() => {
    if (!weekMoods.length) return null;
    const counts = weekMoods.reduce<Record<string, number>>((acc, mood) => {
      acc[mood.label] = (acc[mood.label] ?? 0) + 1;
      return acc;
    }, {});
    const [label, count] = Object.entries(counts).sort(([, a], [, b]) => b - a)[0] ?? [];
    const entry = weekMoods.find((m) => m.label === label);
    return entry ? { label, count, emoji: entry.emoji } : null;
  }, [weekMoods]);

  const averageIntensity = useMemo(() => {
    if (!weekMoods.length) return 0;
    return Math.round(weekMoods.reduce((sum, mood) => sum + mood.intensity, 0) / weekMoods.length);
  }, [weekMoods]);

  const clearHistory = () => {
    setMoods([]);
    setConfirming(false);
  };

  return (
    <>
      <AnimatedBackground />
      <TopBar />
      <div className="flex-1 px-4 lg:px-6 py-4 pb-28 md:pb-4">
        <div className="mx-auto flex max-w-6xl flex-col gap-4">
          <GlassCard strong glow="accent" className="p-6 border-accent/30">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">Your Mood Journey</h1>
                <p className="mt-1 text-sm text-muted-foreground">A calm private timeline of how you’ve felt, stored only on this device.</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <BarChart3 className="h-4 w-4 text-accent" />
                <span>{moods.length} total entries</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard strong className="p-5">
            {moods.length > 0 ? (
              <>
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Mood trend</p>
                  <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3">
                    <MoodSparkline moods={[...moods].slice(0, 14).reverse()} />
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Total check-ins this week</p>
                    <p className="mt-2 text-2xl font-semibold">{weekMoods.length}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Most common mood</p>
                    <p className="mt-2 text-2xl font-semibold">{mostCommon ? `${mostCommon.emoji} ${mostCommon.label}` : "—"}</p>
                    {mostCommon && <p className="mt-1 text-xs text-muted-foreground">{mostCommon.count} entries</p>}
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Average intensity this week</p>
                    <p className="mt-2 text-2xl font-semibold">{averageIntensity}/10</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-8 text-center text-sm text-muted-foreground">
                Start logging moods in the chat to see your journey here.
              </div>
            )}
          </GlassCard>

          <GlassCard strong className="p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">All mood entries</h2>
                <p className="text-sm text-muted-foreground">A private timeline of how you've felt.</p>
              </div>
            </div>

            {moods.length > 0 ? (
              <div className="mt-4 space-y-3">
                {moods.map((entry) => (
                  <div key={entry.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{entry.emoji}</span>
                        <div>
                          <p className="font-medium">{entry.label}</p>
                          <p className="text-xs text-muted-foreground">{new Date(entry.ts).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="text-right text-xs text-muted-foreground">
                        <div className="font-medium text-foreground">{entry.intensity}/10</div>
                        <div className="mt-1 h-2 w-24 rounded-full bg-white/10">
                          <div className="h-2 rounded-full bg-gradient-to-r from-accent to-primary" style={{ width: `${(entry.intensity / 10) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                    {entry.note && <p className="mt-3 text-sm text-muted-foreground">{entry.note}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-sm text-muted-foreground">
                No mood entries yet.
              </div>
            )}
          </GlassCard>

          <div className="flex justify-end">
            {!confirming ? (
              <GlowButton variant="ghost" size="sm" onClick={() => setConfirming(true)}>
                <Trash2 className="h-4 w-4" />
                Clear mood history
              </GlowButton>
            ) : (
              <div className="flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                <AlertTriangle className="h-4 w-4" />
                Delete all mood entries?
                <button type="button" onClick={clearHistory} className="font-semibold underline underline-offset-4">Yes</button>
                <button type="button" onClick={() => setConfirming(false)} className="font-semibold">Cancel</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
