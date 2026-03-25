import { paths } from "@/shared/types/jikan";

export type BannerMap = Record<number, string | null>;

export type anime = {
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

//Top anime
export type TopAnimeResponse =
  paths["/top/anime"]["get"]["responses"][200]["content"]["application/json"];

export type TopAnimeItem = NonNullable<TopAnimeResponse["data"]>[number];

export type TopAnimeItemWithBanner = TopAnimeItem & {
  bannerImage?: string | null;
};

export type TopAnimeResponseWithBanner = Omit<TopAnimeResponse, "data"> & {
  data: TopAnimeItemWithBanner[];
};

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

//Latest episodes
export type SeasonNowResponse =
  paths["/seasons/now"]["get"]["responses"][200]["content"]["application/json"];

export type SeasonNowItem = NonNullable<SeasonNowResponse["data"]>[number];
