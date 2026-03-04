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
import SearchInputSection from "./search-input-section";
import LogoSection from "./logo-section";

const MainHeader = () => {
  return (
    <header className="px-2 py-2 z-50 flex justify-between items-center max-w-1250 bg-white dark:bg-[#0c1115] p-4 rounded-xl">
      <LogoSection />

      <NavigationMenu
        viewport={false}
        className="flex justify-between items-center"
      >
        <NavigationMenuList>
          <SearchInputSection />

          <HeaderAction href="/watch2gether">
            <UsersRound className="size-4 text-foreground" strokeWidth={2.2} />
          </HeaderAction>
          <HeaderAction href="/random">
            <Shuffle className="size-4 text-foreground" strokeWidth={2.2} />
          </HeaderAction>
          <div className="hidden xl:flex gap-1">
            {navTopics.map((topic) => {
              return <TopicItem topic={topic} key={topic.title} />;
            })}
          </div>
          <NavigationMenuItem>
            <ToggleThemeBtn variant="navigation" />
          </NavigationMenuItem>

          <LanguageSwitch />

          <Avatar>
            <AvatarImage src="#" />
            <AvatarFallback>
              <User className=" text-foreground" strokeWidth={2.2} />
            </AvatarFallback>
          </Avatar>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default MainHeader;
