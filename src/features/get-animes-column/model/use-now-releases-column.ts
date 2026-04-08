import { useNowSeasons } from "@/entities/anime";
import { mapAnime } from "@/entities/anime/model/anime.mapper";
import { filterSafeAnime } from "@/shared/lib/filterSafeAnime";
import { uniqueById } from "@/shared/lib/uniqueById";

export const useNowReleasesColumn = () => {
  const { data, isLoading } = useNowSeasons();

  const items = uniqueById(filterSafeAnime(data?.data ?? []))
    .slice(0, 6)
    .map(mapAnime);

  return { items, isLoading };
};
