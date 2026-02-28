import { navTopics } from "@/shared/constants/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/shared/ui/navigation-menu";
import Link from "next/link";
import { ListItem } from "./listItem";

const MainPageHeader = () => {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        {navTopics.map((topic) => {
          const hasGenres = topic.type === "with-genres";

          return hasGenres ? (
            <NavigationMenuItem key={topic.title}>
              <NavigationMenuTrigger className="relative">
                {topic.title}
              </NavigationMenuTrigger>
              {topic.type === "with-genres" && (
                <NavigationMenuContent className="left-0">
                  <ul
                    className={
                      topic.genres.length > 12
                        ? "grid grid-cols-4 gap-2 w-150"
                        : "flex flex-col w-25"
                    }
                  >
                    {topic.genres.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              )}
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={topic.title}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href={topic.href}>{topic.title}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainPageHeader;
