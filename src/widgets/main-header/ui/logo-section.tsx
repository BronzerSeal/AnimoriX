import { navTopics } from "@/shared/constants/navigation";
import MultiDropdownBtn from "@/shared/ui/multi-dropdown-btn";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/shared/ui/navigation-menu";
import Link from "next/link";

const LogoSection = () => {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <div className="flex xl:hidden">
          <MultiDropdownBtn topics={navTopics} variant="navigation" />
        </div>
        <Link href="/home">
          <h1 className="text-xl font-extrabold cursor-pointer">AnimoriX</h1>
        </Link>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default LogoSection;
