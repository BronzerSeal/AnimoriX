"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const LargeSearchInput = () => {
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
    <InputGroup className="max-w-xl text-white">
      <InputGroupInput
        placeholder="Search..."
        onKeyDown={(e) => handleSearch(e)}
        onChange={(e) => handleChange(e)}
        value={value}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
    </InputGroup>
  );
};
