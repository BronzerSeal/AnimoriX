import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SeasonCardProps } from "../model/types";

const Season = ({
  id,
  title,
  episodes,
  poster,
  isActive = false,
}: SeasonCardProps) => {
  return (
    <Link
      href={`/watch/${id}`}
      className={cn(
        "group relative block h-24  overflow-hidden rounded-2xl border transition-all duration-300",
        isActive
          ? "border-indigo-300 ring-1 ring-indigo-200 dark:border-white/35 dark:ring-white/30"
          : "border-slate-200 hover:border-slate-300 dark:border-white/8 dark:hover:border-white/20",
      )}
    >
      {poster ? (
        <Image
          src={poster}
          alt={title}
          fill
          sizes="176px"
          className="object-cover transition-transform duration-500 group-hover:scale-105 blur-[2px]"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900" />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/50 to-slate-950/65 dark:from-black/65 dark:via-black/45 dark:to-black/60" />
      <div className="absolute inset-0 bg-white/6 dark:bg-black/18" />

      <div className="relative z-10 flex h-full flex-col justify-between p-3">
        <h3 className="line-clamp-2 max-w-28 text-sm font-semibold leading-tight text-white">
          {title}
        </h3>

        <div className="w-fit rounded-full bg-white/90 px-2 py-1 text-[11px] font-medium leading-none text-slate-900 shadow-sm">
          {episodes > 0 ? episodes : "?"} Eps
        </div>
      </div>
    </Link>
  );
};

export default Season;
