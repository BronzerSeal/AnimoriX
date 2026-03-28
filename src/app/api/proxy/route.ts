import { NextRequest } from "next/server";

function truncateValue(value: string, maxLength = 200) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength)}...`;
}

function rewritePlaylistLine(line: string, base: URL) {
  if (!line) return line;

  if (!line.startsWith("#")) {
    try {
      const absolute = new URL(line, base).href;

      return `/api/proxy?url=${encodeURIComponent(absolute)}`;
    } catch {
      return line;
    }
  }

  if (line.startsWith("#EXT-X-KEY") || line.startsWith("#EXT-X-MAP")) {
    return line.replace(/URI="([^"]+)"/, (_, uri: string) => {
      try {
        const absolute = new URL(uri, base).href;
        return `URI="/api/proxy?url=${encodeURIComponent(absolute)}"`;
      } catch {
        return `URI="${uri}"`;
      }
    });
  }

  return line;
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return new Response("No url", { status: 400 });
  }

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      Referer: "https://anikai.to/",
      Origin: "https://anikai.to",
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      Connection: "keep-alive",
    },
  });

  const contentType = res.headers.get("content-type") || "";

  console.info("[anime-proxy]", {
    url: truncateValue(url),
    status: res.status,
    ok: res.ok,
    contentType,
  });

  if (!res.ok) {
    const text = await res.text();

    console.error("[anime-proxy] upstream_failed", {
      url: truncateValue(url),
      status: res.status,
      contentType,
      responsePreview: truncateValue(text, 300),
    });

    return new Response(text, { status: res.status });
  }

  if (contentType.includes("mpegurl")) {
    let text = await res.text();

    const base = new URL(url);

    text = text
      .split("\n")
      .map((line) => rewritePlaylistLine(line, base))
      .join("\n");

    return new Response(text, {
      headers: {
        "Content-Type": "application/vnd.apple.mpegurl",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  return new Response(res.body, {
    status: res.status,
    headers: {
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*",
    },
  });
}
