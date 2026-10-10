// /app/api/anime/search/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("[Anime Search] Request received:", req.url);

  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");

    console.log("[Anime Search] Search title:", title);

    if (!title) {
      console.warn("[Anime Search] Missing title parameter");

      return NextResponse.json({ error: "title is required" }, { status: 400 });
    }

    console.log("[Anime Search] Importing @consumet/extensions...");
    const { ANIME } = await import("@consumet/extensions");

    console.log("[Anime Search] Initializing AnimeKai provider...");
    const provider = new ANIME.AnimeKai();

    // Поиск аниме
    console.time("[Anime Search] provider.search");
    console.log("[Anime Search] Searching anime:", title);

    const searchResult = await provider.search(title);

    console.timeEnd("[Anime Search] provider.search");

    console.log(
      "[Anime Search] Search results count:",
      searchResult.results.length,
    );

    if (!searchResult.results.length) {
      console.warn("[Anime Search] No anime found:", title);

      return NextResponse.json({ error: "Anime not found" }, { status: 404 });
    }

    const anime = searchResult.results[0];

    console.log("[Anime Search] First result:", {
      id: anime.id,
      title: anime.title,
      image: anime.image,
      type: anime.type,
    });

    // Получаем список серий
    console.log("[Anime Search] Fetching anime info for ID:", anime.id);

    console.time("[Anime Search] provider.fetchAnimeInfo");

    const info = await provider.fetchAnimeInfo(anime.id);

    console.timeEnd("[Anime Search] provider.fetchAnimeInfo");

    console.log("[Anime Search] Episodes count:", info.episodes?.length ?? 0);

    console.log("[Anime Search] Request completed successfully");

    return NextResponse.json({
      id: anime.id,
      title: anime.title,
      image: anime.image,
      type: anime.type,
      episodes: (info.episodes ?? []).map((ep: any) => ({
        id: ep.id,
        number: ep.number,
        title: ep.title,
      })),
    });
  } catch (err: any) {
    console.error("[Anime Search] Request failed:", err);
    console.error("[Anime Search] Error message:", err?.message);
    console.error("[Anime Search] Error stack:", err?.stack);

    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
