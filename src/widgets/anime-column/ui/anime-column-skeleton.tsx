import { Skeleton } from "@/shared/ui/skeleton";

export const AnimeColumnSkeleton = () => {
  const ITEMS_LIMIT = 6;
  return (
    <div className="h-full w-full min-w-0 rounded-[28px] border border-slate-200/80 bg-slate-50 p-3 sm:p-4 dark:border-white/8 dark:bg-[#0f141a]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <Skeleton className="h-7 w-40 rounded-lg bg-slate-200 dark:bg-white/8" />
        <Skeleton className="size-8 rounded-md bg-slate-200 dark:bg-white/8" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/80 dark:border-white/6 dark:bg-[#12181f]">
        {Array.from({ length: ITEMS_LIMIT }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 border-b border-slate-200 px-4 py-3 last:border-b-0 dark:border-white/6"
          >
            <Skeleton className="size-14 shrink-0 rounded-full bg-slate-200 dark:bg-white/8" />
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-4/5 rounded-md bg-slate-200 dark:bg-white/8" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-10 rounded-md bg-slate-200 dark:bg-white/8" />
                <Skeleton className="h-5 w-8 rounded-md bg-slate-200 dark:bg-white/8" />
                <Skeleton className="h-5 w-7 rounded-md bg-slate-200 dark:bg-white/8" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
