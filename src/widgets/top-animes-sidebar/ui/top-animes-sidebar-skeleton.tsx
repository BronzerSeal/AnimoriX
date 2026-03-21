import { Skeleton } from "@/shared/ui/skeleton";

const TopAnimesSidebarSkeleton = () => {
  return (
    <div className="w-full rounded-md bg-[#EEEEFF] p-4 shadow-md dark:bg-[#11161a]">
      <header className="mb-4">
        <Skeleton className="h-6 w-32" />
      </header>

      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl bg-[#dfe4f3] p-3 dark:bg-[#1a2026]"
          >
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="mt-1 h-0.5 w-6 rounded-full" />
              </div>

              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-4/5" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-4 w-10" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopAnimesSidebarSkeleton;
