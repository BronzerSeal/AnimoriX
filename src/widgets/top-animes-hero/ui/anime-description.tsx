import { HeroAnime } from "@/entities/anime/model/types";

const AnimeDescription = ({ anime }: { anime: HeroAnime }) => {
  return (
    <>
      <p className="line-clamp-3 max-w-xl text-sm leading-7 text-black dark:text-white/80 md:text-base">
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
          <p className="mt-1 text-lg font-semibold text-white">{anime.year}</p>
        </div>

        <div>
          <p className="text-xs text-white/50">Score</p>
          <p className="mt-1 text-lg font-semibold text-white">{anime.score}</p>
        </div>
      </div>
    </>
  );
};

export default AnimeDescription;
