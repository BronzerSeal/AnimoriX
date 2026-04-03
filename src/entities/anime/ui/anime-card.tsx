import Link from "next/link";
import { FC } from "react";

import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/ui/hover-card";

interface AnimeCard {
  relation?: string | undefined;
  mal_id?: number | undefined;
  type?: string | undefined;
  name?: string | undefined;
  title?: string | undefined;
  url?: string | undefined;
  images?:
    | {
        jpg?:
          | {
              image_url?: string | null | undefined;
              small_image_url?: string | null | undefined;
              large_image_url?: string | null | undefined;
            }
          | undefined;
        webp?:
          | {
              image_url?: string | null | undefined;
              small_image_url?: string | null | undefined;
              large_image_url?: string | null | undefined;
            }
          | undefined;
      }
    | undefined;
}

interface AnimeCardProps {
  animeInfo: AnimeCard;
}

export const AnimeCard: FC<AnimeCardProps> = ({ animeInfo }) => {
  const relationLabel = animeInfo.relation;
  const title = animeInfo.name || animeInfo.title || "Unknown title";
  const type = animeInfo.type || null;
  const image =
    animeInfo?.images?.jpg?.image_url ||
    animeInfo?.images?.jpg?.large_image_url ||
    animeInfo?.images?.jpg?.small_image_url ||
    null;

  const cardContent = (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(15,23,42,0),_rgba(99,102,241,0.08)_70%,_rgba(56,189,248,0.2)_100%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
      {image ? (
        <img
          src={image}
          alt={title}
          className="absolute inset-y-0 right-0 w-24 overflow-hidden border-l"
        />
      ) : (
        <div className="absolute inset-y-0 right-0 w-24 overflow-hidden border-l border-white/8 bg-[radial-gradient(circle_at_30%_20%,_rgba(99,102,241,0.65),_transparent_45%),linear-gradient(135deg,_rgba(30,41,59,0.2),_rgba(15,23,42,0.9))] dark:bg-[radial-gradient(circle_at_30%_20%,_rgba(99,102,241,0.8),_transparent_45%),linear-gradient(135deg,_rgba(51,65,85,0.4),_rgba(2,6,23,0.95))]">
          <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent" />
          <div className="absolute right-3 top-3 h-8 w-8 rounded-full border border-cyan-300/40 bg-cyan-300/15 blur-[1px]" />
          <div className="absolute bottom-2 right-4 h-12 w-12 rounded-full border border-indigo-300/30 bg-indigo-300/10" />
        </div>
      )}

      <div className="relative flex min-h-[88px] items-center gap-4 px-5 py-4 pr-24">
        <div className="min-w-0 flex-1">
          <HoverCard openDelay={100} closeDelay={200}>
            <HoverCardTrigger asChild>
              <h2 className="truncate text-[1.05rem] font-semibold">{title}</h2>
            </HoverCardTrigger>

            <HoverCardContent side="top" align="start">
              <div className="font-semibold">{title}</div>
            </HoverCardContent>
          </HoverCard>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-semibold">
            {type && (
              <span className="rounded-md border border-orange-500/60 bg-orange-500/12 px-2 py-1 leading-none text-orange-300">
                {type}
              </span>
            )}
            {relationLabel && (
              <span className="text-sm font-bold leading-none text-white/90">
                {relationLabel}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div
      className={cn(
        "group relative min-w-[250px] max-w-[450px] self-start overflow-hidden rounded-2xl border border-slate-800/80 bg-[#11161a] shadow-[0_14px_30px_rgba(15,23,42,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-400/45 hover:shadow-[0_18px_36px_rgba(79,70,229,0.24)] md:w-[300px] md:min-w-[300px] md:max-w-[300px] 2xl:w-full 2xl:min-w-0 2xl:max-w-none 2xl:self-auto",
        animeInfo.url && "cursor-pointer",
      )}
    >
      {animeInfo.url ? (
        <Link href={`/watch/${animeInfo.mal_id}`} className="block">
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </div>
  );
};
