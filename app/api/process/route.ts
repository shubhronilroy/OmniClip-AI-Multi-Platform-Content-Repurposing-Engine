import { NextRequest, NextResponse } from "next/server";
import {
  extractYouTubeVideoId,
  fetchYouTubeTranscript,
  fetchYouTubeVideoMetadata,
} from "@/lib/youtube";
import { extractGoldenNuggetsAndAssets, transcribeAudioWithWhisper } from "@/lib/groq";
import { DEMO_PRESETS } from "@/lib/sample-data";
import { formatSecondsToTime } from "@/lib/utils";
import { ProcessResponse, TranscriptSegment } from "@/types/omniclip";

export const maxDuration = 120; // 2 minutes for AI transcription and generation

export async function POST(req: NextRequest) {
  try {
    const customApiKey = req.headers.get("x-groq-api-key") || undefined;
    const contentType = req.headers.get("content-type") || "";

    // 1. Handle FormData (Audio / Video File Upload)
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;

      if (!file) {
        return NextResponse.json({ error: "No file was uploaded." }, { status: 400 });
      }

      const fileName = file.name || "uploaded-audio.mp3";
      console.log(`[API /process] Received file upload: ${fileName} (${file.size} bytes)`);

      // Check for Groq API Key
      const effectiveKey = customApiKey || process.env.GROQ_API_KEY;
      if (!effectiveKey) {
        return NextResponse.json(
          {
            error: "Groq API Key is required for speech transcription with Whisper. Please configure GROQ_API_KEY in .env.local or enter your free Groq key in the header.",
            needsApiKey: true,
          },
          { status: 401 }
        );
      }

      // Step 1: Transcribe with Groq Whisper
      const transcript = await transcribeAudioWithWhisper(file, fileName, effectiveKey);

      if (!transcript || transcript.length === 0) {
        return NextResponse.json({ error: "Whisper could not detect speech in the uploaded file." }, { status: 422 });
      }

      const totalDurationSec = transcript[transcript.length - 1].start + transcript[transcript.length - 1].duration;
      const formattedDuration = formatSecondsToTime(totalDurationSec);
      const cleanTitle = fileName.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");

      // Step 2: Extract Golden Nuggets & Generate Platform Assets via Groq Llama 3.3
      const { nuggets, assetsByNugget } = await extractGoldenNuggetsAndAssets(
        transcript,
        cleanTitle,
        effectiveKey
      );

      const responsePayload: ProcessResponse = {
        sourceTitle: cleanTitle,
        sourceDuration: formattedDuration,
        sourceType: "upload",
        transcript,
        nuggets,
        assetsByNugget,
      };

      return NextResponse.json(responsePayload);
    }

    // 2. Handle JSON Request (YouTube URL, Demo Presets, or Direct Text)
    const body = await req.json().catch(() => ({}));
    const { url, presetId, transcriptText } = body;

    // A. Demo Preset Fast Path
    if (presetId && DEMO_PRESETS[presetId]) {
      console.log(`[API /process] Loading demo preset: ${presetId}`);
      await new Promise((resolve) => setTimeout(resolve, 800));
      return NextResponse.json(DEMO_PRESETS[presetId]);
    }

    // B. Direct YouTube URL Ingestion
    if (url) {
      const videoId = extractYouTubeVideoId(url);
      if (!videoId) {
        return NextResponse.json(
          { error: "Invalid YouTube URL format. Please paste a valid YouTube watch link or video ID." },
          { status: 400 }
        );
      }

      console.log(`[API /process] Processing YouTube URL: ${url} (Video ID: ${videoId})`);

      let transcript: TranscriptSegment[] = [];
      try {
        transcript = await fetchYouTubeTranscript(videoId);
      } catch (transcriptError: any) {
        console.warn(`[API /process] Transcript fetch failed:`, transcriptError.message);
        return NextResponse.json(
          {
            error: transcriptError.message || `Could not fetch captions for this YouTube video. Try one of our verified demo clips or upload the audio directly!`,
            canFallbackToDemo: true,
          },
          { status: 422 }
        );
      }

      if (!transcript || transcript.length === 0) {
        return NextResponse.json(
          { error: "The video transcript was empty or unavailable." },
          { status: 422 }
        );
      }

      const totalDurationSec = transcript[transcript.length - 1].start + transcript[transcript.length - 1].duration;
      const formattedDuration = formatSecondsToTime(totalDurationSec);

      // Fetch dynamic video metadata (title, author, thumbnail) via public oEmbed
      console.log(`[API /process] Fetching oEmbed metadata for: ${url}`);
      const videoMeta = await fetchYouTubeVideoMetadata(url);
      const videoTitle = videoMeta.title || `YouTube Video (${videoId})`;
      console.log(`[API /process] Resolved title: "${videoTitle}"`);

      // Check Groq API Key for LLM step
      const effectiveKey = customApiKey || process.env.GROQ_API_KEY;
      if (!effectiveKey) {
        return NextResponse.json(
          {
            error: "Groq API Key is missing. Enter your free key in the top bar to process custom videos with Llama 3.3, or explore the pre-loaded demo presets!",
            needsApiKey: true,
          },
          { status: 401 }
        );
      }

      // Step 2: Extract Golden Nuggets & Generate Platform Assets via Groq
      const { nuggets, assetsByNugget } = await extractGoldenNuggetsAndAssets(
        transcript,
        videoTitle,
        effectiveKey
      );

      const responsePayload: ProcessResponse = {
        sourceTitle: videoTitle,
        sourceDuration: formattedDuration,
        sourceType: "youtube",
        sourceUrl: url,
        videoId,
        authorName: videoMeta.authorName,
        transcript,
        nuggets,
        assetsByNugget,
      };

      return NextResponse.json(responsePayload);
    }

    // C. Direct Raw Transcript Text
    if (transcriptText && transcriptText.trim().length > 50) {
      const effectiveKey = customApiKey || process.env.GROQ_API_KEY;
      if (!effectiveKey) {
        return NextResponse.json({ error: "Groq API Key is required.", needsApiKey: true }, { status: 401 });
      }

      const words = transcriptText.trim().split(/\s+/);
      const segments: TranscriptSegment[] = [];
      let currentWords: string[] = [];
      let segIndex = 1;
      let currentTime = 0;

      for (let i = 0; i < words.length; i++) {
        currentWords.push(words[i]);
        if (currentWords.length >= 35 || i === words.length - 1) {
          const segText = currentWords.join(" ");
          segments.push({
            id: `seg-${segIndex++}`,
            start: currentTime,
            duration: 15,
            timestamp: formatSecondsToTime(currentTime),
            text: segText,
          });
          currentTime += 15;
          currentWords = [];
        }
      }

      const { nuggets, assetsByNugget } = await extractGoldenNuggetsAndAssets(
        segments,
        "Custom Script / Transcript",
        effectiveKey
      );

      const responsePayload: ProcessResponse = {
        sourceTitle: "Custom Transcript",
        sourceDuration: formatSecondsToTime(currentTime),
        sourceType: "upload",
        transcript: segments,
        nuggets,
        assetsByNugget,
      };

      return NextResponse.json(responsePayload);
    }

    return NextResponse.json(
      { error: "Please provide a YouTube URL, an uploaded audio/video file, or select a demo preset." },
      { status: 400 }
    );
  } catch (err: any) {
    console.error("[API /process Error]", err);
    return NextResponse.json(
      {
        error: err.message || "An unexpected error occurred while processing content with Groq.",
      },
      { status: 500 }
    );
  }
}
