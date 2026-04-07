"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/ui/input";
import { Filter, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/browser?keyword=${value}`);
      setValue("");
    }
  };

  return (
    <div>
      <InputGroup className="max-w-xl text-white hidden md:flex">
        <InputGroupInput
          size={17}
          placeholder="Search..."
          className="text-black dark:text-white"
          onKeyDown={(e) => handleSearch(e)}
          onChange={(e) => handleChange(e)}
          value={value}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Filter />
        </InputGroupAddon>
      </InputGroup>
      <Search className="size-4 text-foreground md:hidden" strokeWidth={2.2} />
    </div>
  );
};
