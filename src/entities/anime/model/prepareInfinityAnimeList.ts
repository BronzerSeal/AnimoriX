import { uniqueById } from "@/shared/lib/uniqueById";
import { mapAnime } from "./anime.mapper";
import { anime } from "./types";
import { filterSafeAnime } from "@shared/lib/filterSafeAnime";

type AnyAnimeRaw = any; // можно позже типизировать точнее

export const prepareInfinityAnimeList = (
  data: AnyAnimeRaw[] | undefined,
): anime[] => {
  const flatData = data?.flatMap((page) => page.data ?? []) ?? [];

  return uniqueById(filterSafeAnime(flatData))
    .map(mapAnime)
    .filter((item): item is anime => item !== undefined);
};
