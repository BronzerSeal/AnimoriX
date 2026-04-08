import { navTopics } from "@/shared/constants/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { HeaderAction, TopicItem } from "@/shared/ui/nav-actions";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/shared/ui/navigation-menu";
import ToggleThemeBtn from "@/shared/ui/toggle-theme-btn";
import { Shuffle, User, UsersRound } from "lucide-react";
import LanguageSwitch from "./language-switch";
import LogoSection from "./logo-section";
import { SearchInput } from "@/features/search-input";

const MainHeader = () => {
  return (
    <header
      className="
    z-50 flex items-center justify-between rounded-xl
    bg-white/20 dark:bg-black/20
    sm:bg-white sm:dark:bg-[#0c1115]
    p-4 px-3 py-3 sm:px-2
    backdrop-blur-sm
    transition-colors
  "
    >
      <LogoSection />

      <NavigationMenu
        viewport={false}
        className="flex justify-between items-center"
      >
        <NavigationMenuList className="gap-2 sm:gap-1">
          <div className="flex items-center gap-2 sm:hidden">
            <SearchInput />
            <Avatar size="sm">
              <AvatarImage src="#" />
              <AvatarFallback>
                <User className="text-foreground size-3.5" strokeWidth={1.6} />
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="hidden sm:flex items-center">
            <SearchInput />

            <HeaderAction href="/watch2gether">
              <UsersRound
                className="size-4 text-foreground"
                strokeWidth={2.2}
              />
            </HeaderAction>
            <HeaderAction href="/random">
              <Shuffle className="size-4 text-foreground" strokeWidth={2.2} />
            </HeaderAction>
            <div className="hidden xl:flex gap-1">
              {navTopics.map((topic) => {
                return <TopicItem topic={topic} key={topic.title} />;
              })}
            </div>
            <NavigationMenuItem className="mr-1">
              <ToggleThemeBtn variant="navigation" />
            </NavigationMenuItem>

            <LanguageSwitch />
            <Avatar size="sm" className=" ml-2">
              <AvatarImage src="#" />
              <AvatarFallback>
                <User className="text-foreground" strokeWidth={1.5} />
              </AvatarFallback>
            </Avatar>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default MainHeader;
