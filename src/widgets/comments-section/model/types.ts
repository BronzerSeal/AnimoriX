import { paths } from "@/shared/types/jikan";

type AnimeCommentsByIdResponse =
  paths["/anime/{id}/reviews"]["get"]["responses"][200]["content"]["application/json"];

export type comment = NonNullable<
  NonNullable<AnimeCommentsByIdResponse>["data"]
>[number];
