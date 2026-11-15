"use client";

import React, { useState } from "react";
import { LinkedInCarousel, CarouselSlide } from "@/types/omniclip";
import {
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  ArrowRight,
  Eye,
  FileText,
} from "lucide-react";

interface LinkedInCarouselViewProps {
  carousel: LinkedInCarousel;
  nuggetTitle: string;
}

export function LinkedInCarouselView({
  carousel,
  nuggetTitle,
}: LinkedInCarouselViewProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [copiedAll, setCopiedAll] = useState(false);
  const [viewMode, setViewMode] = useState<"visual" | "outline">("visual");

  const slides = carousel.slides || [];
  const currentSlide: CarouselSlide | undefined = slides[currentSlideIndex];

  const formattedFullCarousel = `TITLE: ${carousel.coverTitle || nuggetTitle}

CAPTION:
${carousel.caption || ""}

--- SLIDE BREAKDOWN ---
${slides
  .map(
    (slide) => `[SLIDE ${slide.slideNumber || 1}/5: ${slide.type || "CORE_INSIGHT"}]
Header: ${slide.header || ""}
${slide.subHeader ? `Subheader: ${slide.subHeader}\n` : ""}
Bullets:
${(slide.bullets || []).map((b) => `• ${b}`).join("\n")}
${slide.callout ? `Callout: ${slide.callout}\n` : ""}`
  )
  .join("\n\n---\n\n")}

HASHTAGS:
${(carousel.hashtags || []).join(" ")}`;

  const handleCopyAll = () => {
    navigator.clipboard.writeText(formattedFullCarousel);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-5">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-midnight-950/70 rounded-2xl border border-white/10">
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-midnight-900 border border-white/10 text-slate-300">
            <Layers className="w-3.5 h-3.5 text-template-pink" />
            <span className="font-bold text-white">
              {slides.length}-Slide Carousel
            </span>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Engineered for PDF carousel swipe retention
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Toggle View Mode */}
          <div className="flex items-center p-1 bg-midnight-900 rounded-full border border-white/10 text-xs">
            <button
              onClick={() => setViewMode("visual")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-colors font-medium ${
                viewMode === "visual"
                  ? "bg-template-pink/20 text-template-pink shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Slide Preview</span>
            </button>
            <button
              onClick={() => setViewMode("outline")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-colors font-medium ${
                viewMode === "outline"
                  ? "bg-template-pink/20 text-template-pink shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Full Outline</span>
            </button>
          </div>

          {/* Copy Carousel Button */}
          <button
            onClick={handleCopyAll}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-template-pink/15 hover:bg-template-pink/25 text-template-pink border border-template-pink/40 text-xs font-bold transition-all active:scale-95"
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Carousel</span>
              </>
            )}
          </button>
        </div>
      </div>

      {viewMode === "visual" ? (
        <div className="space-y-4">
          {/* VISUAL CAROUSEL CARD PREVIEW */}
          {currentSlide ? (
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[360px] rounded-3xl bg-gradient-to-br from-midnight-800 via-midnight-850 to-midnight-950 border-2 border-template-cyan/30 p-6 sm:p-7 flex flex-col justify-between shadow-2xl overflow-hidden group">
              {/* Top Slide Header */}
              <div className="flex items-center justify-between text-xs border-b border-white/[0.08] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-template-cyan animate-pulse" />
                  <span className="font-bold tracking-wider text-slate-300 uppercase text-[10px]">
                    {(currentSlide.type || "SLIDE").replace(/_/g, " ")}
                  </span>
                </div>
                <span className="font-mono font-bold text-template-cyan bg-template-cyan/15 px-3 py-1 rounded-full border border-template-cyan/30 text-xs">
                  Slide {currentSlide.slideNumber || currentSlideIndex + 1} of {slides.length}
                </span>
              </div>

              {/* Slide Body */}
              <div className="space-y-3 my-auto py-2">
                <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight leading-tight">
                  {currentSlide.header || "Key Takeaway"}
                </h3>

                {currentSlide.subHeader && (
                  <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                    {currentSlide.subHeader}
                  </p>
                )}

                {/* Bullets with safe fallback */}
                <div className="space-y-1.5 pt-1">
                  {(currentSlide.bullets || []).map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-template-pink shrink-0 mt-2" />
                      <span className="leading-snug">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Callout */}
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.08] text-xs text-slate-400">
                <span className="font-bold text-template-cyan text-xs">
                  {currentSlide.callout || "SWIPE FOR NEXT ➔"}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">OmniClip Repurposed</span>
              </div>

              {/* Slide navigation buttons */}
              <button
                onClick={prevSlide}
                disabled={currentSlideIndex === 0}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-midnight-950/80 hover:bg-midnight-900 text-white disabled:opacity-20 disabled:cursor-not-allowed border border-white/10 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlideIndex === slides.length - 1}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-midnight-950/80 hover:bg-midnight-900 text-white disabled:opacity-20 disabled:cursor-not-allowed border border-white/10 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400">No slides available for this nugget.</div>
          )}

          {/* Slide Indicator Dots (styled with template's cyan pills) */}
          <div className="flex items-center justify-center gap-2 py-1">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentSlideIndex === idx
                    ? "w-8 bg-template-cyan shadow-sm shadow-template-cyan/50"
                    : "w-2 bg-midnight-800 hover:bg-slate-600"
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Accompanying Post Caption */}
          <div className="p-5 rounded-2xl bg-midnight-950/80 border border-white/10 space-y-2.5 text-xs">
            <span className="font-bold text-slate-200 block uppercase tracking-wider text-[10px]">
              Accompanying LinkedIn Post Copy
            </span>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
              {carousel.caption || ""}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {(carousel.hashtags || []).map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-full bg-midnight-900 text-template-pink font-mono text-[11px] border border-template-pink/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* FULL TEXT OUTLINE VIEW */
        <div className="space-y-4 overflow-y-auto pr-1">
          {slides.map((slide, sIdx) => (
            <div
              key={slide.slideNumber || sIdx}
              className="p-5 rounded-2xl bg-midnight-950/70 border border-white/10 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-template-cyan">
                  SLIDE {slide.slideNumber || sIdx + 1} OF {slides.length} • {slide.type || "INSIGHT"}
                </span>
              </div>
              <h4 className="text-base font-bold text-white">{slide.header || ""}</h4>
              {slide.subHeader && (
                <p className="text-xs text-slate-400 italic">{slide.subHeader}</p>
              )}
              <ul className="space-y-1.5 text-xs text-slate-300 pl-4 list-disc">
                {(slide.bullets || []).map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              {slide.callout && (
                <div className="p-2.5 rounded-xl bg-midnight-900 text-xs font-bold text-template-pink border border-white/10">
                  {slide.callout}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
