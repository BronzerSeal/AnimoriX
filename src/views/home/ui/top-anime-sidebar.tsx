"use client";

import { useTopAnimesWithBanners } from "@/entities/anime";
import { mapAnimeToHero } from "@/entities/anime/model/animeToHero.mapper";
import AnimesSidebar from "@/widgets/animes-sidebar";
import { useTranslations } from "next-intl";

const TopAnimesSidebar = () => {
  const t = useTranslations("home-page");
  const { data, isLoading } = useTopAnimesWithBanners();

  const items = data?.data?.map(mapAnimeToHero) ?? [];

  return (
    <AnimesSidebar
      title={t("topTrending")}
      items={items}
      isLoading={isLoading}
    />
  );
};

export default TopAnimesSidebar;
