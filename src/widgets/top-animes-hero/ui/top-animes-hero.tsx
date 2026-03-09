import { getTopTenAnimes } from "@/entities/anime/api/anime.api";
import { mapAnimeToHero } from "@/entities/anime/model/anime.mapper";
import TopAnimesHeroSlider from "./TopAnimesHeroSlider";

const TopAnimesHero = async () => {
  const response = await getTopTenAnimes();

  if (!response?.data?.length) {
    return null;
  }

  const items = response.data.map(mapAnimeToHero);

  return <TopAnimesHeroSlider items={items} />;
};

export default TopAnimesHero;
