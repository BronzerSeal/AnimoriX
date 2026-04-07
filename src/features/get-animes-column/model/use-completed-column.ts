import { useEffect, useState } from "react";
import { useAnimeCompleted } from "@/entities/anime";
import { mapAnime } from "@/entities/anime/model/anime.mapper";
import { filterSafeAnime } from "@/shared/lib/filterSafeAnime";
import { uniqueById } from "@/shared/lib/uniqueById";

export const useCompletedColumn = (enabled?: boolean) => {
  const [delayedEnabled, setDelayedEnabled] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const timer = setTimeout(() => {
      setDelayedEnabled(true);
    }, 2000); // ⏱ 2 секунды

    return () => clearTimeout(timer);
  }, [enabled]);

  const { data, isLoading } = useAnimeCompleted(delayedEnabled);

  const items = uniqueById(filterSafeAnime(data ?? []))
    .slice(0, 6)
    .map(mapAnime);
  return { items, isLoading };
};
