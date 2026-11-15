import { NextRequest, NextResponse } from "next/server";
import { fetchYouTubeVideoMetadata, extractYouTubeVideoId } from "@/lib/youtube";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing 'url' query parameter" }, { status: 400 });
  }

  const videoId = extractYouTubeVideoId(url) || (url.length === 11 ? url : "");
  if (!videoId) {
    return NextResponse.json({ error: "Invalid YouTube URL or ID" }, { status: 400 });
  }

  try {
    const meta = await fetchYouTubeVideoMetadata(url);
    return NextResponse.json(meta);
  } catch (err: any) {
    console.error("[API /metadata] Failed to fetch metadata:", err);
    return NextResponse.json({
      title: `YouTube Video (${videoId})`,
      videoId,
      error: err?.message || "Failed to fetch metadata",
    });
  }
}
