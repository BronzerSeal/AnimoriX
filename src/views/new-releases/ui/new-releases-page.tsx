"use client";
import {
  prepareInfinityAnimeList,
  useInfinityNowSeasons,
} from "@/entities/anime";
import AnimeList from "@/widgets/anime-list";
import { useTranslations } from "next-intl";

const NewReleasesPage = () => {
  const t = useTranslations("pages");
  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useInfinityNowSeasons();

  const items = prepareInfinityAnimeList(data);

  return (
    <AnimeList
      animes={items}
      blockTitle={t("new-releases")}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      loadMore={fetchNextPage}
      disabledLoadMore={isFetching || !hasNextPage}
    />
  );
};

export default NewReleasesPage;
