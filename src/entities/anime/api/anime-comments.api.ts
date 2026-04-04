import { animeApiHttp } from "@/shared/api/anime-http";
import { AnimeCommentsByIdResponse } from "../model/types";

export async function getAnimeCommentsById(
  id: number,
  page = 1,
): Promise<AnimeCommentsByIdResponse> {
  return await animeApiHttp.get<AnimeCommentsByIdResponse>(
    `anime/${id}/reviews`,
    {
      params: {
        preliminary: true,
        page,
      },
    },
  );
}
