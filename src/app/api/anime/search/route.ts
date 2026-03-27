// /app/api/anime/search/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");

    if (!title) {
      return NextResponse.json({ error: "title is required" }, { status: 400 });
    }

    const { ANIME } = await import("@consumet/extensions");
    const provider = new ANIME.AnimeKai();

    // Поиск аниме
    const searchResult = await provider.search(title);
    if (!searchResult.results.length) {
      return NextResponse.json({ error: "Anime not found" }, { status: 404 });
    }

    const anime = searchResult.results[0];

    // Получаем список серий
    const info = await provider.fetchAnimeInfo(anime.id);

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
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
