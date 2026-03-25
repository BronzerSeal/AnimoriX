import { Skeleton } from "@/shared/ui/skeleton";

const TopAnimesHeroSkeleton = () => {
  return (
    <section className="flex w-full justify-center">
      <div className="relative mx-auto w-full max-w-425 overflow-hidden">
        <div className="relative h-130 w-full md:h-155">
          <Skeleton className="absolute inset-0 rounded-none" />

          <div className="absolute inset-0 z-10 flex items-end md:items-center">
            <div className="w-full px-6 pb-20 sm:pb-10 md:px-10 md:pb-0">
              <div className="max-w-2xl space-y-5">
                <Skeleton className="h-8 w-3/4 md:h-12 md:w-2/3" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-10" />
                  <Skeleton className="h-5 w-12" />
                  <Skeleton className="h-5 w-28" />
                </div>
                <div className="hidden space-y-2 sm:block">
                  <Skeleton className="h-4 w-full max-w-lg" />
                  <Skeleton className="h-4 w-4/5 max-w-md" />
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Skeleton className="h-12 w-40 rounded-xl" />
                  <Skeleton className="h-12 w-12 rounded-xl" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-black/25 px-3 py-1.5 backdrop-blur-sm sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0 sm:gap-4 sm:px-4 sm:py-2">
            <Skeleton className="h-6 w-6 rounded-md bg-white/20" />
            <Skeleton className="h-4 w-10 bg-white/20" />
            <Skeleton className="h-6 w-6 rounded-md bg-white/20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopAnimesHeroSkeleton;
