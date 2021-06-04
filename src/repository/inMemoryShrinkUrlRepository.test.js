const { _urlMap, saveShrinkedUrl } = require("./inMemoryShrinkUrlRepository");

describe("inMemoryShrinkUrlRepository", () => {
  test("Should persist url and url identificator on memory map variable", async () => {
    await saveShrinkedUrl("any-url", "any-url-identificator");
    expect(_urlMap.size).toBe(1);
    expect(_urlMap.get("any-url-identificator")).toBe("any-url");
  });
});
