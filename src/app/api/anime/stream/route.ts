// /app/api/anime/stream/route.ts

//v2
import { ANIME } from "@consumet/extensions";
import { NextRequest, NextResponse } from "next/server";

const providers = [
  { name: "AnimeKai", instance: () => new ANIME.AnimeKai() },
  { name: "Hianime", instance: () => new ANIME.Hianime() },
  { name: "AnimePahe", instance: () => new ANIME.AnimePahe() },
];

type DiagnosticStep = {
  step: string;
  ok: boolean;
  details?: Record<string, unknown>;
};

function truncateValue(value: unknown, maxLength = 300) {
  if (value == null) return value;

  const text =
    typeof value === "string" ? value : (JSON.stringify(value, null, 2) ?? "");

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength)}...`;
}

function getErrorDetails(error: unknown) {
  const err = error as any;

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

    let episode: any = null;
    let usedProvider: string | null = null;

    // 🔥 ПРОБУЕМ ВСЕ ПРОВАЙДЕРЫ
    for (const p of providers) {
      try {
        const instance = p.instance();

        steps.push({
          step: `provider_initialized_${p.name}`,
          ok: true,
        });

        const res = await instance.fetchEpisodeSources(episodeId);

        if (res?.sources?.length) {
          episode = res;
          usedProvider = p.name;

          steps.push({
            step: `fetch_episode_sources_${p.name}`,
            ok: true,
            details: {
              sourceCount: res.sources.length,
              download: res.download ?? null,
            },
          });

          break; // нашли — выходим
        } else {
          steps.push({
            step: `fetch_episode_sources_${p.name}`,
            ok: false,
            details: { message: "No sources returned" },
          });
        }
      } catch (error) {
        const errorDetails = getErrorDetails(error);

        steps.push({
          step: `fetch_episode_sources_${p.name}`,
          ok: false,
          details: errorDetails,
        });

        logStreamEvent(
          `fetch_episode_sources_failed_${p.name}`,
          episodeId,
          errorDetails,
        );
      }
    }

    // ❌ если вообще ничего не нашли
    if (!episode || !episode.sources?.length) {
      logStreamEvent("no_video_sources_all_providers_failed", episodeId);

      return NextResponse.json(
        {
          error: "No video sources found (all providers failed)",
          diagnostics: steps,
        },
        { status: 404 },
      );
    }

    const video = episode.sources.find((s: any) => s.url);

    if (!video) {
      logStreamEvent("no_available_video_source", episodeId, {
        provider: usedProvider,
        sourceCount: episode.sources.length,
      });

      return NextResponse.json(
        {
          error: "No available video sources",
          provider: usedProvider,
          diagnostics: steps,
        },
        { status: 404 },
      );
    }

    logStreamEvent("request_succeeded", episodeId, {
      provider: usedProvider,
      quality: video.quality ?? null,
      urlPreview: truncateValue(video.url, 180),
    });

    return NextResponse.json({
      episodeId,
      quality: video.quality,
      url: video.url,
      provider: usedProvider,
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

//v3 -- для возможного улучшения, передаем название и ищем id серии по нему, так как некоторые провайдеры (например Hianime) не поддерживают прямой поиск серии по id, а только через поиск по названию и выбор серии из результатов
// import { ANIME } from "@consumet/extensions";
// import { NextRequest, NextResponse } from "next/server";

// const providers = [
//   { name: "AnimeKai", instance: () => new ANIME.AnimeKai() },
//   { name: "Hianime", instance: () => new ANIME.Hianime() },
//   { name: "AnimePahe", instance: () => new ANIME.AnimePahe() },
// ];

// type DiagnosticStep = {
//   step: string;
//   ok: boolean;
//   details?: Record<string, unknown>;
// };

// function truncateValue(value: unknown, maxLength = 300) {
//   if (value == null) return value;

//   const text =
//     typeof value === "string" ? value : (JSON.stringify(value, null, 2) ?? "");

//   return text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`;
// }

// function getErrorDetails(error: unknown) {
//   const err = error as any;

//   return {
//     name: err?.name ?? "UnknownError",
//     message: err?.message ?? "Unknown error",
//     responseStatus: err?.response?.status ?? null,
//     responsePreview: truncateValue(err?.response?.data),
//   };
// }

// function logStreamEvent(
//   event: string,
//   episodeId: string,
//   details?: Record<string, unknown>,
// ) {
//   console.info("[anime-stream]", {
//     event,
//     episodeId,
//     ...details,
//   });
// }

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);

//   const episodeId = searchParams.get("episodeId");
//   const title = searchParams.get("title");

//   const diagnosticsEnabled =
//     searchParams.get("diagnostics") === "1" ||
//     searchParams.get("debug") === "1";

//   if (!episodeId) {
//     return NextResponse.json(
//       { error: "episodeId is required" },
//       { status: 400 },
//     );
//   }

//   if (!title) {
//     return NextResponse.json(
//       { error: "title is required for provider resolving" },
//       { status: 400 },
//     );
//   }

//   const steps: DiagnosticStep[] = [];

//   try {
//     logStreamEvent("request_started", episodeId, { title });

//     let episode: any = null;
//     let usedProvider: string | null = null;

//     // 🔥 ПРОБЕГАЕМСЯ ПО ПРОВАЙДЕРАМ
//     for (const p of providers) {
//       try {
//         const provider = p.instance();

//         steps.push({
//           step: `provider_init_${p.name}`,
//           ok: true,
//         });

//         let resolvedEpisodeId = episodeId;

//         // ✅ Для НЕ AnimeKai — ищем через search
//         if (p.name !== "AnimeKai") {
//           const searchResults = await provider.search(title);

//           steps.push({
//             step: `search_${p.name}`,
//             ok: true,
//             details: {
//               results: searchResults?.results?.length ?? 0,
//             },
//           });

//           const anime = searchResults?.results?.[0];
//           if (!anime?.id) {
//             throw new Error(`No anime found for ${p.name}`);
//           }

//           // получаем список эпизодов
//           const animeInfo = await provider.fetchAnimeInfo(anime.id);

//           const episodeMatch = animeInfo?.episodes?.find(
//             (ep: any) => ep.id.includes(episodeId) || ep.number === episodeId,
//           );

//           if (!episodeMatch?.id) {
//             throw new Error(`Episode not found in ${p.name}`);
//           }

//           resolvedEpisodeId = episodeMatch.id;

//           steps.push({
//             step: `resolve_episode_${p.name}`,
//             ok: true,
//             details: {
//               resolvedEpisodeId,
//             },
//           });
//         }

//         // 🎬 получаем стрим
//         const res = await provider.fetchEpisodeSources(resolvedEpisodeId);

//         if (res?.sources?.length) {
//           episode = res;
//           usedProvider = p.name;

//           steps.push({
//             step: `fetch_sources_${p.name}`,
//             ok: true,
//             details: {
//               sourceCount: res.sources.length,
//             },
//           });

//           break;
//         } else {
//           throw new Error("No sources");
//         }
//       } catch (error) {
//         const errorDetails = getErrorDetails(error);

//         steps.push({
//           step: `provider_failed_${p.name}`,
//           ok: false,
//           details: errorDetails,
//         });

//         logStreamEvent(`provider_failed_${p.name}`, episodeId, errorDetails);
//       }
//     }

//     // ❌ ничего не нашли
//     if (!episode || !episode.sources?.length) {
//       return NextResponse.json(
//         {
//           error: "No video sources found across providers",
//           diagnostics: steps,
//         },
//         { status: 404 },
//       );
//     }

//     const video = episode.sources.find((s: any) => s.url);

//     if (!video) {
//       return NextResponse.json(
//         {
//           error: "No playable source found",
//           provider: usedProvider,
//           diagnostics: steps,
//         },
//         { status: 404 },
//       );
//     }

//     logStreamEvent("success", episodeId, {
//       provider: usedProvider,
//       quality: video.quality,
//     });

//     return NextResponse.json({
//       episodeId,
//       provider: usedProvider,
//       quality: video.quality,
//       url: video.url,
//       diagnostics: diagnosticsEnabled ? steps : undefined,
//     });
//   } catch (error) {
//     const errorDetails = getErrorDetails(error);

//     logStreamEvent("unexpected_failure", episodeId, errorDetails);

//     return NextResponse.json(
//       {
//         error: errorDetails.message || "Failed to fetch episode",
//         diagnostics: steps,
//       },
//       { status: 500 },
//     );
//   }
// }
