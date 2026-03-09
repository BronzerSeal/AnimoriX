import { paths } from "@/shared/types/jikan";

export type TopAnimeResponse =
  paths["/top/anime"]["get"]["responses"][200]["content"]["application/json"];

export type TopAnimeItem = NonNullable<TopAnimeResponse["data"]>[number];

export type HeroAnime = {
  id: number;
  title: string;
  description: string;
  image: string;
  rating: string;
  year: number | null;
  type: string;
  genres: string[];
  score: number;
};
