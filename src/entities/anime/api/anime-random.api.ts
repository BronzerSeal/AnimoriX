import { animeApiHttp } from "@/shared/api/anime-http";
import { AnimeRandomResponse } from "../model/types";

export async function getAnimeRandom(): Promise<AnimeRandomResponse> {
  return await animeApiHttp.get<AnimeRandomResponse>(`random/anime`, {
    headers: {
      "Cache-Control": "no-cache",
    },
    params: {
      sfw: false,
    },
  });
}
