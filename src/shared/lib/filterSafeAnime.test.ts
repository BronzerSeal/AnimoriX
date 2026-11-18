import { describe, it, expect } from "@jest/globals";
import { filterSafeAnime } from "./filterSafeAnime";

describe("filterSafeAnime", () => {
  it("should filter 18+ animes", () => {
    const items = [
      { mal_id: 1, title: "Naruto", rating: "R" },
      { mal_id: 2, title: "Bleach", rating: "PG-13" },
      { mal_id: 1, title: "some 18+", rating: "Rx - Hentai" },
    ];

    const result = filterSafeAnime(items);

    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { mal_id: 1, title: "Naruto", rating: "R" },
      { mal_id: 2, title: "Bleach", rating: "PG-13" },
    ]);
  });
});
