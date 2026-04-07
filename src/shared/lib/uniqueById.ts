export const uniqueById = (items: any[] = []) => {
  return Array.from(
    new Map(items.filter(Boolean).map((item) => [item.mal_id, item])).values(),
  );
};
