"use client";

import { prepareInfinityAnimeList, useSearchAnime } from "@/entities/anime";
import AnimeList from "@/widgets/anime-list";
import { useSearchParams } from "next/navigation";

const BrowserPage = () => {
  const params = useSearchParams();
  const keyword = params.get("keyword");

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useSearchAnime(keyword!, !!keyword);

  const items = prepareInfinityAnimeList(data);

  return (
    <AnimeList
      animes={items}
      blockTitle="Browser"
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      loadMore={fetchNextPage}
      disabledLoadMore={isFetching || !hasNextPage}
    />
  );
};

export default BrowserPage;
