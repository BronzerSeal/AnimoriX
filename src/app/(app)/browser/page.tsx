"use client";
import { useSearchAnime } from "@/entities/anime";
import { mapAnime } from "@/entities/anime/model/anime.mapper";
import { anime } from "@/entities/anime/model/types";
import BrowserPage from "@/views/browser";
import { useSearchParams } from "next/navigation";

const BrowserRoute = () => {
  const params = useSearchParams();
  const keyword = params.get("keyword");
  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useSearchAnime(keyword!, !!keyword);

  const items =
    data
      ?.flatMap((page) => page.data ?? [])
      .filter((anime) => anime.rating !== "Rx - Hentai")
      .map(mapAnime)
      .filter((item): item is anime => item !== undefined) ?? [];

  return (
    <BrowserPage
      animes={items}
      blockTitle="Browser"
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      loadMore={fetchNextPage}
      disabledLoadMore={isFetching || !hasNextPage}
    />
  );
};

export default BrowserRoute;
