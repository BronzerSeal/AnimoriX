import { AnimeImage } from "./types";

export function mapAnimeImage(anime: AnimeImage): string {
  return (
    anime?.jpg?.large_image_url ||
    anime?.webp?.large_image_url ||
    anime?.jpg?.image_url ||
    anime?.webp?.image_url ||
    anime?.jpg?.small_image_url ||
    anime?.webp?.small_image_url ||
    ""
  );
}
