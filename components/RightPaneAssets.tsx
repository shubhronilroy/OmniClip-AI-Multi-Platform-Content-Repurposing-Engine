"use client";

import React, { useState } from "react";
import { PlatformAssets } from "@/types/omniclip";
import { TikTokPreview } from "./TikTokPreview";
import { TwitterThreadView } from "./TwitterThreadView";
import { LinkedInCarouselView } from "./LinkedInCarouselView";
import { Video, Twitter, Layers, Sparkles } from "lucide-react";

interface RightPaneAssetsProps {
  assets: PlatformAssets;
  nuggetTitle: string;
}

export function RightPaneAssets({ assets, nuggetTitle }: RightPaneAssetsProps) {
  const [activeTab, setActiveTab] = useState<"tiktok" | "twitter" | "linkedin">("tiktok");

  return (
    <div className="flex flex-col h-full template-card rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Pane Header Tabs */}
      <div className="p-4 border-b border-white/[0.08] bg-midnight-950/60 flex items-center justify-between gap-3">
        <div className="grid grid-cols-3 gap-2 bg-midnight-900/90 p-1.5 rounded-2xl border border-white/10 w-full sm:w-auto">
          {/* TikTok / Shorts Tab */}
          <button
            onClick={() => setActiveTab("tiktok")}
            className={`flex items-center justify-center gap-2 py-2 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all ${
              activeTab === "tiktok"
                ? "bg-gradient-to-r from-template-blue to-template-cyan text-white shadow-md shadow-template-cyan/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>TikTok / Reels</span>
          </button>

          {/* Twitter / X Tab */}
          <button
            onClick={() => setActiveTab("twitter")}
            className={`flex items-center justify-center gap-2 py-2 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all ${
              activeTab === "twitter"
                ? "bg-midnight-800 text-template-cyan shadow-sm border border-template-cyan/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Twitter className="w-3.5 h-3.5" />
            <span>X Thread</span>
          </button>

          {/* LinkedIn Carousel Tab */}
          <button
            onClick={() => setActiveTab("linkedin")}
            className={`flex items-center justify-center gap-2 py-2 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all ${
              activeTab === "linkedin"
                ? "bg-template-pink/20 text-template-pink shadow-sm border border-template-pink/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-1.5 text-xs text-template-cyan font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Multi-Platform Repurposed</span>
        </div>
      </div>

      {/* Pane Content Area */}
      <div className="flex-1 p-5 overflow-y-auto">
        {activeTab === "tiktok" && (
          <TikTokPreview script={assets.tiktok} nuggetTitle={nuggetTitle} />
        )}
        {activeTab === "twitter" && (
          <TwitterThreadView thread={assets.twitter} nuggetTitle={nuggetTitle} />
        )}
        {activeTab === "linkedin" && (
          <LinkedInCarouselView
            carousel={assets.linkedin}
            nuggetTitle={nuggetTitle}
          />
        )}
      </div>
    </div>
  );
}
