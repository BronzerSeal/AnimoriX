import { ANIME } from "@consumet/extensions";
import { NextRequest, NextResponse } from "next/server";

const providers = [
  { name: "Hianime", instance: () => new ANIME.Hianime() },
  { name: "AnimeKai", instance: () => new ANIME.AnimeKai() },
  { name: "AnimePahe", instance: () => new ANIME.AnimePahe() },
];

type DiagnosticStep = {
  step: string;
  ok: boolean;
  details?: Record<string, unknown>;
};

type SearchResult = {
  id?: string;
  title?: string;
  japaneseTitle?: string;
  type?: string;
};

type EpisodeResult = {
  id?: string;
  number?: number | string;
  title?: string;
};

function truncateValue(value: unknown, maxLength = 300) {
  if (value == null) return value;

  const text =
    typeof value === "string" ? value : (JSON.stringify(value, null, 2) ?? "");

  return text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`;
}

function normalizeTitle(value: string | null | undefined) {
  return (value ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function scoreTitleMatch(inputTitle: string, anime: SearchResult) {
  const normalizedInput = normalizeTitle(inputTitle);
  const titles = [anime.title, anime.japaneseTitle]
    .filter(Boolean)
    .map((value) => normalizeTitle(value));

  let score = 0;

  for (const title of titles) {
    if (!title) continue;

    if (title === normalizedInput) {
      score = Math.max(score, 100);
      continue;
    }

    if (title.includes(normalizedInput) || normalizedInput.includes(title)) {
      score = Math.max(score, 70);
      continue;
    }

    const inputWords = new Set(normalizedInput.split(" ").filter(Boolean));
    const titleWords = title.split(" ").filter(Boolean);
    const overlap = titleWords.filter((word) => inputWords.has(word)).length;

    if (overlap > 0) {
      score = Math.max(
        score,
        Math.round(
          (overlap / Math.max(titleWords.length, inputWords.size, 1)) * 60,
        ),
      );
    }
  }

  return score;
}

function pickBestAnimeMatch(title: string, results: SearchResult[]) {
  const rankedResults = results
    .map((anime) => ({
      anime,
      score: scoreTitleMatch(title, anime),
    }))
    .sort((a, b) => b.score - a.score);

  return {
    match: rankedResults[0]?.anime,
    candidates: rankedResults.slice(0, 3).map(({ anime, score }) => ({
      id: anime.id ?? null,
      title: anime.title ?? null,
      japaneseTitle: anime.japaneseTitle ?? null,
      type: anime.type ?? null,
      score,
    })),
  };
}

function findEpisodeByNumber(
  episodes: EpisodeResult[] | undefined,
  episodeNumber: number,
) {
  return episodes?.find((episode) => Number(episode.number) === episodeNumber);
}

function getProviderPriority(providerName: string) {
  switch (providerName) {
    case "Hianime":
      return "primary";
    case "AnimeKai":
      return "secondary";
    default:
      return "fallback";
  }
}

function getErrorDetails(error: unknown) {
  const err = error as {
    name?: string;
    message?: string;
    code?: string;
    response?: {
      status?: number;
      data?: unknown;
    };
  };

  const code = err?.code ?? null;

  return {
    name: err?.name ?? "UnknownError",
    message: err?.message ?? "Unknown error",
    code,
    failureType:
      code === "EAI_AGAIN" || code === "ENOTFOUND" || code === "ECONNREFUSED"
        ? "network"
        : "provider",
    responseStatus: err?.response?.status ?? null,
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
  const title = searchParams.get("title");
  const episodeNumberParam = searchParams.get("episodeNumber");

  const diagnosticsEnabled =
    searchParams.get("diagnostics") === "1" ||
    searchParams.get("debug") === "1";

  if (!episodeId) {
    return NextResponse.json(
      { error: "episodeId is required" },
      { status: 400 },
    );
  }

  if (!title) {
    return NextResponse.json(
      { error: "title is required for provider resolving" },
      { status: 400 },
    );
  }

  if (!episodeNumberParam) {
    return NextResponse.json(
      { error: "episodeNumber is required for provider resolving" },
      { status: 400 },
    );
  }

  const episodeNumber = Number(episodeNumberParam);

  if (!Number.isFinite(episodeNumber) || episodeNumber < 1) {
    return NextResponse.json(
      { error: "episodeNumber must be a positive number" },
      { status: 400 },
    );
  }

  const steps: DiagnosticStep[] = [];

  try {
    logStreamEvent("request_started", episodeId, { title, episodeNumber });

    let episode: { sources?: Array<{ url?: string; quality?: string }> } | null =
      null;
    let usedProvider: string | null = null;

    for (const p of providers) {
      try {
        const provider = p.instance();

        steps.push({
          step: `provider_init_${p.name}`,
          ok: true,
        });

        const searchResults = await provider.search(title);
        const providerResults = (searchResults?.results ?? []) as SearchResult[];

        steps.push({
          step: `search_${p.name}`,
          ok: true,
          details: {
            inputTitle: title,
            results: providerResults.length,
          },
        });

        const { match, candidates } = pickBestAnimeMatch(title, providerResults);

        steps.push({
          step: `match_title_${p.name}`,
          ok: !!match?.id,
          details: {
            inputTitle: title,
            matchedAnimeId: match?.id ?? null,
            matchedAnimeTitle: match?.title ?? null,
            candidates,
          },
        });

        if (!match?.id) {
          throw new Error(`No anime found for ${p.name}`);
        }

        const animeInfo = (await provider.fetchAnimeInfo(match.id)) as {
          title?: string;
          episodes?: EpisodeResult[];
        };

        steps.push({
          step: `fetch_info_${p.name}`,
          ok: true,
          details: {
            matchedAnimeId: match.id,
            matchedAnimeTitle: animeInfo?.title ?? match.title ?? null,
            episodeCount: animeInfo?.episodes?.length ?? 0,
          },
        });

        const episodeMatch = findEpisodeByNumber(
          animeInfo?.episodes,
          episodeNumber,
        );

        if (!episodeMatch?.id) {
          throw new Error(`Episode ${episodeNumber} not found in ${p.name}`);
        }

        const resolvedEpisodeId = episodeMatch.id;

        steps.push({
          step: `resolve_episode_${p.name}`,
          ok: true,
          details: {
            episodeNumber,
            resolvedEpisodeId,
            resolvedEpisodeTitle: episodeMatch.title ?? null,
          },
        });

        const res = await provider.fetchEpisodeSources(resolvedEpisodeId);

        if (!res?.sources?.length) {
          throw new Error("No sources");
        }

        episode = res;
        usedProvider = p.name;

        steps.push({
          step: `fetch_sources_${p.name}`,
          ok: true,
          details: {
            episodeNumber,
            resolvedEpisodeId,
            sourceCount: res.sources.length,
          },
        });

        break;
      } catch (error) {
        const errorDetails = getErrorDetails(error);

        steps.push({
          step: `provider_failed_${p.name}`,
          ok: false,
          details: {
            ...errorDetails,
            inputTitle: title,
            episodeId,
            episodeNumber,
            providerPriority: getProviderPriority(p.name),
          },
        });

        logStreamEvent(`provider_failed_${p.name}`, episodeId, errorDetails);
      }
    }

    if (!episode || !episode.sources?.length) {
      return NextResponse.json(
        {
          error: "No video sources found across providers",
          diagnostics: steps,
        },
        { status: 404 },
      );
    }

    const video = episode.sources.find((source) => source.url);

    if (!video?.url) {
      return NextResponse.json(
        {
          error: "No playable source found",
          provider: usedProvider,
          diagnostics: steps,
        },
        { status: 404 },
      );
    }

    logStreamEvent("success", episodeId, {
      provider: usedProvider,
      quality: video.quality ?? null,
      episodeNumber,
    });

    return NextResponse.json({
      episodeId,
      episodeNumber,
      provider: usedProvider,
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
