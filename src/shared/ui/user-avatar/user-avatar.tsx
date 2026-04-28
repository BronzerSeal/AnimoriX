import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { User } from "lucide-react";
const UserAvatar = () => {
  return (
    <>
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
    </>
  );
};

export default UserAvatar;
