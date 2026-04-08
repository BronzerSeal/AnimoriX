import { useAnimeUpcoming } from "@/entities/anime";
import { mapAnime } from "@/entities/anime/model/anime.mapper";
import { filterSafeAnime } from "@/shared/lib/filterSafeAnime";
import { uniqueById } from "@/shared/lib/uniqueById";

export const useUpcomingColumn = (enabled?: boolean) => {
  const { data, isLoading } = useAnimeUpcoming(enabled);

  const items = uniqueById(filterSafeAnime(data ?? []))
    .slice(0, 6)
    .map(mapAnime);

  return { items, isLoading };
};
