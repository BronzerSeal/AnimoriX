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
    <aside className="h-full w-full min-w-0 rounded-[28px] border border-white/8 bg-[#0f141a] p-3 text-white shadow-[0_18px_60px_rgba(0,0,0,0.24)] sm:p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold tracking-[-0.03em] text-white">
          {title}
        </h2>

        {/* <Link
          href={href}
          aria-label="Open recent anime page"
          className="flex size-8 items-center justify-center rounded-md bg-white text-black transition-transform duration-200 hover:-translate-y-0.5"
        >
          <ArrowUpRight className="size-4" strokeWidth={2.5} />
        </Link> */}
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/6 bg-gradient-to-b from-white/[0.06] to-white/[0.02]">
        {items.map((anime) => (
          <Link
            key={anime.id}
            href={`/watch/${anime.id}`}
            className="group flex items-center gap-3 border-b border-white/6 px-4 py-3 transition-colors duration-200 hover:bg-white/[0.04] last:border-b-0"
            title={anime.title}
          >
            <div className="relative size-14 shrink-0 overflow-hidden rounded-full ring-1 ring-white/10">
              <Image
                src={anime.image}
                alt={anime.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="56px"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-[15px] font-semibold tracking-[-0.02em] text-white">
                {anime.title}
              </h3>

              <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] font-medium text-white/70">
                <span className="rounded-md border border-white/20 px-1.5 py-0.5 leading-none text-white/75">
                  {anime.rating}
                </span>

                {typeof anime.score === "number" && anime.score > 0 ? (
                  <span className="inline-flex items-center gap-1 rounded-md border border-white/16 px-1.5 py-0.5 leading-none text-white/75">
                    <Star className="size-3 fill-current" strokeWidth={1.8} />
                    {Math.round(anime.score)}
                  </span>
                ) : null}

                <span className="leading-none text-white/55">{anime.type}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default AnimeColumn;
