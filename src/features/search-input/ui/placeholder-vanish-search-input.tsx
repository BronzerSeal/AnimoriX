"use client";

import { GooeyInput, PlaceholdersAndVanishInput } from "@/shared/ui/aceternity";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const PlaceholderVanishSearchInput = () => {
  const router = useRouter();

  const placeholders = ["Search...", "Animeee...", ";)"];

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = () => {};

  const handleSearch = (value: string) => {
    router.push(`/browser?keyword=${value}`);
  };
  return (
    <>
      <div className="max-w-[230px] hidden md:flex">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={handleSearch}
          className="max-w-xl"
        />
      </div>
      <div className="md:hidden">
        <Search
          className="size-4 text-foreground md:hidden"
          strokeWidth={2.2}
        />
        {/* <GooeyInput placeholder="search" /> */}
      </div>
    </>
  );
};

export default PlaceholderVanishSearchInput;
