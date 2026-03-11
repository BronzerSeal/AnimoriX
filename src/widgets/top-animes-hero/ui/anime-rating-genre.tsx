import { HeroAnime } from "@/entities/anime/model/types";
import { Star } from "lucide-react";
const AnimeRatingGenre = ({ anime }: { anime: HeroAnime }) => {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-black dark:text-white/90">
      <span className="rounded-md border border-orange-500 px-2 py-1 text-orange-400">
        {anime.rating || "N/A"}
      </span>

      <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500 px-2 py-1 text-emerald-400">
        <Star className="h-3.5 w-3.5" />
        {anime.score || "N/A"}
      </span>

      <span>{anime.type}</span>

      {anime.genres?.slice(0, 3).map((genre) => (
        <span key={genre} className="text-black dark:text-white">
          {genre}
        </span>
      ))}
    </div>
  );
};

export default AnimeRatingGenre;
