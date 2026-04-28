"use client";

import { useTopAnimesWithBanners } from "@/entities/anime";
import { mapAnimeToHero } from "@/entities/anime/model/animeToHero.mapper";
import { ExpandableAnimeSidebar } from "@/widgets/animes-sidebar";

const ExpandableTopAnimesSidebar = () => {
  const { data, isLoading } = useTopAnimesWithBanners();

  const items = data?.data?.map(mapAnimeToHero) ?? [];

  return <ExpandableAnimeSidebar items={items} isLoading={isLoading} />;
};

export default ExpandableTopAnimesSidebar;
