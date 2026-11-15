"use client";

import React, { useState, useEffect } from "react";
import { Key, X, Check, ShieldCheck, Sparkles } from "lucide-react";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveKey: (key: string) => void;
  currentKey: string;
}

export function ApiKeyModal({
  isOpen,
  onClose,
  onSaveKey,
  currentKey,
}: ApiKeyModalProps) {
  const [keyInput, setKeyInput] = useState(currentKey);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setKeyInput(currentKey);
  }, [currentKey, isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveKey(keyInput.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setKeyInput("");
    onSaveKey("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md template-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-5">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-midnight-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-template-blue to-template-cyan text-white flex items-center justify-center shadow-lg shadow-template-cyan/20">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Groq API Configuration</h3>
            <p className="text-xs text-slate-400">Used for Groq Llama 3.1 & Whisper transcription</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Groq API Key
            </label>
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="gsk_..."
              className="w-full px-4 py-3 bg-midnight-950/90 rounded-2xl border border-white/10 focus:border-template-cyan focus:ring-1 focus:ring-template-cyan text-sm text-white placeholder:text-slate-600 outline-none font-mono"
            />
          </div>

          <div className="flex items-start gap-2.5 text-xs text-slate-400 bg-midnight-950/60 p-3.5 rounded-2xl border border-white/[0.06]">
            <ShieldCheck className="w-4 h-4 text-template-cyan shrink-0 mt-0.5" />
            <span>
              Your key is saved locally in your browser memory for your session or pulled from{" "}
              <code className="text-template-cyan font-mono">.env.local</code>. It is never stored on external databases.
            </span>
          </div>

          <div className="flex items-center justify-between pt-3">
            {currentKey ? (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-template-pink hover:underline font-bold"
              >
                Clear Key
              </button>
            ) : <span />}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-gradient-pill px-6 py-2.5 text-xs font-bold shadow-md cursor-pointer"
              >
                {savedSuccess ? (
                  <span className="flex items-center gap-1.5 text-emerald-300">
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved!</span>
                  </span>
                ) : (
                  <span>Save Key</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
