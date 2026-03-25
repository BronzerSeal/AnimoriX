import { Skeleton } from "@/shared/ui/skeleton";

const JoinGithubBannerSkeleton = () => {
  return (
    <div className="flex w-full items-center gap-2 rounded-md bg-[#e0e0fa] p-3 dark:bg-[#d8f5e1]">
      <Skeleton className="h-[18px] w-[18px] rounded-full bg-blue-300/60 dark:bg-green-300/70" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-5/6 bg-blue-300/60 dark:bg-green-300/70" />
        <Skeleton className="h-4 w-3/5 bg-blue-300/60 dark:bg-green-300/70" />
      </div>
    </div>
  );
};

export default JoinGithubBannerSkeleton;
