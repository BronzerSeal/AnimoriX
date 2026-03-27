import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return new Response("No url", { status: 400 });
  }

  const res = await fetch(url, {
    headers: {
      Referer: "https://animekai.to/",
      Origin: "https://animekai.to",
      "User-Agent": "Mozilla/5.0",
    },
  });

  const contentType = res.headers.get("content-type") || "";

  // если это m3u8
  if (contentType.includes("mpegurl")) {
    let text = await res.text();

    const base = new URL(url);

    text = text
      .split("\n")
      .map((line) => {
        // комментарии не трогаем
        if (!line || line.startsWith("#")) return line;

        try {
          const absolute = new URL(line, base).href;

          return `/api/proxy?url=${encodeURIComponent(absolute)}`;
        } catch {
          return line;
        }
      })
      .join("\n");

    return new Response(text, {
      headers: {
        "Content-Type": "application/vnd.apple.mpegurl",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  // сегменты
  return new Response(res.body, {
    headers: {
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*",
    },
  });
}
