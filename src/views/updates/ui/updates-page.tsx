"use client";
import { prepareInfinityAnimeList } from "@/entities/anime";
import { useAnimeUpdates } from "@/entities/anime/queries/anime.queries";
import AnimeList from "@/widgets/anime-list";

const UpdatesPage = () => {
  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useAnimeUpdates();

  const items = prepareInfinityAnimeList(data);

  return (
    <AnimeList
      animes={items}
      blockTitle="UPDATES"
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      loadMore={fetchNextPage}
      disabledLoadMore={isFetching || !hasNextPage}
    />
  );
};

export default UpdatesPage;
