import type { HeroAnime, TopAnimeItemWithBanner } from "./types";

export function mapAnimeToHero(anime: TopAnimeItemWithBanner): HeroAnime {
  return {
    id: anime.mal_id ?? 0,
    title: anime.title_english ?? anime.title ?? "Unknown title",
    description: anime.synopsis ?? "No description available.",
    image:
      anime?.bannerImage ??
      anime.images?.jpg?.large_image_url ??
      anime.images?.jpg?.image_url ??
      "",
    rating: anime.rating?.split(" - ")[0] ?? "N/A",
    year: anime.year ?? null,
    genres: anime.genres?.map((genre) => genre.name ?? "Unknown") ?? [],
    type: anime.type ?? "TV",
    score: anime.score ?? 0,
  };
}
