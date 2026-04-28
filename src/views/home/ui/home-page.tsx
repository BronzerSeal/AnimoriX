import JoinGithubBunner from "@/widgets/join-github-banner";
import LatestEpisodesSection from "@/widgets/latest-episodes-section";
import ShareSite from "@/widgets/share-site";
import TopAnimesHero from "@/widgets/top-animes-hero";
import HomePageColumns from "./home-page-columns";
import TopAnimesSidebar from "./expandable-top-anime-sidebar";
import ExpandableTopAnimesSidebar from "./expandable-top-anime-sidebar";

const HomePage = () => {
  return (
    <main className="w-full">
      <div className="relative mx-auto w-full max-w-425">
        <TopAnimesHero />
        <main className="grid grid-cols-1 gap-4 lg:grid-cols-[3fr_1fr] lg:gap-0">
          <section className="relative flex flex-col">
            <div className="w-full px-5 -mt-5 lg:absolute lg:left-0 lg:right-0">
              <ShareSite />
            </div>
            <div className="mt-4 px-5 lg:mt-25">
              <JoinGithubBunner />
            </div>
            <div className="px-5 mt-3">
              <LatestEpisodesSection />
            </div>
            <div className="mt-8 px-5">
              <HomePageColumns />
            </div>
          </section>
          <section className="relative w-full px-5 pt-1 lg:px-0 lg:pr-8">
            <div className="w-full lg:absolute lg:w-full lg:px-5 lg:pr-8 lg:-mt-5">
              {/* mobile */}
              <div className="sm:hidden">
                <TopAnimesSidebar />
              </div>
              {/* desktop */}
              <div className="hidden sm:flex">
                <ExpandableTopAnimesSidebar />
              </div>
            </div>
          </section>
        </main>
      </div>
    </main>
  );
};

export default HomePage;
