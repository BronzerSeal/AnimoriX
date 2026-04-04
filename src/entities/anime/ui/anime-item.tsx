import Image from "next/image";
import { anime } from "../model/types";
import { AnimeBadges } from "./anime-badges";
import { useRouter } from "next/navigation";

export const AnimeItem = ({ anime }: { anime: anime }) => {
  const router = useRouter();
  return (
    <article
      onClick={() => router.push(`/watch/${anime.id}`)}
      className="group basis-[calc((100%-1rem)/2)] md:basis-[calc((100%-5rem)/6)]"
    >
      <div className="flex flex-col">
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl">
          <Image
            className="object-cover transition-transform duration-300 ease-out group-hover:-translate-y-[6px]"
            src={anime.image}
            alt={anime.title}
            fill
            sizes="(max-width: 639px) 50vw, (max-width: 767px) 190px, (max-width: 1023px) 220px, 250px"
          />
        </div>
        <h2 className="mt-2 text-sm font-semibold leading-tight line-clamp-2 transition-transform duration-300 ease-out group-hover:-translate-y-1">
          {anime.title}
        </h2>
      </div>
      <AnimeBadges
        rating={anime.rating}
        score={anime.score}
        type={anime.type}
      />
    </article>
  );
};
