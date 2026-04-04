import { animeApiHttp } from "@/shared/api/anime-http";
import { AnimeRecommendationsByIdResponse } from "../model/types";

export async function getAnimeRecommendations(
  id: number,
): Promise<AnimeRecommendationsByIdResponse> {
  return await animeApiHttp.get<AnimeRecommendationsByIdResponse>(
    `anime/${id}/recommendations`,
  );
}
