import { bookmark, userFromJikan } from "@/shared/types/DataBase";

export function mapJikanUserBookmarks(user: userFromJikan): bookmark[] {
  // @ts-ignore
  const animeList = user.data?.favorites?.anime ?? [];

  return animeList.map((anime: any) => ({
    id: `${user.data?.mal_id}-${anime.mal_id}`, // уникальный id
    userId: `${user.data?.mal_id}`,
    animeId: anime.mal_id,
    animeName: anime.title,
    createdAt: new Date(),
  }));
}
