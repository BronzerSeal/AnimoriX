import { animeApiHttp } from "@/shared/api/anime-http";
import { FullAnimeByIdResponse } from "../model/types";

export async function getAnimeFullById(
  id: string,
): Promise<FullAnimeByIdResponse> {
  return await animeApiHttp.get<FullAnimeByIdResponse>(`anime/${id}/full`);
}
