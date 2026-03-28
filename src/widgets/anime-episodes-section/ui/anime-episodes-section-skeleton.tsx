import { Skeleton } from "@/shared/ui/skeleton";

const AnimeEpisodesSectionSkeleton = () => {
  return (
    <div className="flex w-full max-w-250 flex-col rounded-2xl border border-slate-200/80 bg-[#f6f7ff] p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-white/8 dark:bg-[#11161a] dark:shadow-none">
      <div className="mb-4 flex items-center justify-between gap-3">
        <Skeleton className="h-7 w-24 bg-slate-200 dark:bg-white/8" />
        <Skeleton className="h-9 w-36 rounded-xl bg-slate-200 dark:bg-white/8" />
      </div>

      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 20 }, (_, index) => (
          <Skeleton
            key={index}
            className="size-10 rounded-xl bg-slate-200 dark:bg-white/8"
          />
        ))}
      </div>
    </div>
  );
};

export default AnimeEpisodesSectionSkeleton;
