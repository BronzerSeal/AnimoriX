import { useQueries } from "@tanstack/react-query";
import { bookmark } from "@/shared/types/DataBase";
import { getAnimeFullById } from "@/entities/anime";

export const useSidebarAnimeList = (bookmarks?: bookmark[]) => {
  const lastBookmarks = (bookmarks ?? [])
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 6);

  return useQueries({
    queries: lastBookmarks.map((b) => ({
      queryKey: ["anime-by-id", b.animeId],

      queryFn: async () => {
        const res = await getAnimeFullById(String(b.animeId));
        return res.data;
      },
    })),
  });
};
