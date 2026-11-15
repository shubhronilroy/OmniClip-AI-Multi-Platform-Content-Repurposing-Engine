"use client";

import React from "react";
import { Sparkles, Key, Search, RefreshCw, Layers } from "lucide-react";

interface HeaderProps {
  hasResults: boolean;
  onReset: () => void;
  onOpenApiKeyModal: () => void;
  hasCustomKey: boolean;
}

export function Header({
  hasResults,
  onReset,
  onOpenApiKeyModal,
  hasCustomKey,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-midnight-900/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo - Styled in Electric Cyan & Blue gradient */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none group"
          onClick={onReset}
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-template-blue to-template-cyan shadow-lg shadow-template-cyan/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-template-pink opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-template-pink"></span>
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight text-template-cyan">
                Omni
              </span>
              <span className="text-2xl font-black tracking-tight text-white">
                Clip
              </span>
            </div>
            <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase hidden sm:block">
              AI Content Engine
            </span>
          </div>
        </div>

        {/* Center Navigation Links - Keep ONLY Home and About */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button
            onClick={onReset}
            className="text-white font-semibold transition-colors nav-active-pill"
          >
            Home
          </button>
          <span className="text-slate-400 hover:text-white transition-colors cursor-pointer">
            About
          </span>
        </nav>

        {/* Right Section: Pill Action Bar & API Key Button */}
        <div className="flex items-center gap-3">
          {/* Engine Status Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-midnight-800 border border-white/10 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-template-cyan animate-pulse" />
            <span className="font-semibold text-slate-200">Llama 3.1 (8B)</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Groq Whisper</span>
          </div>

          {/* Search-style Pill Button for API Key Configuration */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
              hasCustomKey
                ? "bg-template-cyan/10 text-template-cyan border border-template-cyan/40 shadow-sm shadow-template-cyan/20"
                : "bg-midnight-800 hover:bg-midnight-700 text-slate-300 border border-white/10 hover:border-white/20"
            }`}
            title="Configure Groq API Key"
          >
            <Key className="w-3.5 h-3.5 text-template-cyan" />
            <span className="hidden sm:inline">
              {hasCustomKey ? "API Key Active" : "Set API Key"}
            </span>
            <Search className="w-3.5 h-3.5 text-slate-400 ml-1" />
          </button>

          {/* Reset Button (when results active) */}
          {hasResults && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-template-pink/20 to-template-purple/20 hover:from-template-pink/30 hover:to-template-purple/30 text-pink-300 border border-template-pink/30 text-xs font-bold transition-all shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>New Clip</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
