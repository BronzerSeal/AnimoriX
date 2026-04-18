"use client";

import { PlaceholdersAndVanishInput } from "@/shared/ui/aceternity";
import { useRouter } from "next/navigation";
import MobileSearchInput from "./mobile-search-input";

const PlaceholderVanishSearchInput = () => {
  const router = useRouter();

  const placeholders = ["Search...", "Animeee...", ";)"];

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = () => {};

  const handleSearch = (value: string) => {
    router.push(`/browser?keyword=${value}`);
  };
  return (
    <>
      <div className="max-w-57.5 hidden md:flex">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={handleSearch}
          className="max-w-xl"
        />
      </div>
      <div className="md:hidden">
        <MobileSearchInput />
      </div>
    </>
  );
};

export default PlaceholderVanishSearchInput;
