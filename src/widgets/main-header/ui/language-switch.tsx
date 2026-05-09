"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle";

const LanguageSwitch = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleChange(nextLocale: string) {
    if (!nextLocale || nextLocale === locale) {
      return;
    }

    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; samesite=lax`;

    const query = searchParams.toString();
    const href = query ? `${pathname}?${query}` : pathname;

    router.replace(href);
    router.refresh();
  }

  return (
    <ToggleGroup
      type="single"
      value={locale}
      onValueChange={handleChange}
      className="bg-muted "
    >
      <ToggleGroupItem
        value="en"
        className=" px-3 data-[state=on]:bg-orange-500"
      >
        en
      </ToggleGroupItem>

      <ToggleGroupItem
        value="ru"
        className=" px-3 data-[state=on]:bg-orange-500 data-[state=on]:text-white"
      >
        ru
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default LanguageSwitch;
