import { animeApiHttp } from "@/shared/api/anime-http";
import { SeasonNowResponse } from "../model/types";

export async function getSeasonNow(page = 1): Promise<SeasonNowResponse> {
  return await animeApiHttp.get<SeasonNowResponse>(`seasons/now`, {
    params: {
      limit: 12,
      page,
    },
  });
}
