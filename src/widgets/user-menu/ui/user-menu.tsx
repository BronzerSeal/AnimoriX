import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { User } from "lucide-react";
import MenuContent from "./menu-content";

const UserMenu = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="cursor-pointer">
          <div className="sm:hidden">
            <Avatar size="sm">
              <AvatarImage src="#" />
              <AvatarFallback>
                <User className="text-foreground size-3.5" strokeWidth={1.6} />
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="hidden sm:flex">
            <Avatar size="sm" className="ml-2">
              <AvatarImage src="#" />
              <AvatarFallback>
                <User className="text-foreground" strokeWidth={1.5} />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[228px] gap-0 overflow-hidden rounded-[22px] border-0 bg-transparent p-0 shadow-none ring-0"
      >
        <MenuContent />
      </PopoverContent>
    </Popover>
  );
};

export default UserMenu;
