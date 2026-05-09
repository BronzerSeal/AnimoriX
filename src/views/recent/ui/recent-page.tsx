"use client";
import { prepareInfinityAnimeList } from "@/entities/anime";
import { useAnimeRecent } from "@/entities/anime/queries/anime.queries";
import AnimeList from "@/widgets/anime-list";
import { useTranslations } from "next-intl";

const RecentPage = () => {
  const t = useTranslations("pages");
  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useAnimeRecent();

  const items = prepareInfinityAnimeList(data);

  return (
    <AnimeList
      animes={items}
      blockTitle={t("recent")}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      loadMore={fetchNextPage}
      disabledLoadMore={isFetching || !hasNextPage}
    />
  );
};

export default RecentPage;
