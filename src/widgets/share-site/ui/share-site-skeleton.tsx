import { Skeleton } from "@/shared/ui/skeleton";

const ShareSiteSkeleton = () => {
  return (
    <div className="flex w-full flex-col items-center justify-between gap-3 rounded-md bg-[#EEEEFF] p-5 md:flex-row md:gap-0 dark:bg-[#11161a]">
      <div className="flex items-center justify-center gap-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-3 w-40" />
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <div className="space-y-1 leading-none">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-3 w-10" />
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-9 w-16 rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShareSiteSkeleton;
