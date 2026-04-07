"use client";
import { useAnimeByType } from "@/entities/anime";
import { mapAnime } from "@/entities/anime/model/anime.mapper";
import { anime } from "@/entities/anime/model/types";
import AnimeList from "@/widgets/anime-list";
import { useParams } from "next/navigation";

const TypesPage = () => {
  const { type } = useParams() as { type: string };

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useAnimeByType(type!, !!type);

  const items =
    data
      ?.flatMap((page) => page.data ?? [])
      .filter((anime) => anime.rating !== "Rx - Hentai")
      .map(mapAnime)
      .filter((item): item is anime => item !== undefined) ?? [];

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
