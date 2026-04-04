import { Skeleton } from "@/shared/ui/skeleton";

const skeletonItems = Array.from({ length: 4 }, (_, index) => index);

const AnimeRelationsSkeleton = () => {
  return (
    <div className="flex w-full flex-col rounded-2xl border border-slate-200/80 bg-[#f6f7ff] p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-white/8 dark:bg-[#11161a] dark:shadow-none">
      <Skeleton className="mb-4 h-7 w-28 bg-slate-200 dark:bg-white/8" />

      <div className="flex flex-col gap-2">
        {skeletonItems.map((item) => (
          <div
            key={item}
            className="relative w-full min-w-0 self-auto overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_14px_30px_rgba(15,23,42,0.08)] xl:max-w-[450px] 2xl:max-w-none dark:border-white/8 dark:bg-[#0f1418] dark:shadow-none"
          >
            <div className="absolute inset-y-0 right-0 w-24 border-l border-slate-200/80 dark:border-white/8">
              <Skeleton className="h-full w-full rounded-none bg-slate-200 dark:bg-white/8" />
            </div>

            <div className="relative flex min-h-[88px] items-center gap-4 px-5 py-4 pr-24">
              <div className="min-w-0 flex-1">
                <Skeleton className="h-5 w-3/4 bg-slate-200 dark:bg-white/8" />
                <div className="mt-3 flex items-center gap-2">
                  <Skeleton className="h-6 w-14 rounded-md bg-slate-200 dark:bg-white/8" />
                  <Skeleton className="h-4 w-20 bg-slate-200 dark:bg-white/8" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeRelationsSkeleton;
