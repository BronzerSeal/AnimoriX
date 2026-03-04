import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/shared/ui/input";
import { Search, Filter } from "lucide-react";

const SearchInputSection = () => {
  return (
    <div>
      <InputGroup className="max-w-xl text-white hidden md:flex">
        <InputGroupInput size={17} placeholder="Search..." />
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

export default SearchInputSection;
