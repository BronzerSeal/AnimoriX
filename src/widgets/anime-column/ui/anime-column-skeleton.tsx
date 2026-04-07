import { Skeleton } from "@/shared/ui/skeleton";

export const AnimeColumnSkeleton = () => {
  const ITEMS_LIMIT = 6;
  return (
    <div className="h-full w-full min-w-0 rounded-[28px] border border-white/8 bg-[#0f141a] p-3 sm:p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <Skeleton className="h-7 w-40 rounded-lg bg-white/8" />
        <Skeleton className="size-8 rounded-md bg-white/8" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/6 bg-[#12181f]">
        {Array.from({ length: ITEMS_LIMIT }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 border-b border-white/6 px-4 py-3 last:border-b-0"
          >
            <Skeleton className="size-14 shrink-0 rounded-full bg-white/8" />
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-4/5 rounded-md bg-white/8" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-10 rounded-md bg-white/8" />
                <Skeleton className="h-5 w-8 rounded-md bg-white/8" />
                <Skeleton className="h-5 w-7 rounded-md bg-white/8" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
