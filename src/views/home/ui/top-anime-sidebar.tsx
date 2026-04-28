"use client";

import { useTopAnimesWithBanners } from "@/entities/anime";
import { mapAnimeToHero } from "@/entities/anime/model/animeToHero.mapper";
import AnimesSidebar from "@/widgets/animes-sidebar";

const TopAnimesSidebar = () => {
  const { data, isLoading } = useTopAnimesWithBanners();

  const items = data?.data?.map(mapAnimeToHero) ?? [];

  return <AnimesSidebar items={items} isLoading={isLoading} />;
};

export default TopAnimesSidebar;
