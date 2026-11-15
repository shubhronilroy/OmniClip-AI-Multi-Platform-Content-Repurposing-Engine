export interface TranscriptSegment {
  id: string;
  start: number; // in seconds
  duration: number; // in seconds
  text: string;
  timestamp: string; // e.g. "01:24"
}

export interface GoldenNugget {
  id: string;
  title: string;
  summary: string;
  startTimestamp: string; // e.g. "01:14"
  endTimestamp: string;   // e.g. "02:45"
  startSeconds: number;
  endSeconds: number;
  hookScore: number;      // e.g. 96 (out of 100)
  viralCategory: 'Contrarian' | 'Actionable Framework' | 'Mindset Shift' | 'Story/Anecdote' | 'High-Stakes Insight';
  whyItGoesViral: string;
}

export interface TikTokSegment {
  dialogue: string;
  bRollCue: string;
}

export interface TikTokScript {
  title: string;
  hook: string;
  hookVisual: string;
  bodySegments: TikTokSegment[];
  cta: string;
  ctaVisual: string;
  estimatedDuration: string;
  audioVibe: string;
  caption: string;
  hashtags: string[];
}

export interface TweetItem {
  tweetNumber: number;
  content: string;
  charCount: number;
  tag?: string;
}

export interface TwitterThread {
  hookTweet: string;
  tweets: TweetItem[];
  hashtags: string[];
}

export interface CarouselSlide {
  slideNumber: number;
  type: 'HOOK_COVER' | 'CORE_INSIGHT' | 'ACTIONABLE_STEP' | 'FRAMEWORK_DIAGRAM' | 'CTA_OUTRO';
  header: string;
  subHeader?: string;
  bullets: string[];
  callout?: string;
  visualLayoutNote?: string;
}

export interface LinkedInCarousel {
  coverTitle: string;
  slides: CarouselSlide[];
  caption: string;
  hashtags: string[];
}

export interface PlatformAssets {
  nuggetId: string;
  tiktok: TikTokScript;
  twitter: TwitterThread;
  linkedin: LinkedInCarousel;
}

export interface ProcessResponse {
  sourceTitle: string;
  sourceDuration: string;
  sourceType: 'youtube' | 'upload' | 'demo';
  sourceUrl?: string;
  videoId?: string;
  authorName?: string;
  transcript: TranscriptSegment[];
  nuggets: GoldenNugget[];
  assetsByNugget: Record<string, PlatformAssets>;
}

export interface ProcessRequest {
  url?: string;
  presetId?: string;
  transcriptText?: string;
}
