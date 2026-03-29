import { FullAnimeByIdItem } from "@/entities/anime/model/types";
import { formatAiredDate, joinNames } from "../model/helpers";
import Image from "next/image";
import { AnimeBadges } from "@/entities/anime";
import { Star } from "lucide-react";
import Synopsis from "./synopsis";

type Props = {
  className?: string;
  animeInfo: FullAnimeByIdItem | null;
};

const Mobile: React.FC<Props> = ({ className, animeInfo }) => {
  if (!animeInfo) return null;

  const imageUrl =
    animeInfo.images?.webp?.large_image_url ||
    animeInfo.images?.jpg?.large_image_url ||
    animeInfo.images?.webp?.image_url ||
    animeInfo.images?.jpg?.image_url ||
    "";

  const premiered = animeInfo.season
    ? `${animeInfo.season[0].toUpperCase()}${animeInfo.season.slice(1)} ${animeInfo.year ?? ""}`.trim()
    : animeInfo.year?.toString() || "?";

  const aired = `${formatAiredDate(animeInfo.aired?.from)} to ${formatAiredDate(animeInfo.aired?.to)}`;
  const score = animeInfo.score ?? 0;
  const users = animeInfo.scored_by ?? 0;
  const filledStars = Math.max(0, Math.min(5, Math.round(score / 2)));
  const cleanedRating =
    animeInfo.rating
      ?.toString()
      .match(/^[^(]+/)?.[0]
      .trim() ?? "";

  return (
    <section
      className={`overflow-hidden rounded-2xl border border-slate-200/80 bg-[#f8fafc] shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-white/8 dark:bg-[#11161a] dark:shadow-none xl:hidden md:flex md:min-h-[320px] md:bg-slate-50 dark:md:bg-[#10161d] ${className}`}
    >
      <header className="relative h-[160px] overflow-hidden md:h-auto md:w-[160px] md:shrink-0">
        <Image
          src={imageUrl}
          alt="anime-bg"
          fill
          className="scale-110 object-cover blur-xl"
          priority
        />
        <div className="absolute inset-0 bg-slate-950/30 dark:bg-black/40" />

        <div className="absolute inset-0 hidden md:block md:bg-[linear-gradient(180deg,_rgba(248,250,252,0.18),_rgba(226,232,240,0.34))] dark:md:bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.18),_transparent_38%),linear-gradient(180deg,_rgba(17,22,26,0.08),_rgba(17,22,26,0.2))]" />

        <div className="relative z-10 flex h-full items-center justify-center bg-transparent">
          <div className="overflow-hidden rounded-xl border border-slate-200/90 shadow-lg dark:border-white/10">
            <Image
              src={imageUrl}
              width={104}
              height={146}
              alt="anime-poster"
              className="h-[146px] w-[104px] object-cover"
            />
          </div>
        </div>
      </header>

      <main className="min-h-0 flex-1 p-3 text-center text-slate-900 md:overflow-y-auto md:p-5 md:text-left md:[scrollbar-color:rgba(148,163,184,0.55)_transparent] md:[scrollbar-width:thin] md:[&::-webkit-scrollbar]:w-1.5 md:[&::-webkit-scrollbar-thumb]:rounded-full md:[&::-webkit-scrollbar-thumb]:bg-slate-400/60 md:[&::-webkit-scrollbar-track]:bg-transparent dark:text-white dark:md:[&::-webkit-scrollbar-thumb]:bg-white/18">
        <h1 className="text-lg font-bold text-slate-900 dark:text-white md:text-[18px]">
          {animeInfo.title}
        </h1>
        <p className="mt-1 text-[12px] text-gray-500 dark:text-white/45">
          {animeInfo.title_synonyms?.join(", ")}
        </p>

        <div className="mt-2 flex justify-center md:justify-start">
          <AnimeBadges
            rating={cleanedRating}
            score={score}
            type={animeInfo.type ?? ""}
          />
        </div>

        <div className="mt-3">
          <Synopsis text={animeInfo.synopsis ?? ""} />
        </div>

        <div className="mt-4 grid gap-x-6 gap-y-1 text-left md:grid-cols-2">
          <p className="text-[13px]">
            <span className="text-gray-500 dark:text-white/45">Genres: </span>
            <span className="text-slate-900 dark:text-white">
              {joinNames(animeInfo.genres)}
            </span>
          </p>
          <p className="text-[13px]">
            <span className="text-gray-500 dark:text-white/45">Status: </span>
            <span className="text-slate-900 dark:text-white">
              {animeInfo.status ?? "?"}
            </span>
          </p>
          <p className="text-[13px]">
            <span className="text-gray-500 dark:text-white/45">
              Premiered:{" "}
            </span>
            <span className="text-slate-900 dark:text-white">{premiered}</span>
          </p>
          <p className="text-[13px]">
            <span className="text-gray-500 dark:text-white/45">MAL: </span>
            <span className="text-slate-900 dark:text-white">
              {score || "?"} by {users} users
            </span>
          </p>
          <p className="text-[13px]">
            <span className="text-gray-500 dark:text-white/45">
              Date aired:{" "}
            </span>
            <span className="text-slate-900 dark:text-white">{aired}</span>
          </p>
          <p className="text-[13px]">
            <span className="text-gray-500 dark:text-white/45">Studios: </span>
            <span className="text-slate-900 dark:text-white">
              {joinNames(animeInfo.studios)}
            </span>
          </p>
          <p className="text-[13px]">
            <span className="text-gray-500 dark:text-white/45">Episodes: </span>
            <span className="text-slate-900 dark:text-white">
              {animeInfo.episodes ?? "?"}
            </span>
          </p>
          <p className="text-[13px]">
            <span className="text-gray-500 dark:text-white/45">
              Producers:{" "}
            </span>
            <span className="text-slate-900 dark:text-white">
              {joinNames(animeInfo.producers)}
            </span>
          </p>
          <p className="text-[13px]">
            <span className="text-gray-500 dark:text-white/45">Duration: </span>
            <span className="text-slate-900 dark:text-white">
              {animeInfo.duration ?? "?"}
            </span>
          </p>
        </div>
      </main>

      <footer className="border-t border-slate-200/80 bg-[#efeefe] px-4 py-4 text-center text-[12px] text-slate-500 dark:border-white/8 dark:bg-[#181d21] dark:text-white/55 md:flex md:w-[220px] md:shrink-0 md:flex-col md:items-center md:justify-center md:border-l md:border-t-0 md:px-5">
        <h1 className="text-[16px] font-semibold text-orange-400">
          How&apos;d you rate this anime?
        </h1>
        <p className="mt-1">
          <span className="text-slate-900 dark:text-white">{score || "?"}</span>{" "}
          by {users} users
        </p>
        <div className="mt-3 flex justify-center gap-1 text-[#ff6a3d]">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              className={`h-6 w-6 ${
                index < filledStars
                  ? "fill-current"
                  : "text-slate-300 dark:text-white/18"
              }`}
            />
          ))}
        </div>
      </footer>
    </section>
  );
};

export default Mobile;
