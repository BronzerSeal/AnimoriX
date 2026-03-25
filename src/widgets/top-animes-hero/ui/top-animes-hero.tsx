"use client";

import { mapAnimeToHero } from "@/entities/anime/model/animeToHero.mapper";
import TopAnimesHeroSlider from "./top-animes-hero-slider";
import { useTopAnimesWithBanners } from "@/entities/anime/queries/anime.queries";
import TopAnimesHeroSkeleton from "./top-animes-hero-skeleton";

const TopAnimesHero = () => {
  const { data, isLoading } = useTopAnimesWithBanners();
  if (isLoading) {
    return <TopAnimesHeroSkeleton />;
  }

  if (!data?.data?.length) {
    return null;
  }

  const items = data.data.map(mapAnimeToHero);

  return <TopAnimesHeroSlider items={items} />;
};

export default TopAnimesHero;
