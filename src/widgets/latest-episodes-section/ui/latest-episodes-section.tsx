"use client";
import { AnimeItem, useNowSeasons } from "@/entities/anime";
import { mapAnime } from "@/entities/anime/model/anime.mapper";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import LatestEpisodesSkeleton from "./latest-episodes-skeleton";
import { BannedAnimeItem } from "./banned-animes";
import { uniqueById } from "@/shared/lib/uniqueById";
import { filterSafeAnime } from "@/shared/lib/filterSafeAnime";

const LatestEpisodesSection = () => {
  const ANIMES_PER_PAGE = 12;
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = useNowSeasons(page);

  if (isLoading) {
    return <LatestEpisodesSkeleton />;
  }

  if (!data?.data?.length) {
    return null;
  }

  const items = uniqueById(filterSafeAnime(data.data)).map(mapAnime);
  const pagination = data.pagination;

  const placeholdersCount = ANIMES_PER_PAGE - items.length;
  const placeholders = Array.from({ length: placeholdersCount });
  return (
    <div className="cursor-pointer">
      <section className="flex justify-between items-center mb-3 ">
        <h1 className="font-bold">LATEST UPDATES</h1>
        <div className="flex items-center">
          <p>filters</p>
          <div>
            <button
              className="m-1 font-bold text-2xl hover:text-gray-400 transition disabled:text-gray-400"
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page <= 1 || isFetching}
            >
              <ArrowLeft />
            </button>
            <button
              className="m-1 font-bold text-2xl hover:text-gray-400 transition disabled:text-gray-400"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!pagination?.has_next_page || isFetching}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </section>
      <section className="flex gap-4 flex-wrap">
        {items.map((anime, idx) => (
          <AnimeItem anime={anime} key={`${anime.id}-${page}-${idx}`} />
        ))}
        {placeholders.map((_, idx) => (
          <BannedAnimeItem key={`ban-${idx}`} />
        ))}
      </section>
    </div>
  );
};

export default LatestEpisodesSection;
