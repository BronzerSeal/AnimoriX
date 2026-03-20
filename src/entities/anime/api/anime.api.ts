import { animeApiHttp } from "@/shared/api/anime-http";
import {
  BannerMap,
  TopAnimeResponse,
  TopAnimeResponseWithBanner,
} from "../model/types";
import axios from "axios";

export async function getTopTenAnimes(): Promise<TopAnimeResponse> {
  return await animeApiHttp.get<TopAnimeResponse>(`top/anime`, {
    params: {
      limit: 10,
      filter: "bypopularity",
    },
  });
}

export async function getAnimeBannersByMalIds(
  malIds: number[],
): Promise<BannerMap> {
  try {
    if (!malIds.length) return {};

    const uniqueIds = [...new Set(malIds)].filter(Boolean);

    const queryFields = uniqueIds
      .map(
        (id, index) => `
          anime_${index}: Media(idMal: ${id}, type: ANIME) {
            idMal
            bannerImage
            coverImage {
              extraLarge
              large
              medium
            }
          }
        `,
      )
      .join("\n");

    const query = `
      query {
        ${queryFields}
      }
    `;

    const res = await axios.post("https://graphql.anilist.co", { query });

    const data = res.data?.data ?? {};

    const banners: BannerMap = {};

    Object.values(data).forEach((media: any) => {
      if (!media?.idMal) return;

      banners[media.idMal] =
        media.bannerImage ??
        media.coverImage?.extraLarge ??
        media.coverImage?.large ??
        media.coverImage?.medium ??
        null;
    });

    return banners;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function getTopTenAnimesWithBanners(): Promise<TopAnimeResponseWithBanner> {
  const topAnimes = await getTopTenAnimes();

  if (!topAnimes.data?.length) {
    return { ...topAnimes, data: [] };
  }

  const malIds = topAnimes.data
    .map((anime) => anime.mal_id)
    .filter((id): id is number => id !== undefined);
  const bannersMap = await getAnimeBannersByMalIds(malIds);

  return {
    ...topAnimes,
    data: topAnimes.data.map((anime) => ({
      ...anime,
      bannerImage: anime.mal_id ? (bannersMap[anime.mal_id] ?? null) : null,
    })),
  };
}
