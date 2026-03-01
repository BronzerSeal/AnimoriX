import { NavigationMenuLink } from "@/shared/ui/navigation-menu";

export function ListItem({ title, href }: { title: string; href: string }) {
  return (
    <li>
      <NavigationMenuLink href={href}>
        <span className="flex flex-col gap-1 text-sm">
          <span className="leading-none font-medium">{title}</span>
        </span>
      </NavigationMenuLink>
    </li>
  );
}
