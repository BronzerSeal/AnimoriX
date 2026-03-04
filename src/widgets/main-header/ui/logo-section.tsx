import { navTopics } from "@/shared/constants/navigation";
import MultiDropdownBtn from "@/shared/ui/multi-dropdown-btn";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/shared/ui/navigation-menu";

const LogoSection = () => {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <div className="flex xl:hidden">
          <MultiDropdownBtn topics={navTopics} variant="navigation" />
        </div>
        <h1 className="text-xl font-extrabold">AnimoriX</h1>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default LogoSection;
