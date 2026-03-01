import HeroSection from "@/widgets/hero-section";
import MainPageHeader from "@/widgets/main-page-header";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-zinc-50 font-sans dark:bg-[#0b1215]">
      <MainPageHeader />
      <main className="w-full flex flex-col items-center px-8 mt-10">
        <HeroSection />
        <div>here will be body</div>
      </main>
    </div>
  );
};

export default HomePage;
