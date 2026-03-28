import { Skeleton } from "@/shared/ui/skeleton";

const SeasonsSkeleton = () => {
  const itemBasisClass =
    "basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-1/7";
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-24 bg-slate-200 dark:bg-white/8" />
        <div className="flex gap-2">
          <Skeleton className="size-7 rounded-full bg-slate-200 dark:bg-white/8" />
          <Skeleton className="size-7 rounded-full bg-slate-200 dark:bg-white/8" />
        </div>
      </div>

      <div className="flex -ml-3">
        {Array.from({ length: 7 }, (_, index) => (
          <div key={index} className={`${itemBasisClass} min-w-0 pl-3`}>
            <Skeleton className="h-24 w-full rounded-2xl bg-slate-200 dark:bg-white/8" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonsSkeleton;
