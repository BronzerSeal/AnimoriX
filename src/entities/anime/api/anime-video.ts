import axios from "axios";

export async function getAnimeVideoById(
  animeId: string,
  animeTitle: string,
  episodeNumber: number,
) {
  try {
    const params = new URLSearchParams({
      episodeId: animeId,
      title: animeTitle,
      episodeNumber: String(episodeNumber),
    });

    return await axios.get(`/api/anime/stream?${params.toString()}`);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      // console.error(
      //   "Failed to fetch video:",
      //   err.response?.data?.error || err.message,
      // );
      throw new Error(err.response?.data?.error || "Failed to fetch video");
    }

    // Любая другая ошибка
    console.error("Failed to fetch video:", (err as Error).message);
    throw new Error("Failed to fetch video");
  }
}
