import MainHeader from "@/widgets/main-header";
import TopAnimesHero from "@/widgets/top-animes-hero";

const HomePage = () => {
  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-[1700px] px-5 pt-5">
        <MainHeader />
        <div className="mt-4">
          <TopAnimesHero />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
