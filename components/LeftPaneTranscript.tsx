"use client";

import React, { useState } from "react";
import { GoldenNugget, TranscriptSegment } from "@/types/omniclip";
import {
  Flame,
  Search,
  Clock,
  Sparkles,
  ChevronRight,
  TrendingUp,
  FileText,
} from "lucide-react";

interface LeftPaneTranscriptProps {
  nuggets: GoldenNugget[];
  selectedNuggetId: string;
  onSelectNugget: (id: string) => void;
  transcript: TranscriptSegment[];
  onSeekToTimestamp?: (seconds: number) => void;
}

export function LeftPaneTranscript({
  nuggets,
  selectedNuggetId,
  onSelectNugget,
  transcript,
  onSeekToTimestamp,
}: LeftPaneTranscriptProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTimestamp, setActiveTimestamp] = useState<number | null>(null);

  const selectedNugget = nuggets.find((n) => n.id === selectedNuggetId) || nuggets[0];

  const filteredTranscript = transcript.filter((seg) =>
    seg.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTimestampClick = (seconds: number) => {
    setActiveTimestamp(seconds);
    if (onSeekToTimestamp) {
      onSeekToTimestamp(seconds);
    }
  };

  return (
    <div className="flex flex-col h-full template-card rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Pane Top Header: Golden Nuggets Section (Compact & Sleek) */}
      <div className="p-4 border-b border-white/[0.08] bg-midnight-950/60 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-template-cyan/15 text-template-cyan border border-template-cyan/30">
              <Flame className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">
                Top 3 Golden Nuggets
              </h2>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-template-pink bg-template-pink/10 px-2 py-0.5 rounded-full border border-template-pink/30">
            Ranked by Retention
          </span>
        </div>

        {/* Top 3 Nuggets Cards */}
        <div className="space-y-2">
          {nuggets.map((nugget, index) => {
            const isSelected = nugget.id === selectedNuggetId;
            return (
              <div
                key={nugget.id}
                onClick={() => onSelectNugget(nugget.id)}
                className={`p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-midnight-800/90 border-template-cyan/60 shadow-md shadow-template-cyan/15 ring-1 ring-template-cyan/50"
                    : "bg-midnight-950/60 hover:bg-midnight-800/60 border-white/[0.08] text-slate-300"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    {/* Number Badge */}
                    <span
                      className={`flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-black shrink-0 ${
                        index === 0
                          ? "bg-gradient-to-tr from-amber-400 to-yellow-300 text-black shadow-sm"
                          : index === 1
                          ? "bg-gradient-to-tr from-slate-200 to-slate-400 text-black"
                          : "bg-gradient-to-tr from-template-pink to-rose-600 text-white"
                      }`}
                    >
                      #{index + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white truncate">
                      {nugget.title}
                    </span>
                  </div>

                  {/* Circular Hook Gauge */}
                  <div className="relative flex items-center justify-center w-7 h-7 rounded-full border border-template-cyan bg-template-cyan/10 shrink-0">
                    <span className="text-[9px] font-black font-mono text-template-cyan">
                      {nugget.hookScore}%
                    </span>
                  </div>
                </div>

                {/* Card Meta Badges */}
                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 font-mono text-slate-300 bg-midnight-950 px-2 py-0.5 rounded-md border border-white/10 text-[10px]">
                      <Clock className="w-3 h-3 text-template-cyan" />
                      {nugget.startTimestamp} - {nugget.endTimestamp}
                    </span>
                    <span className="text-[9px] font-bold text-template-pink bg-template-pink/10 px-2 py-0.5 rounded-full border border-template-pink/30">
                      {nugget.viralCategory}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold text-template-cyan flex items-center gap-0.5">
                    {isSelected ? "Active" : "View"}
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why it goes viral callout for selected nugget (Compact) */}
      {selectedNugget && (
        <div className="px-4 py-2 bg-template-cyan/5 border-b border-white/[0.08] text-xs flex items-start gap-2 text-slate-300 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-template-cyan shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed line-clamp-2">
            <strong className="text-template-cyan font-bold">Why it works: </strong>
            {selectedNugget.whyItGoesViral}
          </p>
        </div>
      )}

      {/* Transcript Header & Search Bar (matching search pill style from template) */}
      <div className="p-3.5 border-b border-white/[0.08] bg-midnight-950/70 flex items-center justify-between gap-3 shrink-0">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search transcript..."
            className="w-full pl-9 pr-3 py-2 bg-midnight-900 text-xs text-slate-200 placeholder:text-slate-500 rounded-full border border-white/10 focus:border-template-cyan outline-none"
          />
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-midnight-900 border border-white/10 text-[11px] font-mono text-template-cyan shrink-0 font-medium">
          <FileText className="w-3 h-3" />
          <span>{filteredTranscript.length} Segments</span>
        </div>
      </div>

      {/* EXPANDED TRANSCRIPT VIEWER BOX: High container height, readable font, auto-scrolling */}
      <div className="flex-1 min-h-[300px] overflow-y-auto p-4 sm:p-5 space-y-3 divide-y divide-white/[0.06] bg-midnight-950/40">
        {filteredTranscript.map((segment) => {
          const isInsideNugget =
            selectedNugget &&
            segment.start >= selectedNugget.startSeconds &&
            segment.start <= selectedNugget.endSeconds;

          const isActiveClick = activeTimestamp === segment.start;

          return (
            <div
              key={segment.id}
              className={`pt-3 pb-1.5 rounded-xl px-3 transition-all ${
                isInsideNugget
                  ? "bg-template-cyan/10 border-l-2 border-template-cyan pl-3.5 shadow-sm shadow-template-cyan/10"
                  : isActiveClick
                  ? "bg-midnight-800"
                  : "hover:bg-midnight-900/60"
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Clickable Timestamp */}
                <button
                  type="button"
                  onClick={() => handleTimestampClick(segment.start)}
                  className={`px-2.5 py-1 rounded-full font-mono text-xs font-bold shrink-0 transition-colors ${
                    isInsideNugget
                      ? "bg-template-cyan/25 text-template-cyan hover:bg-template-cyan/35 shadow-sm shadow-template-cyan/20"
                      : "bg-midnight-900 text-slate-400 hover:text-white border border-white/10 hover:border-template-cyan"
                  }`}
                  title="Jump to timestamp"
                >
                  [{segment.timestamp}]
                </button>

                {/* Transcript text with comfortable, readable font and leading */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal pt-0.5">
                  {segment.text}
                </p>
              </div>
            </div>
          );
        })}

        {filteredTranscript.length === 0 && (
          <div className="text-center py-12 text-xs sm:text-sm text-slate-500 font-medium">
            No matching transcript phrases found.
          </div>
        )}
      </div>
    </div>
  );
}
