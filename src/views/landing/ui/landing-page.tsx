import SocialMediaShare from "@/features/social-media-share";
import { BackgroundRippleEffect } from "@/shared/ui/aceternity";
import AboutUsSection from "@/widgets/about-us-section";
import HeroSection from "@/widgets/hero-section";
import MainPageHeader from "@/widgets/main-page-header";

const LandingPage = () => {
  return (
    <div className="relative isolate min-h-screen overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 -z-10">
        <BackgroundRippleEffect rows={30} cols={36} cellSize={64} />
      </div>
      {/* из-за отступов у footer */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-50/80 via-transparent to-zinc-50 dark:from-[#0b1215]/90 dark:via-transparent dark:to-[#0b1215]" />

      <MainPageHeader />
      <main className="relative z-10 w-full flex flex-col items-center px-8 mt-10 gap-5 max-w-312.5">
        <HeroSection />
        <SocialMediaShare />
        <AboutUsSection />
      </main>
    </div>
  );
};

export default LandingPage;
