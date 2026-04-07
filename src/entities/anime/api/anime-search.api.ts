import { animeApiHttp } from "@/shared/api/anime-http";
import { AnimeSearchResponse, FullAnimeByIdResponse } from "../model/types";

export async function getAnimeFullById(
  id: string,
): Promise<FullAnimeByIdResponse> {
  return await animeApiHttp.get<FullAnimeByIdResponse>(`anime/${id}/full`);
}

export async function getAnimeByType(
  type: string,
  page = 1,
): Promise<AnimeSearchResponse> {
  return await animeApiHttp.get<AnimeSearchResponse>(`anime?type=${type}`, {
    params: {
      page,
      order_by: "popularity",
    },
  });
}

export async function getAnimeByName(
  name: string,
  page = 1,
): Promise<AnimeSearchResponse> {
  return await animeApiHttp.get<AnimeSearchResponse>(`anime`, {
    params: {
      q: name,
      page,
    },
  });
}

export async function getAnimeByGenre(
  genre: string,
  page = 1,
): Promise<AnimeSearchResponse> {
  return await animeApiHttp.get<AnimeSearchResponse>(`anime?genres=${genre}`, {
    params: {
      page,
    },
  });
}
