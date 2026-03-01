"use client";
import { Button } from "@/shared/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/ui/input";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <div
      style={{ backgroundImage: "url(/images/main-poster-bg.png)" }}
      className="relative w-full max-w-300  flex flex-col items-center justify-center rounded-2xl h-150 bg-cover bg-center p-2"
    >
      {/* black layer */}
      <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>

      <div className="w-full flex flex-col items-center justify-center z-1">
        <h1 className="relative text-white text-5xl font-bold">AnimoriX</h1>
        <InputGroup className="max-w-xl text-white">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
        </InputGroup>

        <Button
          className="w-60 h-15 mt-3 bg-amber-700 hover:bg-amber-700/90"
          size={"lg"}
          onClick={() => console.log("ds")}
        >
          WATCH NOW
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
