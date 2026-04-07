import { navTopics } from "@/shared/constants/navigation";

export const getGenreIdByName = (name: string): string | undefined => {
  const genres = navTopics
    .filter(
      (t): t is Extract<typeof t, { type: "with-genres" }> =>
        t.type === "with-genres",
    )
    .find((t) => t.title === "GENRES")?.genres;

  return genres?.find((g) => {
    const hrefSlug = g.href.split("/").pop();
    return hrefSlug === name;
  })?.id;
};
