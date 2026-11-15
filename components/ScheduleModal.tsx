"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  X,
  Share2,
  Download,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { GoldenNugget, PlatformAssets } from "@/types/omniclip";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  nuggets: GoldenNugget[];
  assetsByNugget: Record<string, PlatformAssets>;
  sourceTitle: string;
}

export function ScheduleModal({
  isOpen,
  onClose,
  nuggets,
  assetsByNugget,
  sourceTitle,
}: ScheduleModalProps) {
  const [scheduledSuccess, setScheduledSuccess] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<"buffer" | "hootsuite" | "zip">("buffer");
  const [scheduleDate, setScheduleDate] = useState("Tomorrow at 9:00 AM EST (Peak Virality)");

  if (!isOpen) return null;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // fallback
    }
  };

  const handleSimulateSchedule = (platform: "Buffer" | "Hootsuite") => {
    setScheduledSuccess(`Successfully scheduled 3 OmniClips to ${platform} for ${scheduleDate}!`);
    triggerConfetti();
    setTimeout(() => {
      setScheduledSuccess(null);
      onClose();
    }, 2500);
  };

  const handleDownloadZipSimulation = () => {
    const bundleText = `# OmniClip Generated Assets for: ${sourceTitle}
Generated: ${new Date().toLocaleString()}

${nuggets
  .map((n, i) => {
    const assets = assetsByNugget[n.id];
    if (!assets) return "";
    return `========================================================
GOLDEN NUGGET #${i + 1}: ${n.title}
Timestamp: ${n.startTimestamp} - ${n.endTimestamp} | Hook Score: ${n.hookScore}/100
========================================================

--- 1. TIKTOK / REELS SCRIPT ---
Title: ${assets.tiktok?.title || n.title}
Duration: ${assets.tiktok?.estimatedDuration || "45s"}
Visual Hook: ${assets.tiktok?.hookVisual || ""}
Spoken Hook: "${assets.tiktok?.hook || ""}"

Body Segments:
${(assets.tiktok?.bodySegments || []).map((s, idx) => `Segment ${idx + 1}:\n${s.bRollCue || ""}\n"${s.dialogue || ""}"`).join("\n\n")}

Outro CTA:
Visual: ${assets.tiktok?.ctaVisual || ""}
Spoken: "${assets.tiktok?.cta || ""}"

Caption: ${assets.tiktok?.caption || ""}
Hashtags: ${(assets.tiktok?.hashtags || []).join(" ")}

--- 2. X (TWITTER) THREAD ---
${(assets.twitter?.tweets || []).map((t) => t.content || "").join("\n\n")}

--- 3. LINKEDIN CAROUSEL SLIDES ---
Cover Title: ${assets.linkedin?.coverTitle || n.title}
Caption: ${assets.linkedin?.caption || ""}

Slides:
${(assets.linkedin?.slides || [])
  .map(
    (s) =>
      `Slide ${s.slideNumber || 1}: ${s.header || ""}\n${(s.bullets || []).map((b) => `• ${b}`).join("\n")}`
  )
  .join("\n\n")}
`;
  })
  .join("\n\n\n")}`;

    const blob = new Blob([bundleText], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `omniclip-${sourceTitle.toLowerCase().replace(/[^a-z0-9]/g, "-")}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setScheduledSuccess("Exported all platform assets as Markdown bundle!");
    triggerConfetti();
    setTimeout(() => {
      setScheduledSuccess(null);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg template-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-midnight-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-template-blue to-template-cyan text-white flex items-center justify-center shadow-lg shadow-template-cyan/20">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Publish & Export Assets</h3>
            <p className="text-xs text-slate-400">
              Schedule directly to your social stack or export bundle
            </p>
          </div>
        </div>

        {/* Success Alert */}
        {scheduledSuccess ? (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3 animate-in zoom-in-95">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <p className="font-semibold">{scheduledSuccess}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Target Options */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Choose Destination
              </label>

              {/* Buffer Option */}
              <div
                onClick={() => setSelectedPlatform("buffer")}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  selectedPlatform === "buffer"
                    ? "bg-midnight-800 border-template-cyan shadow-lg shadow-template-cyan/15 ring-1 ring-template-cyan"
                    : "bg-midnight-950/80 hover:bg-midnight-800/80 border-white/10"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-xs border border-blue-500/20">
                    BUF
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Buffer Social Queue</h4>
                    <p className="text-xs text-slate-400">
                      Dispatches to linked TikTok, Twitter/X, and LinkedIn
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-template-cyan bg-template-cyan/10 px-2.5 py-1 rounded-full border border-template-cyan/30">
                  Ready
                </span>
              </div>

              {/* Hootsuite Option */}
              <div
                onClick={() => setSelectedPlatform("hootsuite")}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  selectedPlatform === "hootsuite"
                    ? "bg-midnight-800 border-template-pink shadow-lg shadow-template-pink/15 ring-1 ring-template-pink"
                    : "bg-midnight-950/80 hover:bg-midnight-800/80 border-white/10"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-template-pink/10 text-template-pink flex items-center justify-center font-bold text-xs border border-template-pink/20">
                    HTS
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Hootsuite / Metricool</h4>
                    <p className="text-xs text-slate-400">
                      Syncs scripts, tweet schedules, and carousel text
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-template-pink bg-template-pink/10 px-2.5 py-1 rounded-full border border-template-pink/30">
                  Ready
                </span>
              </div>

              {/* ZIP / Markdown Export */}
              <div
                onClick={() => setSelectedPlatform("zip")}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  selectedPlatform === "zip"
                    ? "bg-midnight-800 border-template-cyan shadow-lg shadow-template-cyan/15 ring-1 ring-template-cyan"
                    : "bg-midnight-950/80 hover:bg-midnight-800/80 border-white/10"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Export Asset Bundle</h4>
                    <p className="text-xs text-slate-400">
                      Download all 3 nuggets & scripts as Markdown bundle
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  Instant
                </span>
              </div>
            </div>

            {/* Time Slot Picker (if scheduling) */}
            {selectedPlatform !== "zip" && (
              <div className="p-3.5 rounded-2xl bg-midnight-950/90 border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 font-semibold text-template-cyan">
                    <Clock className="w-3.5 h-3.5" />
                    Recommended Viral Publishing Slot:
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-white">{scheduleDate}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>

              {selectedPlatform === "zip" ? (
                <button
                  type="button"
                  onClick={handleDownloadZipSimulation}
                  className="btn-gradient-pill px-6 py-3 text-xs font-bold shadow-lg"
                >
                  <span className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-template-cyan" />
                    <span>Download Bundle (.md)</span>
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    handleSimulateSchedule(
                      selectedPlatform === "buffer" ? "Buffer" : "Hootsuite"
                    )
                  }
                  className="btn-gradient-pill px-6 py-3 text-xs font-bold shadow-lg"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-template-cyan" />
                    <span>Schedule to {selectedPlatform === "buffer" ? "Buffer" : "Hootsuite"}</span>
                  </span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
