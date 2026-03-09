import { paths } from "@/shared/types/jikan";

export type TopAnimeResponse =
  paths["/top/anime"]["get"]["responses"][200]["content"]["application/json"];
