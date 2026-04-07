import { animeApiHttp } from "@/shared/api/anime-http";
import { AnimeSearchResponse, FullAnimeByIdResponse } from "../model/types";

type AnimeSearchParams = {
  q?: string;
  type?: string;
  genres?: string;
  status?: string;
  order_by?: string;
  sort?: "asc" | "desc";
  page?: number;
  limit?: number;
  sfw?: boolean;
};

export async function getAnimeFullById(
  id: string,
): Promise<FullAnimeByIdResponse> {
  return await animeApiHttp.get<FullAnimeByIdResponse>(`anime/${id}/full`);
}

export async function getAnime(params: AnimeSearchParams) {
  return await animeApiHttp.get<AnimeSearchResponse>("anime", {
    params: {
      ...params,
    },
  });
}
