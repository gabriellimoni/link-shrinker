const {
  _urlMap,
  saveShrinkedUrl,
  getShrinkedUrl,
} = require("./inMemoryShrinkUrlRepository");

describe("inMemoryShrinkUrlRepository", () => {
  afterEach(() => {
    _urlMap.clear();
  });
  test("Should persist url and url identificator on memory map variable", async () => {
    await saveShrinkedUrl("any-url", "any-url-identificator");
    expect(_urlMap.size).toBe(1);
    expect(_urlMap.get("any-url-identificator")).toBe("any-url");
  });

  test("Should return correct url from identificator", async () => {
    await saveShrinkedUrl("any-url", "any-url-identificator");
    const foundUrl = await getShrinkedUrl("any-url-identificator");
    expect(foundUrl).toBe("any-url");
  });

  test("Should return current url identificator if url already exists", async () => {
    await saveShrinkedUrl("same-url", "same-url-identificator");
    const savedIdentificator = await saveShrinkedUrl(
      "same-url",
      "another-url-identificator"
    );
    expect(savedIdentificator).toBe("same-url-identificator");
  });
});
