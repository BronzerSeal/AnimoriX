"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

import { Button } from "@/shared/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/shared/ui/carousel";
import { HeroAnime } from "@/entities/anime/model/types";
import { Bookmark, ChevronLeft, ChevronRight, Star } from "lucide-react";

type Props = {
  items: HeroAnime[];
};

const TopAnimesHeroSlider = ({ items }: Props) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (!items.length) return null;
  console.log(items);
  return (
    <section className="w-full flex justify-center">
      <div className="relative mx-auto w-full max-w-425 overflow-hidden ">
        <Carousel
          setApi={setApi}
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 10000,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {items.map((anime) => (
              <CarouselItem key={anime.id}>
                <div className="relative h-130 w-full max-w-425 md:h-155">
                  <Image
                    src={anime.image || "/placeholder-anime.jpg"}
                    alt={anime.title}
                    fill
                    priority
                    className="object-cover"
                  />

                  {/* левый градиент для читаемости текста */}
                  <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent" />

                  {/* нижний градиент */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

                  <div className="absolute inset-0 z-10 flex items-end md:items-center">
                    <div className="w-full px-6 pb-10 md:px-10 md:pb-0">
                      <div className="max-w-2xl space-y-5">
                        <h2 className="text-3xl font-bold leading-tight text-white md:text-5xl">
                          {anime.title}
                        </h2>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-white/90">
                          <span className="rounded-md border border-orange-500 px-2 py-1 text-orange-400">
                            {anime.rating || "N/A"}
                          </span>

                          <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500 px-2 py-1 text-emerald-400">
                            <Star className="h-3.5 w-3.5" />
                            {anime.score || "N/A"}
                          </span>

                          <span>{anime.type}</span>

                          {anime.genres?.slice(0, 3).map((genre) => (
                            <span key={genre}>{genre}</span>
                          ))}
                        </div>

                        <p className="line-clamp-3 max-w-xl text-sm leading-7 text-white/80 md:text-base">
                          {anime.description}
                        </p>

                        <div className="grid max-w-md grid-cols-3 gap-3 rounded-xl bg-black/55 p-4 backdrop-blur-sm">
                          <div>
                            <p className="text-xs text-white/50">Rating</p>
                            <p className="mt-1 text-lg font-semibold text-white">
                              {anime.rating}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-white/50">Release</p>
                            <p className="mt-1 text-lg font-semibold text-white">
                              {anime.year}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-white/50">Score</p>
                            <p className="mt-1 text-lg font-semibold text-white">
                              {anime.score}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                          <Button
                            asChild
                            className="rounded-xl h-12 bg-orange-500 px-8 text-base font-semibold hover:bg-orange-400"
                          >
                            <Link href={`/anime/${anime.id}`}>WATCH NOW</Link>
                          </Button>

                          <Button
                            size="icon"
                            variant="outline"
                            className="h-12 w-12 rounded-xl border-white/20 bg-white/5 text-white hover:bg-white/10"
                          >
                            <Bookmark className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* стрелки + счетчик */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-4 rounded-xl bg-black/40 px-4 py-2 text-white backdrop-blur-sm">
          <button
            onClick={() => api?.scrollPrev()}
            className="rounded-md p-1 transition hover:bg-white/10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="text-sm font-medium">
            <span>{current + 1}</span>
            <span className="mx-1 text-white/50">/</span>
            <span className="text-white/70">{items.length}</span>
          </div>

          <button
            onClick={() => api?.scrollNext()}
            className="rounded-md p-1 transition hover:bg-white/10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopAnimesHeroSlider;
