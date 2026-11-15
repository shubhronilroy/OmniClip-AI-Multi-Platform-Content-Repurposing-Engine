# 🎬 OmniClip — AI Multi-Platform Content Repurposing Engine (Powered by Groq)

> **Turn any YouTube URL or audio/video upload into high-retention TikTok scripts (with B-roll cues), viral X (Twitter) threads, and 5-slide LinkedIn carousels using Groq's lightning-fast free LLM & Whisper API.**

Built with Next.js 14 App Router, TypeScript, Tailwind CSS, Lucide Icons, and the official `groq-sdk` (`llama-3.3-70b-versatile` & `whisper-large-v3-turbo`).

---

## ✨ Features & Architecture

### 1. Ingestion & Transcription Pipeline
- **YouTube Ingestion:** Paste any YouTube link (`youtube.com/watch?v=...`, `youtu.be/...`, shorts, embeds). Automatically resolves captions with timestamped segments.
- **Audio / Video Upload:** Upload MP4, MP3, M4A, WAV, or WebM files. The backend streams audio directly to Groq's `whisper-large-v3-turbo` model on the free tier with segment-level timestamps at blazing fast speeds.
- **Instant Demo Presets:** Includes 1-click verified datasets (Andrej Karpathy on the LLM OS, Alex Hormozi on the $100M Value Equation) so reviewers can test the complete pipeline instantly.

### 2. AI Intelligence (Groq Llama 3.3 70B Versatile Orchestrator)
- **Top 3 Golden Nuggets Extraction:** Deeply analyzes transcripts to identify the highest-retention, most contrarian, or actionable moments.
- **Hook Retention Scoring:** Calculates a 1–100 Hook Score for each nugget based on psychological curiosity gaps and virality potential.
- **Category Classification:** Classifies nuggets into *Contrarian*, *Actionable Framework*, *Mindset Shift*, *Story/Anecdote*, or *High-Stakes Insight*.

### 3. Tailored Platform Asset Generation
- **9:16 Vertical Video (TikTok / Reels / Shorts):**
  - First 3-second spoken hook with bracketed visual B-roll cues: `[Visual: zoom in on creator's eyes, bold text pop]`
  - Body storyboards with alternating dialogue and camera directions.
  - Outro Call-To-Action with visual cues.
  - Interactive **9:16 Phone Mockup View** or **Raw Script View** + One-click "Copy Script".
- **X (Twitter) Thread:**
  - Numbered tweet sequence (1/5, 2/5, 3/5, 4/5, 5/5) engineered for algorithmic dwell time.
  - Real-time character counter per tweet (with 280-char safety enforcement).
  - Single tweet copy or full thread copy.
- **LinkedIn PDF Carousel:**
  - 5-slide structured deck (Slide 1: Hook Cover, Slides 2-4: Core Framework, Slide 5: CTA Outro).
  - Interactive **Slide-by-Slide Visual Preview** (with next/prev controls) and **Text Outline View**.
  - Accompanying LinkedIn post copy & curated hashtags.

### 4. Real-Time Split-Screen Dashboard
- **Left Pane:** Golden Nuggets leaderboard with badges, clickable timestamps `[02:14]` that highlight segments, and real-time transcript search.
- **Right Pane:** Tabbed multi-platform asset editor and visual preview.
- **Action Bar:** "Schedule / Export" modal that simulates dispatching to Buffer/Hootsuite or downloads a Markdown asset bundle (`.md`), accompanied by celebratory confetti animations.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ (tested on Node 20 & 26)
- npm or pnpm
- Free Groq API Key from [https://console.groq.com/keys](https://console.groq.com/keys)

### 1. Installation
Clone or navigate to the project directory:
```bash
cd omniclip
npm install
```

### 2. Configure Environment Variables
Create or edit your `.env.local` file:
```env
GROQ_API_KEY=gsk_your_groq_api_key_here
```
*(Note: You can also enter or update your Groq API key directly inside the web UI using the "Set API Key" button in the top navigation bar, which saves to browser session storage).*

### 3. Run Development Server
```bash
npm run dev
```
Open your browser at [http://localhost:3000](http://localhost:3000).

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🔑 How to Get a Free Groq API Key

1. Navigate to the **[Groq Console](https://console.groq.com/keys)** and sign up or log in.
2. Click **"Create API Key"**.
3. Name your key (e.g. `omniclip-dev`) and click **"Submit"**.
4. Copy the generated key starting with `gsk_...`.
5. Paste it in `.env.local` as `GROQ_API_KEY=gsk_...` or directly inside the app's **"Set API Key"** modal.
