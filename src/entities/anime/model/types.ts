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

//anime-by-id
export type FullAnimeByIdResponse =
  paths["/anime/{id}/full"]["get"]["responses"][200]["content"]["application/json"];

export type FullAnimeByIdItem = NonNullable<FullAnimeByIdResponse["data"]>;
//anime-seasons
export type AnimeSeason = "WINTER" | "SPRING" | "SUMMER" | "FALL" | null;

export type AnimeNode = {
  id: number;
  idMal: number | null;
  title: {
    romaji: string | null;
    english?: string | null;
  };
  coverImage?: {
    extraLarge?: string | null;
    large?: string | null;
    medium?: string | null;
  } | null;
  episodes: number | null;
  format: string | null;
  season: AnimeSeason;
  seasonYear: number | null;
};

export type RelationEdge = {
  relationType: "PREQUEL" | "SEQUEL" | string;
  node: AnimeNode | null;
};

export type Anime = AnimeNode & {
  relations: {
    edges: RelationEdge[];
  };
};

export type AnimeSeasonsResponse = {
  data: {
    Media: Anime | null;
  };
};
