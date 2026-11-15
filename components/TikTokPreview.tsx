"use client";

import React, { useState } from "react";
import { TikTokScript } from "@/types/omniclip";
import {
  Copy,
  Check,
  Video,
  Clapperboard,
  Music,
  Clock,
  Sparkles,
  Smartphone,
  Eye,
  FileText,
  User,
} from "lucide-react";

interface TikTokPreviewProps {
  script: TikTokScript;
  nuggetTitle: string;
}

export function TikTokPreview({ script, nuggetTitle }: TikTokPreviewProps) {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<"script" | "mockup">("script");

  const bodySegments = script.bodySegments || [];
  const hashtags = script.hashtags || [];
  const hookVisual = script.hookVisual || "";

  const formattedFullScript = `TITLE: ${script.title || nuggetTitle}
ESTIMATED DURATION: ${script.estimatedDuration || "45s"}
AUDIO VIBE: ${script.audioVibe || "Upbeat & Inspiring"}

[HOOK - 0-3s]
Visual: ${hookVisual}
Spoken: "${script.hook || ""}"

[BODY SEGMENTS]
${bodySegments
  .map(
    (seg, i) =>
      `Segment ${i + 1}:\n${seg.bRollCue || ""}\nSpoken: "${seg.dialogue || ""}"`
  )
  .join("\n\n")}

[CALL TO ACTION]
Visual: ${script.ctaVisual || ""}
Spoken: "${script.cta || ""}"

CAPTION:
${script.caption || ""}

HASHTAGS:
${hashtags.join(" ")}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedFullScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full space-y-5">
      {/* Top Meta & Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-midnight-950/70 rounded-2xl border border-white/10">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-midnight-900 border border-white/10 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-template-cyan" />
            <span className="font-mono font-bold text-white">{script.estimatedDuration || "45s"}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-midnight-900 border border-white/10 text-slate-300">
            <Music className="w-3.5 h-3.5 text-template-pink" />
            <span className="truncate max-w-[200px] text-xs">{script.audioVibe}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Toggle View Mode */}
          <div className="flex items-center p-1 bg-midnight-900 rounded-full border border-white/10 text-xs">
            <button
              onClick={() => setViewMode("script")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-colors font-medium ${
                viewMode === "script"
                  ? "bg-template-cyan/20 text-template-cyan shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Script View</span>
            </button>
            <button
              onClick={() => setViewMode("mockup")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-colors font-medium ${
                viewMode === "mockup"
                  ? "bg-template-cyan/20 text-template-cyan shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>9:16 Mockup</span>
            </button>
          </div>

          {/* Copy Script Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-template-blue to-template-cyan text-white text-xs font-bold shadow-md shadow-template-cyan/20 transition-all active:scale-95 hover:opacity-95"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Script</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === "script" ? (
        <div className="space-y-4 overflow-y-auto pr-1">
          {/* Title Banner */}
          <div className="p-4 rounded-2xl bg-midnight-950/60 border border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-template-cyan block mb-1">
              Shorts / TikTok Video Concept
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white">{script.title}</h3>
          </div>

          {/* SECTION 1: THE HOOK */}
          <div className="p-5 rounded-2xl bg-template-cyan/5 border border-template-cyan/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-template-cyan">
                <Sparkles className="w-3.5 h-3.5" />
                The First 3 Seconds (Viral Hook)
              </span>
              <span className="text-[10px] font-mono text-template-cyan bg-template-cyan/15 px-2.5 py-0.5 rounded-full border border-template-cyan/30">
                00:00 - 00:03
              </span>
            </div>

            {/* Visual B-Roll Cue */}
            <div className="p-3 rounded-xl bg-midnight-950/80 border border-template-cyan/20 text-xs font-mono text-cyan-200">
              <span className="font-bold text-template-cyan">Visual Cue: </span>
              {script.hookVisual}
            </div>

            {/* Spoken Audio */}
            <div className="text-sm font-semibold text-white pl-3 border-l-2 border-template-cyan leading-relaxed italic">
              "{script.hook}"
            </div>
          </div>

          {/* SECTION 2: BODY SEGMENTS */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-1">
              Body & Core Storyboard ({bodySegments.length} Segments)
            </span>

            {bodySegments.map((segment, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-midnight-950/60 border border-white/[0.08] space-y-2.5 hover:border-template-cyan/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-template-blue uppercase tracking-wide">
                    Segment #{idx + 1}
                  </span>
                  <Clapperboard className="w-3.5 h-3.5 text-slate-500" />
                </div>

                {/* Visual Cue */}
                <div className="p-2.5 rounded-xl bg-midnight-900 border border-white/10 text-xs font-mono text-cyan-300">
                  <span className="font-semibold text-slate-400">Visual: </span>
                  {segment.bRollCue || ""}
                </div>

                {/* Spoken Dialogue */}
                <p className="text-xs text-slate-200 leading-relaxed pl-3 border-l-2 border-template-blue font-medium">
                  "{segment.dialogue || ""}"
                </p>
              </div>
            ))}
          </div>

          {/* SECTION 3: CALL TO ACTION */}
          <div className="p-5 rounded-2xl bg-template-pink/5 border border-template-pink/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-template-pink">
                Outro Call to Action
              </span>
              <span className="text-[10px] font-mono text-template-pink bg-template-pink/15 px-2.5 py-0.5 rounded-full border border-template-pink/30">
                Final 5s
              </span>
            </div>

            <div className="p-3 rounded-xl bg-midnight-950/80 border border-template-pink/20 text-xs font-mono text-pink-200">
              <span className="font-bold text-template-pink">Visual: </span>
              {script.ctaVisual || ""}
            </div>

            <p className="text-sm font-semibold text-white pl-3 border-l-2 border-template-pink italic">
              "{script.cta || ""}"
            </p>
          </div>

          {/* SECTION 4: CAPTION & HASHTAGS */}
          <div className="p-4 rounded-2xl bg-midnight-950/80 border border-white/10 space-y-2.5 text-xs">
            <span className="font-bold text-slate-300 block">Ready-To-Paste Caption:</span>
            <p className="text-slate-400 leading-relaxed">{script.caption || ""}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {hashtags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-full bg-midnight-900 text-template-cyan font-mono text-[11px] border border-template-cyan/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* 9:16 PHONE MOCKUP VIEW: Styled directly like the phone in the template */
        <div className="flex items-center justify-center py-4">
          <div className="relative w-[300px] h-[580px] rounded-[40px] bg-gradient-to-b from-[#00D2FF] to-[#0055FF] p-3 shadow-2xl shadow-template-cyan/30 flex flex-col justify-between overflow-hidden border-4 border-white/30 text-white">
            {/* Top Notch */}
            <div className="w-24 h-4 bg-midnight-950 rounded-full mx-auto" />

            {/* Top Header Overlay */}
            <div className="pt-2 flex items-center justify-between text-xs text-white/90 z-10 px-2">
              <span className="font-black tracking-wider text-[11px]">OMNICLIP REEL</span>
              <span className="px-2.5 py-0.5 rounded-full bg-black/40 text-[10px] font-mono">
                {script.estimatedDuration || "45s"}
              </span>
            </div>

            {/* Center: Template's Circular Avatar & Dynamic Subtitles */}
            <div className="my-auto text-center space-y-4 z-10 px-3">
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF2E93] to-[#FF5A5F] border-2 border-white shadow-lg mx-auto">
                <User className="w-8 h-8 text-white" />
              </div>

              <div className="inline-block px-3 py-1 rounded-full bg-midnight-950/80 text-template-cyan font-black text-[10px] tracking-widest uppercase border border-template-cyan/40">
                HOOK SCENE
              </div>

              <p className="text-base font-black uppercase text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-tight">
                "{script.hook || ""}"
              </p>

              <div className="inline-block px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-[11px] font-mono text-cyan-200 border border-white/20">
                {(script.hookVisual || "Visual: Dynamic talking head").slice(0, 55)}...
              </div>
            </div>

            {/* Bottom Meta & Caption Overlay */}
            <div className="space-y-2 z-10 text-xs p-3 bg-black/50 backdrop-blur-md rounded-2xl border border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-template-pink flex items-center justify-center font-bold text-[9px]">
                  OC
                </div>
                <span className="font-bold text-white text-[11px]">@yourbrand</span>
              </div>
              <p className="text-[11px] text-white/90 line-clamp-2 leading-tight">
                {script.caption}
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-white/70">
                <Music className="w-3 h-3 text-template-cyan" />
                <span className="truncate">{script.audioVibe}</span>
              </div>
            </div>

            {/* Subtle Gradient Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />
          </div>
        </div>
      )}
    </div>
  );
}
