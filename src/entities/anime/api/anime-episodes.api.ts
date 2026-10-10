import axios from "axios";

export async function getAnimeEpisodes(animeId: string) {
  return await axios.get(`/api/anime/episodes`, {
    params: {
      id: animeId,
    },
  });
}
