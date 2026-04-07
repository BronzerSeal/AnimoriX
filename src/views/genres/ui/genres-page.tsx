"use client";
import { useAnimeByGenre } from "@/entities/anime";
import { mapAnime } from "@/entities/anime/model/anime.mapper";
import { anime } from "@/entities/anime/model/types";
import AnimeList from "@/widgets/anime-list";
import { useParams } from "next/navigation";
import { getGenreIdByName } from "../model/getGenreIdByName";

const GenresPage = () => {
  const { genre } = useParams() as { genre: string };

  const genreId = getGenreIdByName(genre);

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useAnimeByGenre(genreId!, !!genreId);

  const items =
    data
      ?.flatMap((page) => page.data ?? [])
      .filter((anime) => anime.rating !== "Rx - Hentai")
      .map(mapAnime)
      .filter((item): item is anime => item !== undefined) ?? [];

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
