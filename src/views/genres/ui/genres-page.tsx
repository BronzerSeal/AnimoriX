"use client";
import { prepareInfinityAnimeList, useAnimeByGenre } from "@/entities/anime";
import AnimeList from "@/widgets/anime-list";
import { useParams } from "next/navigation";
import { getGenreIdByName } from "../model/getGenreIdByName";

const GenresPage = () => {
  const { genre } = useParams() as { genre: string };

  const genreId = getGenreIdByName(genre);

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useAnimeByGenre(genreId!, !!genreId);

  const items = prepareInfinityAnimeList(data);

  return (
    <AnimeList
      animes={items}
      blockTitle={`${genre.toUpperCase()} ANIME`}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      loadMore={fetchNextPage}
      disabledLoadMore={isFetching || !hasNextPage}
    />
  );
};

export default GenresPage;
