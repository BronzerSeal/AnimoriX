import { anilistClient } from "@/shared/api/anilist-http";
import {
  AnimeSeason,
  Anime,
  AnimeSeasonsResponse,
  AnimeNode,
} from "../model/types";

const seasonOrder: Record<Exclude<AnimeSeason, null>, number> = {
  WINTER: 0,
  SPRING: 1,
  SUMMER: 2,
  FALL: 3,
};

async function fetchAnime(idMal: number): Promise<Anime | null> {
  const query = `
    query ($idMal: Int) {
      Media(idMal: $idMal, type: ANIME) {
        id
        idMal
        title {
          romaji
          english
        }
        coverImage {
          extraLarge
          large
          medium
        }
        episodes
        format
        season
        seasonYear
        relations {
          edges {
            relationType
            node {
              id
              idMal
              title {
                romaji
                english
              }
              coverImage {
                extraLarge
                large
                medium
              }
              episodes
              format
              season
              seasonYear
            }
          }
        }
      }
    }
  `;

  const { data } = await anilistClient.post<AnimeSeasonsResponse>("/", {
    query,
    variables: { idMal },
  });

  return data.data.Media;
}

function getTitle(title: AnimeNode["title"]) {
  return title.romaji ?? title.english ?? "Untitled";
}

function getSeasonRank(anime: AnimeNode) {
  if (!anime.seasonYear) return Number.MAX_SAFE_INTEGER;
  if (!anime.season) return anime.seasonYear * 10 + 9;

  return anime.seasonYear * 10 + seasonOrder[anime.season];
}

export async function getAnimeSeasons(startMalId: number) {
  const visited = new Set<number>();
  const collected = new Map<number, AnimeNode>();

  async function dfs(idMal: number) {
    if (visited.has(idMal)) return;
    visited.add(idMal);

    const anime = await fetchAnime(idMal);
    if (!anime?.idMal) return;

    collected.set(anime.idMal, anime);

    for (const edge of anime.relations.edges) {
      if (
        (edge.relationType === "PREQUEL" || edge.relationType === "SEQUEL") &&
        edge.node?.idMal
      ) {
        await dfs(edge.node.idMal);
      }
    }
  }

  await dfs(startMalId);

  return [...collected.values()]
    .filter((anime) => anime.format === "TV" || anime.format === "ONA")
    .sort((a, b) => {
      const seasonDiff = getSeasonRank(a) - getSeasonRank(b);
      if (seasonDiff !== 0) return seasonDiff;

      return (a.idMal ?? 0) - (b.idMal ?? 0);
    })
    .map((anime) => ({
      id: anime.idMal ?? anime.id,
      title: getTitle(anime.title),
      episodes: anime.episodes ?? 0,
      poster:
        anime.coverImage?.extraLarge ??
        anime.coverImage?.large ??
        anime.coverImage?.medium ??
        null,
      season: anime.season,
      seasonYear: anime.seasonYear,
    }));
}
