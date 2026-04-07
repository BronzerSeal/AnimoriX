import { getAnimeRandom } from "@/entities/anime/api/anime-random.api";
import { redirect } from "next/navigation";

export default async function RandomPage() {
  const data = await getAnimeRandom();

  redirect(`/watch/${data?.data?.mal_id}`);
}
