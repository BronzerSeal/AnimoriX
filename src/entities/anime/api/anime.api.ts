import { animeApiHttp } from "@/shared/api/anime-http";
import { TopAnimeResponse } from "../model/types";

export async function getTopTenAnimes(): Promise<TopAnimeResponse | null> {
  try {
    const topAnimes = await animeApiHttp.get<TopAnimeResponse>(`top/anime`, {
      params: {
        limit: 10,
        filter: "bypopularity",
      },
    });

    return topAnimes;
  } catch (error) {
    console.error(error);
    return null;
  }
}
