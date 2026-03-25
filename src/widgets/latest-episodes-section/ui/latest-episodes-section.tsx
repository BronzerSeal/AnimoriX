"use client";
import { AnimeItem, AnimeItemSkeleton } from "@/entities/anime";
import { mapAnime } from "@/entities/anime/model/anime.mapper";
import { useNowSeasons } from "@/entities/anime/queries/anime.queries";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const LatestEpisodesSection = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = useNowSeasons(page);

  const skeletonItems = Array.from({ length: 12 }, (_, index) => index);

  if (isLoading) {
    return (
      <div className="cursor-pointer">
        <section className="flex justify-between items-center mb-3 ">
          <h1 className="font-bold">LATEST UPDATES</h1>
          <p>pagination+filters</p>
        </section>
        <section className="flex gap-4 flex-wrap">
          {skeletonItems.map((item) => (
            <AnimeItemSkeleton key={item} />
          ))}
        </section>
      </div>
    );
  }

  if (!data?.data?.length) {
    return null;
  }

  const items = data.data.map(mapAnime);
  const pagination = data.pagination;

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
      </section>
    </div>
  );
};

export default LatestEpisodesSection;
