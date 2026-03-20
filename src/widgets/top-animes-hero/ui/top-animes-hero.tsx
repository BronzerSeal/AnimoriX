"use client";

import { mapAnimeToHero } from "@/entities/anime/model/anime.mapper";
import TopAnimesHeroSlider from "./top-animes-hero-slider";
import { useTopAnimesWithBanners } from "@/entities/anime/queries/anime.queries";

const TopAnimesHero = () => {
  const { data, isLoading } = useTopAnimesWithBanners();
  if (isLoading || !data?.data?.length) {
    return null;
  }

  const items = data.data.map(mapAnimeToHero);

  return <TopAnimesHeroSlider items={items} />;
};

export default TopAnimesHero;
