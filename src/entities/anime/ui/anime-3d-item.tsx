"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { CardBody, CardContainer, CardItem } from "@/shared/ui/aceternity";

import { anime } from "../model/types";
import { AnimeBadges } from "./anime-badges";

const AnimeThreeDItem = ({ anime }: { anime: anime }) => {
  const router = useRouter();

  return (
    <article
      onClick={() => router.push(`/watch/${anime.id}`)}
      className="group cursor-pointer basis-[calc((100%-1rem)/2)] md:basis-[calc((100%-3rem)/4)] xl:basis-[calc((100%-5rem)/6)]"
    >
      <CardContainer
        className="w-full h-full"
        containerClassName="w-full h-full py-0"
      >
        <CardBody className="flex flex-col justify-between h-full w-full bg-transparent">
          <div className="flex flex-col h-full">
            <CardItem translateZ={100} className="w-full">
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  className="object-cover transition-transform duration-300 ease-out group-hover:-translate-y-[6px]"
                  src={anime.image}
                  alt={anime.title}
                  fill
                  sizes="(max-width: 639px) 50vw, (max-width: 767px) 190px, (max-width: 1023px) 220px, 250px"
                />
              </div>
            </CardItem>

            <CardItem
              translateZ={45}
              className="mt-2 w-full text-sm font-semibold leading-tight line-clamp-2"
            >
              <h2 className="transition-transform duration-300 ease-out group-hover:-translate-y-1">
                {anime.title}
              </h2>
            </CardItem>
          </div>

          <CardItem translateZ={30} className="w-full">
            <AnimeBadges
              rating={anime.rating}
              score={anime.score}
              type={anime.type}
            />
          </CardItem>
        </CardBody>
      </CardContainer>
    </article>
  );
};

export default AnimeThreeDItem;
