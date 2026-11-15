"use client";

import React, { useState } from "react";
import { TwitterThread } from "@/types/omniclip";
import {
  Copy,
  Check,
  Twitter,
  MessageSquare,
  Repeat2,
  Heart,
} from "lucide-react";

interface TwitterThreadViewProps {
  thread: TwitterThread;
  nuggetTitle: string;
}

export function TwitterThreadView({ thread, nuggetTitle }: TwitterThreadViewProps) {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const tweets = thread.tweets || [];
  const hashtags = thread.hashtags || [];

  const formattedFullThread = tweets
    .map((t) => t.content || "")
    .join("\n\n---\n\n");

  const handleCopyAll = () => {
    navigator.clipboard.writeText(formattedFullThread);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopySingle = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="flex flex-col h-full space-y-5">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-midnight-950/70 rounded-2xl border border-white/10">
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-midnight-900 border border-white/10 text-slate-300">
            <Twitter className="w-3.5 h-3.5 text-template-cyan" />
            <span className="font-bold text-white">
              {tweets.length} Tweets in Thread
            </span>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Optimized for algorithmic dwell time & RTs
          </span>
        </div>

        {/* Copy All Button */}
        <button
          onClick={handleCopyAll}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-template-cyan/15 hover:bg-template-cyan/25 text-template-cyan border border-template-cyan/40 text-xs font-bold transition-all active:scale-95"
        >
          {copiedAll ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Thread Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Full Thread</span>
            </>
          )}
        </button>
      </div>

      {/* Tweet Cards List */}
      <div className="space-y-3.5 overflow-y-auto pr-1">
        {tweets.map((tweet, idx) => {
          const charCount = (tweet.content || "").length;
          const isOverLimit = charCount > 280;
          const isCopied = copiedIndex === idx;

          return (
            <div
              key={idx}
              className="relative p-5 rounded-2xl bg-midnight-950/70 border border-white/[0.08] hover:border-template-cyan/40 transition-all space-y-3.5 group shadow-lg"
            >
              {/* Header: User Profile Simulation & Tag */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-template-blue to-template-cyan flex items-center justify-center font-bold text-xs text-white shadow-md shadow-template-cyan/20">
                    𝕏
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white">OmniCreator</span>
                      <span className="text-[11px] text-slate-500">@creator</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs font-mono text-template-cyan font-bold">
                        {idx + 1}/{tweets.length}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {tweet.tag && (
                    <span className="text-[10px] font-bold text-template-cyan bg-template-cyan/10 px-2.5 py-0.5 rounded-full border border-template-cyan/30">
                      {tweet.tag}
                    </span>
                  )}
                  {/* Single Copy Button */}
                  <button
                    onClick={() => handleCopySingle(tweet.content, idx)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-full hover:bg-midnight-800 text-slate-400 hover:text-white transition-opacity"
                    title="Copy this tweet"
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-template-cyan" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Tweet Content */}
              <div className="text-xs sm:text-sm text-slate-100 whitespace-pre-line leading-relaxed pl-1 font-normal">
                {tweet.content}
              </div>

              {/* Footer: Stats & Char Count */}
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs text-slate-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 hover:text-template-cyan transition-colors">
                    <MessageSquare className="w-3.5 h-3.5" /> 24
                  </span>
                  <span className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
                    <Repeat2 className="w-3.5 h-3.5" /> 89
                  </span>
                  <span className="flex items-center gap-1 hover:text-template-pink transition-colors">
                    <Heart className="w-3.5 h-3.5" /> 412
                  </span>
                </div>

                {/* Character Count Badge */}
                <div className="flex items-center gap-1 font-mono text-[11px]">
                  <span
                    className={`font-bold ${
                      isOverLimit
                        ? "text-rose-400"
                        : charCount > 250
                        ? "text-amber-400"
                        : "text-slate-400"
                    }`}
                  >
                    {charCount}/280
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Thread Hashtags */}
        {hashtags.length > 0 && (
          <div className="p-4 rounded-2xl bg-midnight-950/60 border border-white/10 flex items-center gap-2.5 text-xs">
            <span className="text-slate-400 font-semibold">Tags:</span>
            <div className="flex flex-wrap gap-2">
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
        )}
      </div>
    </div>
  );
}
