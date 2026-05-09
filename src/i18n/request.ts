import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { AppLocale, isValidLocale, routing } from "./routing";

function resolveLocale(cookieLocale: string | undefined): AppLocale {
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  return routing.defaultLocale;
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  const locale = resolveLocale(cookieLocale);

  return {
    locale,
    messages: (
      await import(`@/shared/config/messages/${locale}/${locale}.json`)
    ).default,
  };
});
