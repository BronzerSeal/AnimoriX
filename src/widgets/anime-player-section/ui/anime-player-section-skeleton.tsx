import { Skeleton } from "@/shared/ui/skeleton";
import SeasonsSkeleton from "./seasons-skeleton";

const AnimePlayerSectionSkeleton = () => {
  return (
    <div className="flex w-full max-w-242.5 flex-col rounded-2xl border border-slate-200/80 bg-[#f6f7ff] py-2 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-white/8 dark:bg-[#11161a] dark:shadow-none">
      <div className="flex items-center gap-2 px-7 py-2">
        <Skeleton className="h-4 w-12 bg-slate-200 dark:bg-white/8" />
        <Skeleton className="h-4 w-3 bg-slate-200 dark:bg-white/8" />
        <Skeleton className="h-4 w-16 bg-slate-200 dark:bg-white/8" />
        <Skeleton className="h-4 w-3 bg-slate-200 dark:bg-white/8" />
        <Skeleton className="h-4 w-32 bg-slate-200 dark:bg-white/8" />
      </div>

      <div className="px-2">
        <Skeleton className="aspect-video w-full rounded-2xl bg-slate-200 dark:bg-white/8" />
      </div>

      <div className="flex justify-between gap-4 p-2 text-[14px]">
        <Skeleton className="h-5 w-44 bg-slate-200 dark:bg-white/8" />
        <Skeleton className="h-5 w-28 bg-slate-200 dark:bg-white/8" />
      </div>

      <section className="p-2">
        <SeasonsSkeleton />
      </section>
    </div>
  );
};

export default AnimePlayerSectionSkeleton;
