"use client";
import { prepareInfinityAnimeList } from "@/entities/anime";
import { useAnimeUpdates } from "@/entities/anime/queries/anime.queries";
import AnimeList from "@/widgets/anime-list";
import { useTranslations } from "next-intl";

const UpdatesPage = () => {
  const t = useTranslations("pages");
  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useAnimeUpdates();

  const items = prepareInfinityAnimeList(data);

  return (
    <AnimeList
      animes={items}
      blockTitle={t("updates")}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      loadMore={fetchNextPage}
      disabledLoadMore={isFetching || !hasNextPage}
    />
  );
};

export default UpdatesPage;
