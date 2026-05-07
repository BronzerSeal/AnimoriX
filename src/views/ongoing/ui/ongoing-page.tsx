"use client";
import { prepareInfinityAnimeList } from "@/entities/anime";
import { useAnimeOngoing } from "@/entities/anime/queries/anime.queries";
import AnimeList from "@/widgets/anime-list";
import { useTranslations } from "next-intl";

const OngoingPage = () => {
  const t = useTranslations("pages");
  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useAnimeOngoing();

  const items = prepareInfinityAnimeList(data);

  return (
    <AnimeList
      animes={items}
      blockTitle={t("ongoing")}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      loadMore={fetchNextPage}
      disabledLoadMore={isFetching || !hasNextPage}
    />
  );
};

export default OngoingPage;
