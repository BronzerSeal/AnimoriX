"use client";

import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

import { Button } from "@/shared/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";
import { Bookmark } from "lucide-react";
import AnimeRatingGenre from "./anime-rating-genre";
import AnimeDescription from "./anime-description";
import SliderChevrons from "./slider-chevrons";
import type { HeroAnime } from "@/entities/anime";
import useHeroSlider from "../model/use-hero-slider";
import HeroOverlays from "./hero-overlays";

type Props = {
  items: HeroAnime[];
};

const TopAnimesHeroSlider = ({ items }: Props) => {
  const { api, setApi, current } = useHeroSlider();

  if (!items.length) return null;
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
                  <HeroOverlays />
                  <div className="absolute inset-0 z-10 flex items-end md:items-center">
                    <div className="w-full px-6 pb-10 md:px-10 md:pb-0 ">
                      <div className="max-w-2xl space-y-5">
                        <h2 className="text-3xl font-bold leading-tight text-black dark:text-white md:text-5xl">
                          {anime.title}
                        </h2>

                        <AnimeRatingGenre anime={anime} />

                        <AnimeDescription anime={anime} />

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
                            className="h-12 w-12 rounded-xl border-white/20 dark:bg-white/5 text-black dark:text-white "
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
        <SliderChevrons
          api={api}
          itemsLength={items.length}
          current={current}
        />
      </div>
    </section>
  );
};

export default TopAnimesHeroSlider;
