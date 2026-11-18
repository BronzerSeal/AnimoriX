import { describe, it, expect } from "@jest/globals";
import { uniqueById } from "./uniqueById";

describe("uniqueById", () => {
  it("should return unique items by mal_id", () => {
    const items = [
      { mal_id: 1, title: "Naruto" },
      { mal_id: 2, title: "Bleach" },
      { mal_id: 1, title: "Naruto duplicate" },
    ];

    const result = uniqueById(items);

    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { mal_id: 1, title: "Naruto duplicate" },
      { mal_id: 2, title: "Bleach" },
    ]);
  });

  it("should return an empty array when items are empty", () => {
    expect(uniqueById()).toEqual([]);
    expect(uniqueById([])).toEqual([]);
  });

  it("should filter out falsy values", () => {
    const items = [{ mal_id: 1, title: "Naruto" }, null, undefined, false];

    expect(uniqueById(items)).toEqual([{ mal_id: 1, title: "Naruto" }]);
  });
});
