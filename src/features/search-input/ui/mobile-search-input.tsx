"use client";

import { PlaceholdersAndVanishInput } from "@/shared/ui/aceternity";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const MobileSearchInput = () => {
  const router = useRouter();

  const placeholders = ["Search...", "Animeee...", ";)"];

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = () => {};

  const handleSearch = (value: string) => {
    router.push(`/browser?keyword=${value}`);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Search
          className="size-4 text-foreground md:hidden"
          strokeWidth={2.2}
        />
      </PopoverTrigger>
      <PopoverContent className="w-50 p-2" align="end">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={handleSearch}
          className="max-w-xl"
        />
      </PopoverContent>
    </Popover>
  );
};

export default MobileSearchInput;
