import { useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { GlowButton } from "@/components/GlowButton";
import { Shield, Trash2, Download, User, Mic2, Brain, Settings2 } from "lucide-react";
import { clearAllEmpathaiData } from "@/lib/storage";
import { Link } from "@tanstack/react-router";

interface Props {
  onExport?: () => void;
  voiceEnabled?: boolean;
  onToggleVoice?: () => void;
  onToggleNeuro?: () => void;
  onOpenSettings?: () => void;
  neuroMode?: boolean;
  simpleLanguageMode?: boolean;
}

export function TopBar({ onExport, voiceEnabled = false, onToggleVoice, onToggleNeuro, onOpenSettings, neuroMode = false, simpleLanguageMode = false }: Props) {
  const [confirming, setConfirming] = useState(false);

  return (
    <header className="sticky top-0 z-20 px-4 lg:px-6 pt-4">
      <GlassCard strong className="flex items-center gap-3 px-3 py-2.5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Shield className="h-4 w-4 text-accent" />
          <span className="hidden sm:inline">In crisis?</span>
          <Link to="/sanctuary/crisis" className="underline decoration-dotted underline-offset-4 hover:text-foreground">
            Get help now
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {onExport && (
            <GlowButton variant="ghost" size="sm" onClick={onExport} aria-label="Export conversation as PDF">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </GlowButton>
          )}

          {onToggleVoice && (
            <GlowButton
              variant={voiceEnabled ? "accent" : "ghost"}
              size="sm"
              onClick={onToggleVoice}
              title={voiceEnabled ? "Disable voice mode" : "Enable voice mode"}
              aria-label="Toggle voice mode"
            >
              <Mic2 className="h-4 w-4" />
              <span className="hidden sm:inline">Voice</span>
            </GlowButton>
          )}

          {onToggleNeuro && (
            <GlowButton
              variant={neuroMode ? "accent" : "ghost"}
              size="sm"
              onClick={onToggleNeuro}
              title={neuroMode ? "Disable Neuro Mode" : "Enable Neuro Mode"}
            >
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Neuro Mode</span>
            </GlowButton>
          )}

          {neuroMode && (
            <span className="hidden sm:inline rounded-full bg-accent/15 px-2 py-1 text-[11px] font-semibold text-accent">
              Neuro Mode On
            </span>
          )}
          {simpleLanguageMode && (
            <span className="hidden sm:inline rounded-full bg-primary/15 px-2 py-1 text-[11px] font-semibold text-primary">
              Simple mode on
            </span>
          )}

          {onOpenSettings && (
            <GlowButton variant="ghost" size="sm" onClick={onOpenSettings} title="Open settings">
              <Settings2 className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </GlowButton>
          )}

          {!confirming ? (
            <GlowButton variant="ghost" size="sm" onClick={() => setConfirming(true)}>
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Clear data</span>
            </GlowButton>
          ) : (
            <div className="flex items-center gap-1">
              <button onClick={() => setConfirming(false)} className="text-xs px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground">
                Cancel
              </button>
              <GlowButton
                size="sm"
                variant="accent"
                onClick={() => {
                  clearAllEmpathaiData();
                  setConfirming(false);
                  window.location.reload();
                }}
              >
                Yes, wipe
              </GlowButton>
            </div>
          )}

          <div className="grid h-9 w-9 place-items-center rounded-full glass-strong" title="Anonymous">
            <User className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </GlassCard>
    </header>
  );
}
