import { Skeleton } from "@/shared/ui/skeleton";
import { AnimesSidebarSkeleton } from "@/widgets/animes-sidebar";

const activityRows = [
  ["w-4", "w-14", "w-20", "w-36"],
  ["w-4", "w-16", "w-[72px]", "w-44"],
  ["w-4", "w-12", "w-24", "w-40"],
  ["w-4", "w-[60px]", "w-[88px]", "w-32"],
  ["w-4", "w-[72px]", "w-16", "w-48"],
  ["w-4", "w-14", "w-20", "w-[136px]"],
];

const ProfilePageSkeleton = () => {
  return (
    <main className="w-full">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(154,132,238,0.18),transparent_32%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.18),transparent_32%)]" />
      <div className="absolute -left-12 top-1/2 size-36 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

      <div className="mx-auto mt-25 w-full max-w-[900px] max-w-425 px-5">
        <section className="overflow-hidden rounded-xl bg-[#efeefe] shadow-[0_20px_60px_rgba(255,255,255,0.95)] backdrop-blur-sm dark:bg-[#11161a] dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <div className="flex min-h-[80px] items-center gap-4 px-5 sm:gap-5 sm:px-6">
            <Skeleton className="size-16 shrink-0 rounded-full bg-white/80 dark:bg-white/10" />

            <div className="min-w-0 flex-1 py-4">
              <Skeleton className="h-[20px] w-40 bg-white/85 dark:bg-white/10 sm:h-[24px] sm:w-56" />
              <Skeleton className="mt-2 h-4 w-40 bg-slate-200/90 dark:bg-white/8 sm:w-52" />
              <Skeleton className="mt-2 h-3 w-24 bg-slate-200/90 dark:bg-white/8 sm:w-28" />
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 pt-5 md:grid-cols-[2fr_1fr]">
          <section className="rounded-2xl">
            <Skeleton className="mx-4 h-7 w-32 bg-slate-200 dark:bg-white/8 sm:mx-5" />

            <div className="space-y-4 px-4 pb-5 pt-6 sm:px-5">
              {activityRows.map((row, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-[12px] leading-tight"
                >
                  {row.map((width, lineIndex) => (
                    <Skeleton
                      key={`${index}-${lineIndex}`}
                      className={`h-3.5 shrink-0 ${width} ${
                        lineIndex === 0
                          ? "rounded-sm bg-emerald-200 dark:bg-emerald-300/25"
                          : "bg-slate-200 dark:bg-white/8"
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </section>

          <section className="relative w-full pt-5 md:pl-5">
            <div className="w-full lg:absolute lg:w-full lg:px-5 lg:-mt-5">
              <div className="sm:hidden">
                <AnimesSidebarSkeleton />
              </div>
              <div className="hidden sm:flex">
                <AnimesSidebarSkeleton />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProfilePageSkeleton;
