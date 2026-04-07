"use client";
import { prepareInfinityAnimeList } from "@/entities/anime";
import { useAnimeOngoing } from "@/entities/anime/queries/anime.queries";
import AnimeList from "@/widgets/anime-list";

const OngoingPage = () => {
  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useAnimeOngoing();

  const items = prepareInfinityAnimeList(data);

  return (
    <AnimeList
      animes={items}
      blockTitle="ONGOING"
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      loadMore={fetchNextPage}
      disabledLoadMore={isFetching || !hasNextPage}
    />
  );
};

export default OngoingPage;
