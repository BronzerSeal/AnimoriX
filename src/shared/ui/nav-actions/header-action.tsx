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
  variant = "navigation",
}: {
  children: ReactNode;
  href: string;
  variant?: "navigation" | "text";
}) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        asChild
        className={variant === "navigation" ? navigationMenuTriggerStyle() : ""}
      >
        <Link href={href}>{children}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
