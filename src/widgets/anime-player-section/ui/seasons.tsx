"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel";
import Season from "./season";
import SeasonsSkeleton from "./seasons-skeleton";
import { useAnimeSeasons } from "@/entities/anime";

const itemBasisClass =
  "basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-1/7";

const Seasons = ({ animeId }: { animeId: number }) => {
  const {
    data: seasons,
    isLoading,
    isError,
  } = useAnimeSeasons(animeId, Number.isFinite(animeId));

  if (isLoading) {
    return <SeasonsSkeleton />;
  }

  if (isError || !seasons?.length) {
    return null;
  }

  return (
    <Carousel
      opts={{
        align: "start",
        containScroll: "trimSnaps",
        dragFree: false,
        slidesToScroll: 1,
      }}
      className="w-full space-y-3"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Seasons
        </h2>

        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-slate-500 dark:text-white/45 sm:inline">
            {seasons.length} items
          </span>
          <div className="flex gap-2">
            <CarouselPrevious className="static translate-y-0 border-slate-300/80 bg-white text-slate-700 shadow-sm hover:bg-slate-100 disabled:opacity-35 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/16" />
            <CarouselNext className="static translate-y-0 border-slate-300/80 bg-white text-slate-700 shadow-sm hover:bg-slate-100 disabled:opacity-35 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/16" />
          </div>
        </div>
      </div>

      <div>
        <CarouselContent className="-ml-3">
          {seasons.map((season) => (
            <CarouselItem key={season.id} className={`${itemBasisClass} pl-3`}>
              <Season
                id={season.id}
                title={season.title}
                episodes={season.episodes}
                poster={season.poster}
                isActive={season.id === animeId}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
    </Carousel>
  );
};

export default Seasons;
