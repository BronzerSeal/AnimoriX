import JoinGithubBunner from "@/widgets/join-github-banner";
import MainHeader from "@/widgets/main-header";
import ShareSite from "@/widgets/share-site";
import TopAnimesHero from "@/widgets/top-animes-hero";

const HomePage = () => {
  return (
    <main className="w-full">
      <div className="relative mx-auto w-full max-w-425 ">
        <div className="absolute left-5 right-5 top-5 z-50">
          <MainHeader />
        </div>

        <TopAnimesHero />
        <main className=" flex flex-col">
          <div className="absolute w-full px-5 -mt-5">
            <ShareSite />
          </div>
          <div className="mt-25 px-5">
            <JoinGithubBunner />
          </div>
        </main>
      </div>
    </main>
  );
};

export default HomePage;
