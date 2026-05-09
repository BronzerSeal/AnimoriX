"use client";

import { prepareInfinityAnimeList, useSearchAnime } from "@/entities/anime";
import AnimeList from "@/widgets/anime-list";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

const BrowserPage = () => {
  const t = useTranslations("pages");
  const params = useSearchParams();
  const keyword = params.get("keyword");

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useSearchAnime(keyword!, !!keyword);

  const items = prepareInfinityAnimeList(data);

  return (
    <AnimeList
      animes={items}
      blockTitle={t("browser")}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      loadMore={fetchNextPage}
      disabledLoadMore={isFetching || !hasNextPage}
    />
  );
};

export default BrowserPage;
