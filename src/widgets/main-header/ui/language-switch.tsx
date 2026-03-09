"use client";

import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle";

const LanguageSwitch = () => {
  return (
    <ToggleGroup type="single" defaultValue="en" className="bg-muted ">
      <ToggleGroupItem
        value="en"
        className=" px-3 data-[state=on]:bg-orange-500"
      >
        en
      </ToggleGroupItem>

      <ToggleGroupItem
        value="ru"
        className=" px-3 data-[state=on]:bg-orange-500 data-[state=on]:text-white"
      >
        ru
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default LanguageSwitch;
