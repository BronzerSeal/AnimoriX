import { getTopTenAnimes } from "@/entities/anime/api/anime.api";

const TopAnimesPagination = async () => {
  const topAnimes = await getTopTenAnimes();
  // console.log(topAnimes);
  return <div>TopAnimesPagination</div>;
};

export default TopAnimesPagination;
