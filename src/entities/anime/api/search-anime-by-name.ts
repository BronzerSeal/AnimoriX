import { animeApiHttp } from "@/shared/api/anime-http";
import { AnimeSearchByNameResponse } from "../model/types";

export async function getAnimeByName(
  name: string,
  page = 1,
): Promise<AnimeSearchByNameResponse> {
  return await animeApiHttp.get<AnimeSearchByNameResponse>(`anime`, {
    params: {
      q: name,
      page,
    },
  });
}
