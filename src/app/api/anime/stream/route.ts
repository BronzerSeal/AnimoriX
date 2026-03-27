// /app/api/anime/stream/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const episodeId = searchParams.get("episodeId");

    if (!episodeId) {
      return NextResponse.json(
        { error: "episodeId is required" },
        { status: 400 },
      );
    }

    const { ANIME } = await import("@consumet/extensions");
    const provider = new ANIME.AnimeKai();

    // Получаем видео источники
    const episode = await provider.fetchEpisodeSources(episodeId);

    if (!episode.sources || !episode.sources.length) {
      return NextResponse.json(
        { error: "No video sources found" },
        { status: 404 },
      );
    }

    // Берём первый поток (обычно m3u8)
    const video = episode.sources.find((s) => s.url);
    if (!video) {
      return NextResponse.json(
        { error: "No available video sources" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      episodeId,
      quality: video.quality,
      url: video.url,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch episode" },
      { status: 500 },
    );
  }
}
