"use client";
import {
  prepareInfinityAnimeList,
  useInfinityNowSeasons,
} from "@/entities/anime";
import AnimeList from "@/widgets/anime-list";

const NewReleasesPage = () => {
  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useInfinityNowSeasons();

  const items = prepareInfinityAnimeList(data);

  return (
    <AnimeList
      animes={items}
      blockTitle="NEW RELEASES"
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      loadMore={fetchNextPage}
      disabledLoadMore={isFetching || !hasNextPage}
    />
  );
};

export default NewReleasesPage;
