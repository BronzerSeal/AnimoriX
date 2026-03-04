import { navTopics } from "@/shared/constants/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/shared/ui/navigation-menu";
import { Shuffle, UsersRound } from "lucide-react";
import ToggleThemeBtn from "@/shared/ui/toggle-theme-btn";
import MultiDropdownBtn from "@/shared/ui/multi-dropdown-btn";
import { HeaderAction, TopicItem } from "@/shared/ui/nav-actions";

const MainPageHeader = () => {
  return (
    <header className="px-2 py-2 z-50">
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <div className="flex md:hidden">
            <MultiDropdownBtn topics={navTopics} variant="navigation" />
          </div>
          <HeaderAction variant="text" href="/watch2gether">
            <UsersRound className="size-4 text-foreground" strokeWidth={2.2} />
          </HeaderAction>
          <HeaderAction href="/random">
            <Shuffle className="size-4 text-foreground" strokeWidth={2.2} />
          </HeaderAction>
          <div className="hidden md:flex">
            {navTopics.map((topic) => {
              return <TopicItem topic={topic} key={topic.title} />;
            })}
          </div>
          <NavigationMenuItem>
            <ToggleThemeBtn variant="navigation" />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default MainPageHeader;
