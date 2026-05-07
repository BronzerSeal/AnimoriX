import { NavigationMenuLink } from "@/shared/ui/navigation-menu";
import { useTranslations } from "next-intl";

export function ListItem({ title, href }: { title: string; href: string }) {
  const t = useTranslations("components.header.items");
  return (
    <li>
      <NavigationMenuLink href={href}>
        <span className="flex flex-col gap-1 text-sm">
          <span className="leading-none font-medium">{t(title)}</span>
        </span>
      </NavigationMenuLink>
    </li>
  );
}
