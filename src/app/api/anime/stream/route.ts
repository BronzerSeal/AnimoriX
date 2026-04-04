// /app/api/anime/stream/route.ts
import { NextRequest, NextResponse } from "next/server";

type DiagnosticStep = {
  step: string;
  ok: boolean;
  details?: Record<string, unknown>;
};

function truncateValue(value: unknown, maxLength = 300) {
  if (value == null) return value;

  const text =
    typeof value === "string" ? value : JSON.stringify(value, null, 2) ?? "";

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength)}...`;
}

function getErrorDetails(error: unknown) {
  const err = error as {
    name?: string;
    message?: string;
    code?: string;
    config?: { url?: string; method?: string };
    response?: {
      status?: number;
      statusText?: string;
      data?: unknown;
      config?: { url?: string; method?: string };
      request?: { res?: { responseUrl?: string } };
    };
  };

  return {
    name: err?.name ?? "UnknownError",
    message: err?.message ?? "Unknown error",
    code: err?.code ?? null,
    requestUrl: err?.config?.url ?? err?.response?.config?.url ?? null,
    requestMethod: err?.config?.method ?? err?.response?.config?.method ?? null,
    responseStatus: err?.response?.status ?? null,
    responseStatusText: err?.response?.statusText ?? null,
    responseUrl: err?.response?.request?.res?.responseUrl ?? null,
    responsePreview: truncateValue(err?.response?.data),
  };
}

function logStreamEvent(
  event: string,
  episodeId: string,
  details?: Record<string, unknown>,
) {
  console.info("[anime-stream]", {
    event,
    episodeId,
    ...details,
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const episodeId = searchParams.get("episodeId");
  const diagnosticsEnabled =
    searchParams.get("diagnostics") === "1" ||
    searchParams.get("debug") === "1";

  if (!episodeId) {
    return NextResponse.json(
      { error: "episodeId is required" },
      { status: 400 },
    );
  }

  const steps: DiagnosticStep[] = [];

  try {
    logStreamEvent("request_started", episodeId, {
      diagnosticsEnabled,
    });

    const { ANIME } = await import("@consumet/extensions");
    const provider = new ANIME.AnimeKai();

    steps.push({
      step: "provider_initialized",
      ok: true,
      details: { provider: "AnimeKai" },
    });

    let episode;

    try {
      episode = await provider.fetchEpisodeSources(episodeId);

      steps.push({
        step: "fetch_episode_sources",
        ok: true,
        details: {
          sourceCount: episode.sources?.length ?? 0,
          download: episode.download ?? null,
          headers: episode.headers ?? null,
        },
      });
    } catch (error) {
      const errorDetails = getErrorDetails(error);

      steps.push({
        step: "fetch_episode_sources",
        ok: false,
        details: errorDetails,
      });

      logStreamEvent("fetch_episode_sources_failed", episodeId, errorDetails);

      if (diagnosticsEnabled) {
        try {
          const servers = await provider.fetchEpisodeServers(episodeId);
          const firstServer = servers[0] ?? null;

          steps.push({
            step: "fetch_episode_servers",
            ok: true,
            details: {
              serverCount: servers.length,
              firstServerName: firstServer?.name ?? null,
              firstServerUrl: firstServer?.url ?? null,
            },
          });

          if (firstServer?.url) {
            try {
              const directSources = await provider.fetchEpisodeSources(
                firstServer.url,
              );

              steps.push({
                step: "fetch_sources_from_server_url",
                ok: true,
                details: {
                  sourceCount: directSources.sources?.length ?? 0,
                  download: directSources.download ?? null,
                  requestUrl: firstServer.url,
                },
              });
            } catch (directError) {
              const directErrorDetails = getErrorDetails(directError);

              steps.push({
                step: "fetch_sources_from_server_url",
                ok: false,
                details: {
                  ...directErrorDetails,
                  requestUrl: firstServer.url,
                },
              });

              logStreamEvent(
                "fetch_sources_from_server_url_failed",
                episodeId,
                {
                  ...directErrorDetails,
                  requestUrl: firstServer.url,
                },
              );
            }
          }
        } catch (serversError) {
          const serversErrorDetails = getErrorDetails(serversError);

          steps.push({
            step: "fetch_episode_servers",
            ok: false,
            details: serversErrorDetails,
          });

          logStreamEvent(
            "fetch_episode_servers_failed",
            episodeId,
            serversErrorDetails,
          );
        }
      }

      return NextResponse.json(
        {
          error: errorDetails.message || "Failed to fetch episode",
          diagnostics: steps,
        },
        { status: 500 },
      );
    }

    if (!episode.sources || !episode.sources.length) {
      logStreamEvent("no_video_sources", episodeId);

      return NextResponse.json(
        { error: "No video sources found", diagnostics: steps },
        { status: 404 },
      );
    }

    const video = episode.sources.find((s) => s.url);
    if (!video) {
      logStreamEvent("no_available_video_source", episodeId, {
        sourceCount: episode.sources.length,
      });

      return NextResponse.json(
        { error: "No available video sources", diagnostics: steps },
        { status: 404 },
      );
    }

    logStreamEvent("request_succeeded", episodeId, {
      quality: video.quality ?? null,
      urlPreview: truncateValue(video.url, 180),
    });

    return NextResponse.json({
      episodeId,
      quality: video.quality,
      url: video.url,
      diagnostics: diagnosticsEnabled ? steps : undefined,
    });
  } catch (error) {
    const errorDetails = getErrorDetails(error);

    logStreamEvent("unexpected_failure", episodeId, errorDetails);

    return NextResponse.json(
      {
        error: errorDetails.message || "Failed to fetch episode",
        diagnostics: steps,
      },
      { status: 500 },
    );
  }
}
