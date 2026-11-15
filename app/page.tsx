"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { HeroInput } from "@/components/HeroInput";
import { Dashboard } from "@/components/Dashboard";
import { ApiKeyModal } from "@/components/ApiKeyModal";
import { ProcessResponse } from "@/types/omniclip";

export default function Home() {
  const [data, setData] = useState<ProcessResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>("");
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  // Load saved API key from localStorage on mount
  useEffect(() => {
    try {
      const savedKey = localStorage.getItem("omniclip_groq_key") || localStorage.getItem("omniclip_Groq_key");
      if (savedKey) {
        setApiKey(savedKey);
      }
    } catch {
      // localStorage not accessible
    }
  }, []);

  const handleSaveApiKey = (newKey: string) => {
    setApiKey(newKey);
    try {
      if (newKey) {
        localStorage.setItem("omniclip_groq_key", newKey);
      } else {
        localStorage.removeItem("omniclip_groq_key");
        localStorage.removeItem("omniclip_Groq_key");
      }
    } catch {
      // localStorage not accessible
    }
  };

  // Helper to run sequential loading messages
  const runProgressSteps = (isUpload: boolean = false) => {
    const steps = isUpload
      ? [
          "Uploading and streaming audio to Groq Whisper API...",
          "Groq Whisper transcribing timestamped speech...",
          "Analyzing transcript with Groq Llama 3.1...",
          "Extracting Top 3 Golden Nuggets & Hook Scores...",
          "Generating TikTok scripts with B-roll cues...",
          "Formatting X threads and LinkedIn carousels...",
        ]
      : [
          "Resolving YouTube video and checking subtitles...",
          "Ingesting timestamped transcript segments...",
          "Analyzing transcript with Groq Llama 3.1 orchestrator...",
          "Mining Top 3 Golden Nuggets & hook retention scores...",
          "Crafting 9:16 vertical video scripts with visual cues...",
          "Generating numbered X threads and 5-slide LinkedIn carousels...",
        ];

    let currentStep = 0;
    setLoadingStep(steps[0]);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setLoadingStep(steps[currentStep]);
      } else {
        clearInterval(interval);
      }
    }, 2800);

    return () => clearInterval(interval);
  };

  const handleProcessUrl = async (url: string) => {
    setIsLoading(true);
    setError(null);
    const stopSteps = runProgressSteps(false);

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (apiKey) {
        headers["x-groq-api-key"] = apiKey;
      }

      const res = await fetch("/api/process", {
        method: "POST",
        headers,
        body: JSON.stringify({ url }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || `Server responded with status ${res.status}`);
      }

      setData(json);
    } catch (err: any) {
      console.error("[Process URL Error]", err);
      setError(err.message || "Failed to process YouTube URL.");
    } finally {
      stopSteps();
      setIsLoading(false);
      setLoadingStep("");
    }
  };

  const handleProcessFile = async (file: File) => {
    setIsLoading(true);
    setError(null);
    const stopSteps = runProgressSteps(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const headers: Record<string, string> = {};
      if (apiKey) {
        headers["x-groq-api-key"] = apiKey;
      }

      const res = await fetch("/api/process", {
        method: "POST",
        headers,
        body: formData,
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || `Server responded with status ${res.status}`);
      }

      setData(json);
    } catch (err: any) {
      console.error("[Process File Error]", err);
      setError(err.message || "Failed to process file.");
    } finally {
      stopSteps();
      setIsLoading(false);
      setLoadingStep("");
    }
  };

  const handleLoadPreset = async (presetId: string) => {
    setIsLoading(true);
    setError(null);
    setLoadingStep("Loading instant demo dataset & assets...");

    try {
      const res = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ presetId }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to load preset.");
      }

      setData(json);
    } catch (err: any) {
      setError(err.message || "Failed to load preset data.");
    } finally {
      setIsLoading(false);
      setLoadingStep("");
    }
  };

  const handleReset = () => {
    setData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-100 relative z-10">
      {/* Navigation Header */}
      <Header
        hasResults={!!data}
        onReset={handleReset}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasCustomKey={!!apiKey}
      />

      {/* Main View Area */}
      <main className="flex-1 flex flex-col justify-center">
        {!data ? (
          <HeroInput
            onProcessUrl={handleProcessUrl}
            onProcessFile={handleProcessFile}
            onLoadPreset={handleLoadPreset}
            isLoading={isLoading}
            loadingStep={loadingStep}
            error={error}
            onClearError={() => setError(null)}
            onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
          />
        ) : (
          <Dashboard
            data={data}
            onReset={handleReset}
            onUpdateTitle={(newTitle) =>
              setData((prev) => (prev ? { ...prev, sourceTitle: newTitle } : null))
            }
          />
        )}
      </main>

      {/* Footer matching template's dark aesthetic */}
      <footer className="w-full border-t border-white/[0.06] bg-midnight-950/60 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-template-cyan">OmniClip</span>
            <span>•</span>
            <span>AI Multi-Platform Repurposing Engine</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Docs</span>
            <span className="text-slate-600">© 2026 OmniClip</span>
          </div>
        </div>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSaveKey={handleSaveApiKey}
        currentKey={apiKey}
      />
    </div>
  );
}
