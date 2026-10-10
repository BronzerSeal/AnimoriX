import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    // Получаем ID из ?id=61469
    const id = req.nextUrl.searchParams.get("id");

    if (!id || !/^\d+$/.test(id)) {
      return NextResponse.json({ error: "Invalid anime ID" }, { status: 400 });
    }

    if (!url) {
      throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
    }

    const episodes: {
      id: string;
      number: number;
      title: string;
    }[] = [];

    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      const response = await fetch(
        `${url.replace(/\/$/, "")}/anime/${id}/episodes?page=${page}`,
        { next: { revalidate: 3600 } },
      );

      if (!response.ok) {
        throw new Error(`Tenrai API error: ${response.status}`);
      }

      const result = await response.json();

      for (const episode of result.data ?? []) {
        episodes.push({
          id: String(episode.mal_id),
          number: Number(episode.episode ?? episode.mal_id),
          title: episode.title ?? `Episode ${episode.mal_id}`,
        });
      }

      hasNextPage = Boolean(result.pagination?.has_next_page);
      page++;
    }

    return NextResponse.json({ episodes });
  } catch (error) {
    console.error("[Anime Episodes]", error);

    return NextResponse.json(
      { error: "Failed to fetch anime episodes" },
      { status: 502 },
    );
  }
}
