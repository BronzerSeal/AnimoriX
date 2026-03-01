import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/shared/ui/navigation-menu";
import Link from "next/link";
import { ReactNode } from "react";

export function HeaderAction({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        <Link href={href}>{children}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
