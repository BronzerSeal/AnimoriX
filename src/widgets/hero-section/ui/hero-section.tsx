"use client";
import { LargeSearchInput } from "@/features/search-input";
import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  return (
    <div
      style={{ backgroundImage: "url(/images/main-poster-bg.png)" }}
      className="relative w-full max-w-300  flex flex-col items-center justify-center rounded-2xl h-150 bg-cover bg-center p-2"
    >
      {/* black layer */}
      <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>

      <div className="w-full flex flex-col items-center justify-center z-1">
        <h1 className="relative text-white text-5xl font-bold">AnimoriX</h1>
        <LargeSearchInput />

        <Button
          className="w-60 h-15 mt-3 bg-amber-600 hover:bg-amber-600/90"
          size={"lg"}
          onClick={() => router.push("/home")}
        >
          WATCH NOW
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
