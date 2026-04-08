import { Skeleton } from "@/shared/ui/skeleton";

export const EpisodePlayerSkeleton = () => {
  return (
    <>
      <div className="px-2">
        <Skeleton className="aspect-video w-full rounded-2xl bg-slate-200 dark:bg-white/8" />
      </div>

      <div className="flex justify-between gap-4 p-2 text-[14px]">
        <Skeleton className="h-5 w-44 bg-slate-200 dark:bg-white/8" />
        <Skeleton className="h-5 w-28 bg-slate-200 dark:bg-white/8" />
      </div>
    </>
  );
};
