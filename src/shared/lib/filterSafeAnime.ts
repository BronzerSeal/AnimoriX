export const filterSafeAnime = <T extends { rating?: string | null }>(
  items: T[],
) => {
  return items.filter((anime) => anime.rating !== "Rx - Hentai");
};
