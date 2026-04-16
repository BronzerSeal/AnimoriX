import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return new Response("No url", { status: 400 });
  }

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  const buffer = await res.arrayBuffer();

  return new Response(buffer, {
    headers: {
      "Content-Type": res.headers.get("content-type") || "image/jpeg",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
