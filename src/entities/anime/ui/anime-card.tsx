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
      <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(255,255,255,0),_rgba(129,140,248,0.08)_68%,_rgba(125,211,252,0.2)_100%)] opacity-90 transition-opacity duration-300 group-hover:opacity-100 dark:bg-[linear-gradient(90deg,_rgba(15,23,42,0),_rgba(99,102,241,0.08)_70%,_rgba(56,189,248,0.2)_100%)] dark:opacity-70" />
      {image ? (
        <img
          src={image}
          alt={title}
          className="absolute inset-y-0 right-0 w-24 overflow-hidden border-l border-slate-200/80 object-cover dark:border-white/8"
        />
      ) : (
        <div className="absolute inset-y-0 right-0 w-24 overflow-hidden border-l border-slate-200/80 bg-[radial-gradient(circle_at_30%_20%,_rgba(99,102,241,0.2),_transparent_45%),linear-gradient(135deg,_rgba(226,232,240,0.9),_rgba(186,230,253,0.85))] dark:border-white/8 dark:bg-[radial-gradient(circle_at_30%_20%,_rgba(99,102,241,0.8),_transparent_45%),linear-gradient(135deg,_rgba(51,65,85,0.4),_rgba(2,6,23,0.95))]">
          <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-[#0f172a] dark:via-[#0f172a]/80" />
          <div className="absolute right-3 top-3 h-8 w-8 rounded-full border border-cyan-400/35 bg-cyan-400/20 blur-[1px] dark:border-cyan-300/40 dark:bg-cyan-300/15" />
          <div className="absolute bottom-2 right-4 h-12 w-12 rounded-full border border-indigo-400/25 bg-indigo-400/15 dark:border-indigo-300/30 dark:bg-indigo-300/10" />
        </div>
      )}

      <div className="relative flex min-h-[88px] items-center gap-4 px-5 py-4 pr-24">
        <div className="min-w-0 flex-1">
          <HoverCard openDelay={100} closeDelay={200}>
            <HoverCardTrigger asChild>
              <h2 className="truncate text-[1.05rem] font-semibold text-slate-900 dark:text-white">
                {title}
              </h2>
            </HoverCardTrigger>

            <HoverCardContent side="top" align="start">
              <div className="font-semibold">{title}</div>
            </HoverCardContent>
          </HoverCard>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-semibold">
            {type && (
              <span className="rounded-md border border-orange-400/60 bg-orange-400/10 px-2 py-1 leading-none text-orange-700 dark:border-orange-500/60 dark:bg-orange-500/12 dark:text-orange-300">
                {type}
              </span>
            )}
            {relationLabel && (
              <span className="text-sm font-bold leading-none text-slate-600 dark:text-white/90">
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
        "group relative w-full min-w-0 self-auto overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_14px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300/70 hover:shadow-[0_18px_36px_rgba(99,102,241,0.16)] xl:max-w-[450px] 2xl:max-w-none dark:border-slate-800/80 dark:bg-[#11161a] dark:shadow-[0_14px_30px_rgba(15,23,42,0.24)] dark:hover:border-indigo-400/45 dark:hover:shadow-[0_18px_36px_rgba(79,70,229,0.24)]",
        animeInfo.url && "cursor-pointer",
      )}
    >
      {animeInfo.url ? (
        <Link href={`/watch/${animeInfo.mal_id}`} className="block w-full">
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </div>
  );
};
