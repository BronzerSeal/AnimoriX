"use client";
import { prepareInfinityAnimeList, useAnimeByType } from "@/entities/anime";
import AnimeList from "@/widgets/anime-list";
import { useParams } from "next/navigation";

const TypesPage = () => {
  const { type } = useParams() as { type: string };

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useAnimeByType(type!, !!type);

  const items = prepareInfinityAnimeList(data);

  return (
    <AnimeList
      animes={items}
      blockTitle={type.toUpperCase()}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      loadMore={fetchNextPage}
      disabledLoadMore={isFetching || !hasNextPage}
    />
  );
};

export default TypesPage;
