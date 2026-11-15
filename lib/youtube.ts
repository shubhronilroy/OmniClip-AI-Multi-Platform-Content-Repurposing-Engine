import { TranscriptSegment } from "@/types/omniclip";
import { formatSecondsToTime } from "./utils";

export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  const cleanUrl = url.trim();

  // If it's already an 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) {
    return cleanUrl;
  }

  const patterns = [
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([\w-]{11})/,
    /^[a-zA-Z0-9_-]{11}$/
  ];

  for (const pattern of patterns) {
    const match = cleanUrl.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  try {
    const parsed = new URL(cleanUrl);
    const v = parsed.searchParams.get("v");
    if (v && v.length === 11) return v;
  } catch {
    // not a valid URL
  }

  return null;
}

export async function fetchYouTubeTranscript(videoId: string): Promise<TranscriptSegment[]> {
  try {
    // Try dynamic import of youtube-transcript
    const { YoutubeTranscript } = await import("youtube-transcript");
    const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId);

    if (transcriptItems && transcriptItems.length > 0) {
      return transcriptItems.map((item, index) => {
        const startSec = Math.floor(item.offset / 1000);
        const durationSec = Math.floor(item.duration / 1000);
        return {
          id: `seg-${index + 1}`,
          start: startSec,
          duration: durationSec,
          timestamp: formatSecondsToTime(startSec),
          text: decodeHTMLEntities(item.text),
        };
      });
    }
  } catch (err: any) {
    console.warn(`[YouTube Transcript] Primary fetcher failed for ${videoId}:`, err.message || err);
  }

  // Fallback 1: Direct timedtext API check
  try {
    const videoPageRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    const html = await videoPageRes.text();
    const captionTracksRegex = /"captionTracks":\s*(\[.*?\])/;
    const match = html.match(captionTracksRegex);

    if (match && match[1]) {
      const captionTracks = JSON.parse(match[1]);
      if (captionTracks && captionTracks.length > 0) {
        // Find English or first available track
        const track = captionTracks.find((t: any) => t.languageCode === "en") || captionTracks[0];
        if (track && track.baseUrl) {
          const transcriptRes = await fetch(track.baseUrl);
          const xml = await transcriptRes.text();
          const segments = parseXmlTranscript(xml);
          if (segments.length > 0) return segments;
        }
      }
    }
  } catch (err: any) {
    console.warn(`[YouTube Transcript] Timedtext fallback failed for ${videoId}:`, err.message || err);
  }

  throw new Error(`Could not fetch captions for YouTube video ID "${videoId}". The video might have disabled closed captions or be region-restricted.`);
}

function decodeHTMLEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&#32;/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\n+/g, " ")
    .trim();
}

function parseXmlTranscript(xml: string): TranscriptSegment[] {
  const segments: TranscriptSegment[] = [];
  const textNodeRegex = /<text\s+start="([\d.]+)"\s+dur="([\d.]+)"[^>]*>([\s\S]*?)<\/text>/g;
  let match: RegExpExecArray | null;
  let index = 1;

  while ((match = textNodeRegex.exec(xml)) !== null) {
    const startSec = Math.floor(parseFloat(match[1]));
    const durationSec = Math.floor(parseFloat(match[2]));
    const rawText = match[3] || "";
    const cleanText = decodeHTMLEntities(rawText);

    if (cleanText) {
      segments.push({
        id: `seg-${index++}`,
        start: startSec,
        duration: durationSec,
        timestamp: formatSecondsToTime(startSec),
        text: cleanText,
      });
    }
  }

  return segments;
}

export interface YouTubeVideoMetadata {
  title: string;
  authorName?: string;
  thumbnailUrl?: string;
  videoId: string;
}

/**
 * Fetches video metadata using YouTube's public oEmbed endpoint
 * (https://www.youtube.com/oembed?url=<YOUTUBE_URL>&format=json) — no API key required.
 * Falls back to HTML title scraping or graceful fallback if oEmbed fails or times out.
 */
export async function fetchYouTubeVideoMetadata(
  urlOrVideoId: string
): Promise<YouTubeVideoMetadata> {
  const videoId = extractYouTubeVideoId(urlOrVideoId) || (urlOrVideoId.length === 11 ? urlOrVideoId : "");
  const fallbackTitle = videoId ? `YouTube Video (${videoId})` : "YouTube Video";

  const defaultResult: YouTubeVideoMetadata = {
    title: fallbackTitle,
    videoId: videoId || "",
  };

  if (!urlOrVideoId && !videoId) return defaultResult;

  const standardUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : urlOrVideoId;

  // 1. YouTube Public oEmbed Endpoint (Free, no API key needed)
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(standardUrl)}&format=json`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(oembedUrl, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.title === "string" && data.title.trim().length > 0) {
        const decodedTitle = decodeHTMLEntities(data.title.trim());
        return {
          title: decodedTitle,
          authorName: data.author_name ? decodeHTMLEntities(data.author_name.trim()) : undefined,
          thumbnailUrl: data.thumbnail_url || (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : undefined),
          videoId: videoId || "",
        };
      }
    }
  } catch (err: any) {
    console.warn(`[YouTube oEmbed] Failed to fetch metadata for ${urlOrVideoId}:`, err?.message || err);
  }

  // 2. Fallback: Scrape HTML <title> or <meta property="og:title">
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const pageRes = await fetch(standardUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    clearTimeout(timeoutId);

    if (pageRes.ok) {
      const html = await pageRes.text();
      const ogTitleMatch =
        html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i) ||
        html.match(/<meta\s+content="([^"]+)"\s+property="og:title"/i);
      const titleTagMatch = html.match(/<title>([^<]+)<\/title>/);

      const raw = ogTitleMatch ? ogTitleMatch[1] : titleTagMatch ? titleTagMatch[1] : null;
      if (raw) {
        const cleaned = decodeHTMLEntities(raw)
          .replace(/\s*-\s*YouTube\s*$/, "")
          .trim();
        if (cleaned && cleaned.toLowerCase() !== "youtube") {
          return {
            title: cleaned,
            videoId: videoId || "",
            thumbnailUrl: videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : undefined,
          };
        }
      }
    }
  } catch (err: any) {
    console.warn(`[YouTube Scraper] Failed to scrape title for ${urlOrVideoId}:`, err?.message || err);
  }

  return defaultResult;
}

export async function fetchYouTubeVideoTitle(urlOrVideoId: string): Promise<string> {
  const meta = await fetchYouTubeVideoMetadata(urlOrVideoId);
  return meta.title;
}
