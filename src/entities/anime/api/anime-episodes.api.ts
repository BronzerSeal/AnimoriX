import axios from "axios";

export async function getAnimeEpisodes(animeTitle: string) {
  return await axios.get(`/api/anime/search?title=${animeTitle}`);
}
