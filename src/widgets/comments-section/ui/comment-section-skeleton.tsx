import { Skeleton } from "@/shared/ui/skeleton";

const skeletonWidths = ["w-28", "w-20", "w-full", "w-11/12", "w-16"];

export const CommentSectionSkeleton = () => {
  return (
    <section className="w-full">
      <Skeleton className="mb-4 h-7 w-32 bg-slate-200 dark:bg-white/8" />
      <div className="space-y-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex w-full items-start space-x-4">
            <Skeleton className="h-10 w-10 shrink-0 rounded-full bg-slate-200 dark:bg-white/8" />
            <div className="flex-1 space-y-2">
              {skeletonWidths.map((widthClass, lineIndex) => (
                <Skeleton
                  key={`${index}-${lineIndex}`}
                  className={`h-4 ${widthClass} bg-slate-200 dark:bg-white/8`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
