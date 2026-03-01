import { navTopics } from "@/shared/constants/navigation";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenu,
} from "@/shared/ui/dropdown-menu";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/shared/ui/navigation-menu";
import { Menu } from "lucide-react";
import Link from "next/link";

const MultiDropdownBtn = ({
  variant = "button",
}: {
  variant?: "button" | "navigation";
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {variant === "button" ? (
          <Button variant="outline">
            <Menu />
          </Button>
        ) : (
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Menu className="size-4 text-foreground" strokeWidth={2.2} />
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {navTopics.map((topic) => {
            const hasDopTopics = topic.type === "with-genres";

            return hasDopTopics ? (
              <DropdownMenuSub key={topic.title}>
                <DropdownMenuSubTrigger>{topic.title}</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="w-[90vw] max-w-[320px] max-h-[70vh] overflow-y-auto grid grid-cols-1 sm:grid-cols-2">
                    {topic.genres.map((genre) => (
                      <DropdownMenuItem key={genre.title}>
                        <Link className="w-full" href={genre.href}>
                          {genre.title}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ) : (
              <DropdownMenuItem key={topic.title}>
                {topic.title}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MultiDropdownBtn;
