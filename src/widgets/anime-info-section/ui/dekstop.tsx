import { FullAnimeByIdItem } from "@/entities/anime/model/types";
import Image from "next/image";
import { formatAiredDate, joinNames } from "../model/helpers";
import { AnimeBadges } from "@/entities/anime";
import Synopsis from "./synopsis";
import { Star } from "lucide-react";

type Props = {
  className?: string;
  animeInfo: FullAnimeByIdItem | null;
};

const Dekstop: React.FC<Props> = ({ className, animeInfo }) => {
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
      className={`hidden h-full min-h-0 w-full self-stretch flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-[#f8fafc] shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-white/8 dark:bg-[#11161a] dark:shadow-none xl:flex ${className}`}
    >
      <header className="relative h-[140px] w-full overflow-hidden rounded-t-2xl">
        <Image
          src={imageUrl}
          alt="anime-bg"
          fill
          className="scale-110 object-cover blur-xl"
          priority
        />

        <div className="absolute inset-0 bg-slate-950/30 dark:bg-black/40" />

        <div className="relative z-10 flex h-full items-center justify-center">
          <Image
            src={imageUrl}
            width={90}
            height={90}
            alt="anime-poster"
            className="rounded-lg shadow-lg"
          />
        </div>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto p-2 text-center text-slate-900 [scrollbar-color:rgba(148,163,184,0.55)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-400/60 [&::-webkit-scrollbar-thumb]:transition-colors [&::-webkit-scrollbar-track]:bg-transparent dark:text-white dark:[&::-webkit-scrollbar-thumb]:bg-white/18">
        <h1 className="font-semibold text-slate-900 dark:text-white">
          {animeInfo.title}
        </h1>
        <p className="text-[12px] text-slate-500 dark:text-white/45">
          {animeInfo.title_synonyms?.map((synonym) => (
            <span key={synonym}>{synonym}</span>
          ))}
        </p>

        <div className="flex justify-center">
          <AnimeBadges
            rating={cleanedRating}
            score={score}
            type={animeInfo.type ?? ""}
          />
        </div>

        <Synopsis text={animeInfo.synopsis ?? ""} />

        <div className="mt-2 px-2 text-left">
          <p className="text-[13px]">
            <span className="text-slate-500 dark:text-white/45">Genres: </span>
            {animeInfo.genres?.map((genre) => (
              <span key={genre.name} className="text-slate-900 dark:text-white">
                {genre.name}{" "}
              </span>
            ))}
          </p>
          <p className="text-[13px]">
            <span className="text-slate-500 dark:text-white/45">Status: </span>
            {animeInfo.status ?? "?"}
          </p>
          <p className="text-[13px]">
            <span className="text-slate-500 dark:text-white/45">
              Episodes:{" "}
            </span>
            {animeInfo.episodes ?? "?"}
          </p>
          <p className="text-[13px]">
            <span className="text-slate-500 dark:text-white/45">Type: </span>
            {animeInfo.type ?? "?"}
          </p>
          <p className="text-[13px]">
            <span className="text-slate-500 dark:text-white/45">Source: </span>
            {animeInfo.source ?? "?"}
          </p>
          <p className="text-[13px]">
            <span className="text-slate-500 dark:text-white/45">
              Premiered:{" "}
            </span>
            {premiered}
          </p>
          <p className="text-[13px]">
            <span className="text-slate-500 dark:text-white/45">
              Date aired:{" "}
            </span>
            {aired}
          </p>
          <p className="text-[13px]">
            <span className="text-slate-500 dark:text-white/45">
              Duration:{" "}
            </span>
            {animeInfo.duration ?? "?"}
          </p>
          <p className="text-[13px]">
            <span className="text-slate-500 dark:text-white/45">Studios: </span>
            {joinNames(animeInfo.studios)}
          </p>
          <p className="text-[13px]">
            <span className="text-slate-500 dark:text-white/45">
              Producers:{" "}
            </span>
            {joinNames(animeInfo.producers)}
          </p>
        </div>
      </main>

      <footer className="rounded-b-2xl border-t border-slate-200/80 bg-[#efeefe] py-2 text-center text-[12px] text-slate-500 dark:border-white/8 dark:bg-[#181d21] dark:text-white/55">
        <h1 className="text-[16px] text-orange-400">
          How&apos;d you rate this anime?
        </h1>
        <p>
          <span className="text-slate-900 dark:text-white">{score || "?"}</span>{" "}
          by {users} users
        </p>
        <div className="mt-2 flex justify-center gap-1 text-[#ff6a3d]">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              className={`h-5 w-5 ${
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

export default Dekstop;
