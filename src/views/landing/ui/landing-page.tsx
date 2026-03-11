import SocialMediaShare from "@/features/social-media-share";
import AboutUsSection from "@/widgets/about-us-section";
import HeroSection from "@/widgets/hero-section";
import MainPageHeader from "@/widgets/main-page-header";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <MainPageHeader />
      <main className="w-full flex flex-col items-center px-8 mt-10 gap-5 max-w-312.5">
        <HeroSection />
        <SocialMediaShare />
        <AboutUsSection />
      </main>
    </div>
  );
};

export default LandingPage;
