import axios from "axios";

export async function getAnimeVideoById(animeId: string) {
  try {
    return await axios.get(`/api/anime/stream?episodeId=${animeId}`);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error(
        "Failed to fetch video:",
        err.response?.data?.error || err.message,
      );
      throw new Error(err.response?.data?.error || "Failed to fetch video");
    }

    // Любая другая ошибка
    console.error("Failed to fetch video:", (err as Error).message);
    throw new Error("Failed to fetch video");
  }
}
