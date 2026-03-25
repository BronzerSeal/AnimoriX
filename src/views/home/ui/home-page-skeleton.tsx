import { Skeleton } from "@/shared/ui/skeleton";
import { JoinGithubBannerSkeleton } from "@/widgets/join-github-banner";
import { ShareSiteSkeleton } from "@/widgets/share-site";
import { TopAnimesHeroSkeleton } from "@/widgets/top-animes-hero";
import { TopAnimesSidebarSkeleton } from "@/widgets/top-animes-sidebar";

const HomePageSkeleton = () => {
  return (
    <main className="w-full">
      <div className="relative mx-auto w-full max-w-425">
        <div className="absolute left-5 right-5 top-5 z-50">
          <Skeleton className="h-[62px] w-full rounded-xl" />
        </div>

        <TopAnimesHeroSkeleton />
        <main className="grid grid-cols-1 gap-4 lg:grid-cols-[3fr_1fr] lg:gap-0">
          <section className="relative flex flex-col">
            <div className="w-full px-5 -mt-5 lg:absolute lg:left-0 lg:right-0">
              <ShareSiteSkeleton />
            </div>
            <div className="mt-4 px-5 lg:mt-25">
              <JoinGithubBannerSkeleton />
            </div>
          </section>
          <section className="relative w-full px-5 pt-1 lg:px-0 lg:pr-8">
            <div className="w-full lg:absolute lg:w-full lg:px-5 lg:pr-8 lg:-mt-5">
              <TopAnimesSidebarSkeleton />
            </div>
          </section>
        </main>
      </div>
    </main>
  );
};

export default HomePageSkeleton;
