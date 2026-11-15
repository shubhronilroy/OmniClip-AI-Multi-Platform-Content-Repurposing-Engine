"use client";

import React, { useState, useEffect } from "react";
import { ProcessResponse } from "@/types/omniclip";
import { LeftPaneTranscript } from "./LeftPaneTranscript";
import { RightPaneAssets } from "./RightPaneAssets";
import { ScheduleModal } from "./ScheduleModal";
import { extractYouTubeVideoId } from "@/lib/youtube";
import {
  Share2,
  Clock,
  Flame,
  Layers,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

interface DashboardProps {
  data: ProcessResponse;
  onReset: () => void;
  onUpdateTitle?: (newTitle: string) => void;
}

export function Dashboard({ data, onReset, onUpdateTitle }: DashboardProps) {
  const [selectedNuggetId, setSelectedNuggetId] = useState<string>(
    data.nuggets[0]?.id || "nugget-1"
  );
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  // Dynamic Video Title State
  const videoId = data.videoId || (data.sourceUrl ? extractYouTubeVideoId(data.sourceUrl) : null);
  const fallbackTitle = videoId ? `YouTube Video (${videoId})` : "YouTube Video";

  // Check if title is currently using the generic fallback "YouTube Video (xxx)"
  const isFallbackTitle = !data.sourceTitle || data.sourceTitle.startsWith("YouTube Video (");

  const [currentTitle, setCurrentTitle] = useState<string>(data.sourceTitle || fallbackTitle);
  const [isTitleLoading, setIsTitleLoading] = useState<boolean>(
    data.sourceType === "youtube" && isFallbackTitle
  );

  useEffect(() => {
    // If the title is already specific and not the fallback, use it
    if (data.sourceTitle && !data.sourceTitle.startsWith("YouTube Video (")) {
      setCurrentTitle(data.sourceTitle);
      setIsTitleLoading(false);
      return;
    }

    // If it's a YouTube video, attempt client-side oEmbed fetch with backend fallback
    if (data.sourceType === "youtube" && (data.sourceUrl || videoId)) {
      let isMounted = true;
      setIsTitleLoading(true);

      const targetUrl = data.sourceUrl || `https://www.youtube.com/watch?v=${videoId}`;

      const resolveTitle = async () => {
        try {
          // 1. Try public YouTube oEmbed directly (no API key needed)
          const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(targetUrl)}&format=json`;
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 3500);

          try {
            const res = await fetch(oembedUrl, { signal: controller.signal });
            clearTimeout(timeout);
            if (res.ok) {
              const oembedData = await res.json();
              if (oembedData?.title && typeof oembedData.title === "string") {
                const clean = oembedData.title.trim();
                if (clean && isMounted) {
                  setCurrentTitle(clean);
                  setIsTitleLoading(false);
                  onUpdateTitle?.(clean);
                  return;
                }
              }
            }
          } catch (oembedErr) {
            // CORS or network failure on direct oEmbed, try backend metadata endpoint
            console.warn("[Dashboard] Direct oEmbed blocked/failed, trying /api/metadata fallback:", oembedErr);
          }

          // 2. Try backend metadata proxy route
          const metaRes = await fetch(`/api/metadata?url=${encodeURIComponent(targetUrl)}`);
          if (metaRes.ok) {
            const metaData = await metaRes.json();
            if (metaData?.title && typeof metaData.title === "string" && !metaData.title.startsWith("YouTube Video (")) {
              if (isMounted) {
                setCurrentTitle(metaData.title.trim());
                setIsTitleLoading(false);
                onUpdateTitle?.(metaData.title.trim());
                return;
              }
            }
          }
        } catch (err) {
          console.warn("[Dashboard] Could not resolve video title:", err);
        } finally {
          if (isMounted) {
            setIsTitleLoading(false);
          }
        }
      };

      resolveTitle();

      return () => {
        isMounted = false;
      };
    }
  }, [data.sourceTitle, data.sourceUrl, data.sourceType, videoId, onUpdateTitle]);

  const selectedNugget =
    data.nuggets.find((n) => n.id === selectedNuggetId) || data.nuggets[0];
  const activeAssets =
    data.assetsByNugget[selectedNuggetId] ||
    data.assetsByNugget[data.nuggets[0]?.id];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Action & Meta Bar */}
      <div className="template-card rounded-3xl p-5 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl">
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onReset}
              className="p-1.5 rounded-full bg-midnight-800 hover:bg-midnight-700 text-slate-400 hover:text-white transition-colors shrink-0"
              title="Back to Input"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="flex h-2.5 w-2.5 rounded-full bg-template-cyan animate-pulse shrink-0" />

            {/* Title / Skeleton Loading State */}
            {isTitleLoading ? (
              <div className="flex items-center gap-2.5 py-0.5">
                <div className="h-6 w-52 sm:w-80 max-w-md bg-white/[0.08] rounded-lg animate-pulse border border-white/10" />
                <span className="text-[11px] text-slate-400 italic hidden sm:inline">
                  Loading title...
                </span>
              </div>
            ) : (
              <h1
                className="text-lg font-bold text-white line-clamp-1 tracking-tight"
                title={currentTitle}
              >
                {currentTitle}
              </h1>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pl-8">
            <span className="flex items-center gap-1.5 font-mono text-slate-300">
              <Clock className="w-3.5 h-3.5 text-template-cyan" />
              Duration: {data.sourceDuration}
            </span>
            <span className="text-slate-600">•</span>
            <span className="capitalize text-slate-300">
              Source: {data.sourceType}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-template-cyan font-bold">
              3 Golden Nuggets Mined
            </span>
          </div>
        </div>

        {/* Nugget Quick Filter Selector & Export Button */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Nugget Selector Pills */}
          <div className="flex items-center p-1.5 bg-midnight-950/80 rounded-2xl border border-white/10 gap-1.5">
            {data.nuggets.map((n, i) => (
              <button
                key={n.id}
                onClick={() => setSelectedNuggetId(n.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedNuggetId === n.id
                    ? "bg-gradient-to-r from-template-blue to-template-cyan text-white shadow-lg shadow-template-cyan/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Nugget {i + 1}</span>
                <span className="text-[10px] font-mono opacity-80">
                  ({n.hookScore}%)
                </span>
              </button>
            ))}
          </div>

          {/* Export / Schedule Button (using template's gradient button styling) */}
          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className="btn-gradient-pill px-6 py-3 text-xs font-bold shadow-lg shadow-template-pink/20 cursor-pointer ml-auto md:ml-0"
          >
            <span className="flex items-center gap-2">
              <Share2 className="w-3.5 h-3.5 text-template-cyan" />
              <span>SCHEDULE / EXPORT</span>
            </span>
          </button>
        </div>
      </div>

      {/* Split-Screen Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start min-h-[840px]">
        {/* Left Pane (Transcript & Golden Nuggets) - 5 columns */}
        <div className="lg:col-span-5 h-[840px]">
          <LeftPaneTranscript
            nuggets={data.nuggets}
            selectedNuggetId={selectedNuggetId}
            onSelectNugget={(id) => setSelectedNuggetId(id)}
            transcript={data.transcript}
          />
        </div>

        {/* Right Pane (Generated Platform Assets) - 7 columns */}
        <div className="lg:col-span-7 h-[840px]">
          {activeAssets ? (
            <RightPaneAssets
              assets={activeAssets}
              nuggetTitle={selectedNugget?.title || "Golden Nugget"}
            />
          ) : (
            <div className="flex items-center justify-center h-full rounded-3xl template-card border border-white/10 text-slate-400 text-sm">
              Select a golden nugget to view generated assets.
            </div>
          )}
        </div>
      </div>

      {/* Schedule / Export Modal */}
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        nuggets={data.nuggets}
        assetsByNugget={data.assetsByNugget}
        sourceTitle={data.sourceTitle}
      />
    </div>
  );
}
