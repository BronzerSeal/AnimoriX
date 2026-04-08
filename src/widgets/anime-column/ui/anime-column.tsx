"use client";

import { ArrowUpRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimeColumnSkeleton } from "./anime-column-skeleton";
import { anime } from "@/entities/anime/model/types";

type Props = {
  title: string;
  items: anime[];
  isLoading?: boolean;
  href?: string;
};

const AnimeColumn = ({ title, items, isLoading, href = "/recent" }: Props) => {
  if (isLoading) {
    return <AnimeColumnSkeleton />;
  }

  if (!items?.length) {
    return null;
  }

  return (
    <aside className="h-full w-full min-w-0 rounded-[28px] border border-slate-200/80 bg-slate-50 p-3 text-slate-950 shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:p-4 dark:border-white/8 dark:bg-[#0f141a] dark:text-white dark:shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">
          {title}
        </h2>

        {/* <Link
          href={href}
          aria-label="Open recent anime page"
          className="flex size-8 items-center justify-center rounded-md bg-slate-900 text-white transition-transform duration-200 hover:-translate-y-0.5 dark:bg-white dark:text-black"
        >
          <ArrowUpRight className="size-4" strokeWidth={2.5} />
        </Link> */}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-100/80 dark:border-white/6 dark:from-white/[0.06] dark:to-white/[0.02]">
        {items.map((anime) => (
          <Link
            key={anime.id}
            href={`/watch/${anime.id}`}
            className="group flex items-center gap-3 border-b border-slate-200 px-4 py-3 transition-colors duration-200 hover:bg-slate-200/50 last:border-b-0 dark:border-white/6 dark:hover:bg-white/[0.04]"
            title={anime.title}
          >
            <div className="relative size-14 shrink-0 overflow-hidden rounded-full ring-1 ring-slate-300/80 dark:ring-white/10">
              <Image
                src={anime.image}
                alt={anime.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="56px"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-[15px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white">
                {anime.title}
              </h3>

              <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] font-medium text-slate-500 dark:text-white/70">
                <span className="rounded-md border border-slate-300 bg-white/80 px-1.5 py-0.5 leading-none text-slate-600 dark:border-white/20 dark:bg-transparent dark:text-white/75">
                  {anime.rating}
                </span>

                {typeof anime.score === "number" && anime.score > 0 ? (
                  <span className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white/80 px-1.5 py-0.5 leading-none text-slate-600 dark:border-white/16 dark:bg-transparent dark:text-white/75">
                    <Star className="size-3 fill-current" strokeWidth={1.8} />
                    {Math.round(anime.score)}
                  </span>
                ) : null}

                <span className="leading-none text-slate-500 dark:text-white/55">
                  {anime.type}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default AnimeColumn;
