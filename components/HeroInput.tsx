"use client";

import React, { useState, useRef } from "react";
import {
  Youtube,
  Upload,
  Sparkles,
  Zap,
  ArrowRight,
  FileAudio,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileVideo,
  PlayCircle,
  Play,
  Share2,
  TrendingUp,
  Sliders,
  Mail,
  User,
} from "lucide-react";
import { formatFileSize } from "@/lib/utils";

interface HeroInputProps {
  onProcessUrl: (url: string) => Promise<void>;
  onProcessFile: (file: File) => Promise<void>;
  onLoadPreset: (presetId: string) => Promise<void>;
  isLoading: boolean;
  loadingStep: string;
  error: string | null;
  onClearError: () => void;
  onOpenApiKeyModal: () => void;
}

export function HeroInput({
  onProcessUrl,
  onProcessFile,
  onLoadPreset,
  isLoading,
  loadingStep,
  error,
  onClearError,
  onOpenApiKeyModal,
}: HeroInputProps) {
  const [activeTab, setActiveTab] = useState<"youtube" | "upload" | "presets">("youtube");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClearError();

    if (activeTab === "youtube") {
      if (!youtubeUrl.trim()) return;
      onProcessUrl(youtubeUrl.trim());
    } else if (activeTab === "upload") {
      if (!selectedFile) return;
      onProcessFile(selectedFile);
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
    }
  };

  const sampleUrls = [
    {
      title: "Andrej Karpathy: LLM OS",
      presetId: "karpathy",
      url: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
      desc: "Operating systems, memory hierarchy, while-loops",
    },
    {
      title: "Alex Hormozi: $100M Value",
      presetId: "hormozi",
      url: "https://www.youtube.com/watch?v=sample-hormozi",
      desc: "The 4 variables of pricing power and friction",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* TOP HERO SECTION: Matching the 2-Column Split from the Uploaded Template */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* LEFT COLUMN: Graphic Composition matching the Template's Phone & Floating Glass Cards */}
        <div className="lg:col-span-6 relative flex items-center justify-center order-2 lg:order-1 py-6">
          {/* Ambient Glow behind Graphic */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-template-blue/20 blur-3xl -z-10" />

          {/* Composition Container */}
          <div className="relative w-full max-w-[460px] aspect-[4/3] sm:aspect-square flex items-center justify-center select-none">
            {/* FLOATING CARD 1: Top-Left Message/Envelope Card */}
            <div className="absolute top-4 left-2 sm:left-4 z-20 p-3 sm:p-4 rounded-2xl bg-midnight-800/90 border border-template-pink/40 shadow-glass shadow-template-pink/10 backdrop-blur-md animate-pulse-slow">
              <div className="w-8 h-8 rounded-xl bg-template-pink/20 flex items-center justify-center text-template-pink">
                <Mail className="w-4 h-4" />
              </div>
              <div className="w-8 h-1.5 rounded-full bg-white/20 mt-2" />
            </div>

            {/* Dotted Connection Line 1 */}
            <div className="absolute top-12 left-16 sm:left-24 w-16 border-t-2 border-dashed border-white/20 -z-10" />

            {/* FLOATING CARD 2: Mid-Left Dual Circular Gauges Card (matching template's dual circular dials) */}
            <div className="absolute bottom-10 left-0 sm:left-2 z-20 p-3 sm:p-4 rounded-2xl bg-midnight-800/90 border border-template-cyan/40 shadow-glass shadow-template-cyan/10 backdrop-blur-md space-y-2">
              <div className="flex items-center gap-2">
                {/* Gauge 1 */}
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-template-cyan bg-template-cyan/10">
                  <span className="text-[10px] font-black text-template-cyan">98%</span>
                </div>
                {/* Gauge 2 */}
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-template-pink bg-template-pink/10">
                  <span className="text-[10px] font-black text-template-pink">95%</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="w-16 h-1.5 rounded-full bg-white/20" />
                <div className="w-10 h-1 rounded-full bg-template-cyan/40" />
              </div>
            </div>

            {/* FLOATING CARD 3: Top-Right Audio Player Bar */}
            <div className="absolute top-12 right-0 sm:right-2 z-20 px-3.5 py-2.5 rounded-xl bg-midnight-800/95 border border-white/15 shadow-glass backdrop-blur-md flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-template-cyan/20 text-template-cyan flex items-center justify-center">
                <Play className="w-3 h-3 fill-template-cyan" />
              </div>
              <div className="w-20 sm:w-28 h-1.5 rounded-full bg-white/20 overflow-hidden relative">
                <div className="w-3/4 h-full bg-gradient-to-r from-template-cyan to-template-blue rounded-full" />
              </div>
            </div>

            {/* FLOATING CARD 4: Mid-Right Multi-Color Progress Bars Card */}
            <div className="absolute bottom-16 right-0 sm:right-4 z-20 p-3 sm:p-4 rounded-2xl bg-midnight-800/90 border border-white/10 shadow-glass backdrop-blur-md space-y-2">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] font-bold text-slate-300">PLATFORMS</span>
                <span className="w-1.5 h-1.5 rounded-full bg-template-cyan animate-ping" />
              </div>
              <div className="space-y-1.5 w-28 sm:w-32">
                <div className="h-1.5 w-full bg-template-cyan rounded-full" />
                <div className="h-1.5 w-4/5 bg-template-blue rounded-full" />
                <div className="h-1.5 w-3/5 bg-template-pink rounded-full" />
              </div>
            </div>

            {/* CENTRAL PHONE FRAME: Glowing cyan-to-blue device shell */}
            <div className="relative w-[180px] sm:w-[210px] h-[340px] sm:h-[390px] rounded-[36px] bg-gradient-to-b from-[#00D2FF] to-[#0055FF] p-2 shadow-2xl shadow-template-cyan/25 flex flex-col justify-between overflow-hidden border-2 border-white/30 z-10">
              {/* Phone Top Notch */}
              <div className="w-16 h-3 bg-midnight-900 rounded-full mx-auto mb-2" />

              {/* Inner Avatar Graphic (Matching Template's Circular Avatar) */}
              <div className="flex flex-col items-center justify-center my-auto space-y-3">
                <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#FF2E93] to-[#FF5A5F] border-4 border-white shadow-xl shadow-template-pink/30">
                  <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                  <span className="absolute -bottom-1 px-2 py-0.5 rounded-full bg-midnight-900 text-[9px] font-bold text-template-cyan border border-template-cyan/40">
                    AI CREATOR
                  </span>
                </div>

                {/* Simulated Content Bars */}
                <div className="w-3/4 space-y-2">
                  <div className="h-2.5 w-full bg-white/90 rounded-full mx-auto" />
                  <div className="h-2 w-2/3 bg-white/70 rounded-full mx-auto" />
                </div>
              </div>

              {/* Phone Bottom Bars */}
              <div className="space-y-2 p-2 bg-black/25 backdrop-blur-sm rounded-2xl">
                <div className="h-2 w-full bg-white/80 rounded-full" />
                <div className="h-2 w-1/2 bg-white/60 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Typography & Signature Gradient Pill Button */}
        <div className="lg:col-span-6 space-y-6 order-1 lg:order-2 text-center lg:text-left">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-midnight-800 border border-white/10 text-xs font-semibold text-template-cyan">
            <span className="w-2 h-2 rounded-full bg-template-pink animate-pulse" />
            <span>AI Multi-Platform Repurposing</span>
          </div>

          {/* Two-Tone Title from the Template ("UI / UX Landing page" style) */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none">
              <span className="text-template-cyan">OMNI / </span>
              <span className="text-template-blue">CLIP</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Content Repurposing
            </h2>
          </div>

          {/* Body Description */}
          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
            Transform any YouTube URL or uploaded audio/video into high-converting
            9:16 vertical TikTok scripts with B-roll cues, numbered X threads, and 5-slide LinkedIn carousels.
          </p>

          {/* Template's Signature Gradient Pill Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              onClick={() => {
                const inputEl = document.getElementById("omniclip-input-card");
                inputEl?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-gradient-pill px-8 py-4 text-xs sm:text-sm shadow-lg shadow-template-cyan/15 group"
            >
              <span className="flex items-center gap-2">
                <span>START REPURPOSING</span>
                <ArrowRight className="w-4 h-4 text-template-cyan group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button
              onClick={() => onLoadPreset("karpathy")}
              className="px-6 py-4 rounded-full bg-midnight-800 hover:bg-midnight-700 text-slate-300 hover:text-white border border-white/10 text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors"
            >
              Explore Demo Presets ⚡
            </button>
          </div>
        </div>
      </div>

      {/* INPUT CARD CONTAINER: Styled as Sleek Midnight Glass Card */}
      <div
        id="omniclip-input-card"
        className="template-card rounded-3xl p-4 sm:p-8 border border-white/10 shadow-2xl relative"
      >
        {/* Tab Buttons */}
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-midnight-950/80 rounded-2xl mb-6 border border-white/[0.08]">
          <button
            type="button"
            onClick={() => {
              setActiveTab("youtube");
              onClearError();
            }}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all ${
              activeTab === "youtube"
                ? "bg-midnight-800 text-white shadow-lg border border-white/15"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Youtube className="w-4 h-4 text-red-500" />
            <span>YouTube URL</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("upload");
              onClearError();
            }}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all ${
              activeTab === "upload"
                ? "bg-midnight-800 text-white shadow-lg border border-white/15"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Upload className="w-4 h-4 text-template-cyan" />
            <span>Upload File</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("presets");
              onClearError();
            }}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all ${
              activeTab === "presets"
                ? "bg-midnight-800 text-white shadow-lg border border-white/15"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Instant Presets</span>
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TAB 1: YOUTUBE */}
          {activeTab === "youtube" && (
            <div className="space-y-4">
              <div className="relative flex items-center">
                <div className="absolute left-4 pointer-events-none text-red-500">
                  <Youtube className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="Paste YouTube Link (e.g. https://www.youtube.com/watch?v=...)"
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-4 bg-midnight-950/90 rounded-2xl border border-white/10 focus:border-template-cyan focus:ring-1 focus:ring-template-cyan text-sm sm:text-base text-white placeholder:text-slate-500 transition-all outline-none font-medium"
                />
              </div>

              {/* Quick Fill Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-slate-400 font-semibold">Try a verified sample:</span>
                {sampleUrls.map((sample) => (
                  <button
                    key={sample.presetId}
                    type="button"
                    disabled={isLoading}
                    onClick={() => {
                      setYoutubeUrl(sample.url);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-midnight-800 hover:bg-midnight-700 text-slate-300 border border-white/10 transition-colors text-xs font-medium"
                  >
                    <PlayCircle className="w-3.5 h-3.5 text-template-cyan" />
                    <span>{sample.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: FILE UPLOAD */}
          {activeTab === "upload" && (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*,video/mp4,video/quicktime,video/webm"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
              />
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center p-10 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
                  isDragging
                    ? "border-template-cyan bg-template-cyan/10"
                    : "border-white/15 hover:border-template-cyan/50 bg-midnight-950/60 hover:bg-midnight-950/80"
                }`}
              >
                {selectedFile ? (
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-14 h-14 rounded-2xl bg-template-cyan/20 text-template-cyan flex items-center justify-center">
                      {selectedFile.type.startsWith("video") ? (
                        <FileVideo className="w-7 h-7" />
                      ) : (
                        <FileAudio className="w-7 h-7" />
                      )}
                    </div>
                    <div>
                      <p className="text-base font-bold text-white">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {formatFileSize(selectedFile.size)} • Ready for Whisper Transcription
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                      }}
                      className="text-xs text-template-pink hover:underline pt-1 font-semibold"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-midnight-800 text-template-cyan flex items-center justify-center border border-white/10 shadow-lg">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-bold text-white">
                        Click to upload or drag & drop audio/video file
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Supports MP4, MP3, M4A, WAV, WebM (up to 25MB)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: INSTANT PRESETS */}
          {activeTab === "presets" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sampleUrls.map((preset) => (
                <div
                  key={preset.presetId}
                  onClick={() => onLoadPreset(preset.presetId)}
                  className="p-5 rounded-2xl bg-midnight-950/80 hover:bg-midnight-800 border border-white/10 hover:border-template-cyan/50 cursor-pointer transition-all group shadow-lg flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-template-cyan">
                        Instant Verified Clip
                      </span>
                      <Zap className="w-4 h-4 text-amber-400" />
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-template-cyan transition-colors">
                      {preset.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {preset.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-template-cyan mt-5 group-hover:translate-x-1 transition-transform">
                    <span>Load 3 Nuggets + All Assets</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1 space-y-1">
                <p className="font-bold text-rose-200">Processing Alert</p>
                <p className="text-rose-300/90 leading-relaxed">{error}</p>
                {error.includes("API Key") && (
                  <button
                    type="button"
                    onClick={onOpenApiKeyModal}
                    className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-bold transition-colors"
                  >
                    <span>Enter Groq API Key</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Loading Progress State */}
          {isLoading && (
            <div className="p-5 rounded-2xl bg-midnight-950/90 border border-template-cyan/30 space-y-4">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-template-cyan font-bold">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing Content Repurposing Pipeline</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  {loadingStep}
                </span>
              </div>

              {/* Progress Gradient Bar */}
              <div className="w-full h-2 bg-midnight-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-template-cyan via-template-blue to-template-pink animate-pulse rounded-full w-full" />
              </div>

              {/* Pipeline Step Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-template-cyan shrink-0" />
                  <span>Media Ingestion</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-template-cyan shrink-0" />
                  <span>Whisper Transcript</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-template-pink animate-ping shrink-0" />
                  <span className="text-white font-medium">Groq Llama 3.1 Mining</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-600 shrink-0" />
                  <span>Multi-Asset Polish</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Trigger Button */}
          {activeTab !== "presets" && (
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading || (activeTab === "youtube" ? !youtubeUrl.trim() : !selectedFile)}
                className={`w-full btn-gradient-pill py-4 px-8 text-sm sm:text-base ${
                  isLoading || (activeTab === "youtube" ? !youtubeUrl.trim() : !selectedFile)
                    ? "opacity-40 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Repurposing Content...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-template-cyan" />
                    <span>GENERATE OMNICLIPS (3 Nuggets + Assets)</span>
                    <ArrowRight className="w-5 h-5 ml-1 text-template-pink" />
                  </span>
                )}
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Feature Value Props footer: 3 Platform Shells */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="template-card template-card-hover p-6 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-template-cyan/10 border border-template-cyan/30 text-template-cyan flex items-center justify-center mb-3">
            <span className="font-black text-sm">9:16</span>
          </div>
          <h4 className="text-base font-bold text-white">TikTok / Reels Scripts</h4>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Spoken 3-second hook, bracketed B-roll visual cues [Visual: zoom], dialogue, and outro CTA.
          </p>
        </div>

        <div className="template-card template-card-hover p-6 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-template-blue/10 border border-template-blue/30 text-template-blue flex items-center justify-center mb-3">
            <span className="font-black text-sm">𝕏</span>
          </div>
          <h4 className="text-base font-bold text-white">X (Twitter) Threads</h4>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Numbered tweet sequence (1/5, 2/5) optimized for retweet virality, character limits, and engagement.
          </p>
        </div>

        <div className="template-card template-card-hover p-6 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-template-pink/10 border border-template-pink/30 text-template-pink flex items-center justify-center mb-3">
            <span className="font-black text-sm">in</span>
          </div>
          <h4 className="text-base font-bold text-white">LinkedIn PDF Carousels</h4>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            5 structured slides (Hook cover, core framework, actionable steps, and CTA) for professional authority.
          </p>
        </div>
      </div>
    </div>
  );
}
