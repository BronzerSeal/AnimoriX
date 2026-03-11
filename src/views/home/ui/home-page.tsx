import MainHeader from "@/widgets/main-header";
import TopAnimesHero from "@/widgets/top-animes-hero";

const HomePage = () => {
  return (
    <main className="w-full">
      <div className="relative mx-auto w-full max-w-425 ">
        <div className="absolute left-5 right-5 top-5 z-50">
          <MainHeader />
        </div>

        <TopAnimesHero />
      </div>
    </main>
  );
};

export default HomePage;
