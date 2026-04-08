"use client";
import { prepareInfinityAnimeList } from "@/entities/anime";
import { useAnimeRecent } from "@/entities/anime/queries/anime.queries";
import AnimeList from "@/widgets/anime-list";

const RecentPage = () => {
  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useAnimeRecent();

  const items = prepareInfinityAnimeList(data);

  return (
    <AnimeList
      animes={items}
      blockTitle="RECENT"
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      loadMore={fetchNextPage}
      disabledLoadMore={isFetching || !hasNextPage}
    />
  );
};

export default RecentPage;
