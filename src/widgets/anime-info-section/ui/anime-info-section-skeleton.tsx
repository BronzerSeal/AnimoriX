import { Skeleton } from "@/shared/ui/skeleton";

const DesktopInfoSectionSkeleton = ({ className }: { className?: string }) => {
  return (
    <section
      className={`hidden h-full min-h-0 w-full self-stretch flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-[#f8fafc] shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-white/8 dark:bg-[#11161a] dark:shadow-none xl:flex ${className}`}
    >
      <div className="relative flex h-[140px] items-center justify-center overflow-hidden rounded-t-2xl bg-slate-200/70 dark:bg-white/6">
        <Skeleton className="h-[120px] w-[90px] rounded-lg bg-white/70 dark:bg-white/10" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-3">
        <Skeleton className="mx-auto h-7 w-3/4 bg-slate-200 dark:bg-white/8" />
        <Skeleton className="mx-auto mt-2 h-4 w-11/12 bg-slate-200 dark:bg-white/8" />
        <div className="mt-3 flex justify-center gap-2">
          <Skeleton className="h-5 w-10 rounded bg-slate-200 dark:bg-white/8" />
          <Skeleton className="h-5 w-12 rounded bg-slate-200 dark:bg-white/8" />
          <Skeleton className="h-5 w-10 rounded bg-slate-200 dark:bg-white/8" />
        </div>
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-full bg-slate-200 dark:bg-white/8" />
          <Skeleton className="h-4 w-full bg-slate-200 dark:bg-white/8" />
          <Skeleton className="h-4 w-5/6 bg-slate-200 dark:bg-white/8" />
        </div>
        <div className="mt-4 space-y-2">
          {Array.from({ length: 8 }, (_, index) => (
            <Skeleton
              key={index}
              className="h-4 w-full bg-slate-200 dark:bg-white/8"
            />
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200/80 bg-slate-100 p-3 dark:border-white/8 dark:bg-[#181d21]">
        <Skeleton className="mx-auto h-5 w-2/3 bg-slate-200 dark:bg-white/8" />
        <Skeleton className="mx-auto mt-2 h-4 w-1/2 bg-slate-200 dark:bg-white/8" />
        <div className="mt-3 flex justify-center gap-1">
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton
              key={index}
              className="h-5 w-5 rounded-full bg-slate-200 dark:bg-white/8"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const MobileInfoSectionSkeleton = ({ className }: { className?: string }) => {
  return (
    <section
      className={`overflow-hidden rounded-2xl border border-slate-200/80 bg-[#f8fafc] shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-white/8 dark:bg-[#11161a] dark:shadow-none xl:hidden md:flex md:min-h-[320px] md:bg-slate-50 dark:md:bg-[#10161d] ${className}`}
    >
      <div className="relative flex h-[160px] items-center justify-center overflow-hidden bg-slate-200/70 dark:bg-white/6 md:h-auto md:w-[160px] md:shrink-0">
        <Skeleton className="h-[146px] w-[104px] rounded-xl bg-white/80 dark:bg-white/10" />
      </div>

      <div className="flex flex-1 flex-col p-3 md:p-5">
        <Skeleton className="h-7 w-3/4 bg-slate-200 dark:bg-white/8" />
        <Skeleton className="mt-2 h-4 w-11/12 bg-slate-200 dark:bg-white/8" />
        <div className="mt-3 flex gap-2">
          <Skeleton className="h-5 w-10 rounded bg-slate-200 dark:bg-white/8" />
          <Skeleton className="h-5 w-12 rounded bg-slate-200 dark:bg-white/8" />
          <Skeleton className="h-5 w-10 rounded bg-slate-200 dark:bg-white/8" />
        </div>
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-full bg-slate-200 dark:bg-white/8" />
          <Skeleton className="h-4 w-full bg-slate-200 dark:bg-white/8" />
          <Skeleton className="h-4 w-5/6 bg-slate-200 dark:bg-white/8" />
        </div>
        <div className="mt-4 grid gap-x-6 gap-y-2 md:grid-cols-2">
          {Array.from({ length: 8 }, (_, index) => (
            <Skeleton
              key={index}
              className="h-4 w-full bg-slate-200 dark:bg-white/8"
            />
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200/80 bg-slate-100 px-4 py-4 dark:border-white/8 dark:bg-[#181d21] md:flex md:w-[220px] md:shrink-0 md:flex-col md:items-center md:justify-center md:border-l md:border-t-0 md:px-5">
        <Skeleton className="mx-auto h-5 w-2/3 bg-slate-200 dark:bg-white/8" />
        <Skeleton className="mx-auto mt-2 h-4 w-1/2 bg-slate-200 dark:bg-white/8" />
        <div className="mt-3 flex justify-center gap-1">
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton
              key={index}
              className="h-6 w-6 rounded-full bg-slate-200 dark:bg-white/8"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const AnimeInfoSectionSkeleton = ({ className }: { className?: string }) => {
  return (
    <>
      <DesktopInfoSectionSkeleton className={className} />
      <MobileInfoSectionSkeleton className={className} />
    </>
  );
};

export default AnimeInfoSectionSkeleton;
