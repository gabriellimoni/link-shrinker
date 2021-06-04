const mongodb = require("../infra/mongodb");
const {
  saveShrinkedUrl,
  getShrinkedUrl,
} = require("./mongoShrinkUrlRepository");

describe("mongoShrinkUrlRepository", () => {
  let collection;
  beforeEach(async () => {
    collection = await mongodb.getCollection("shrinked_urls");
    if (await collection.count()) await collection.drop();
  });
  afterAll(async () => {
    if (await collection.count()) await collection.drop();
    await mongodb.closeConnection();
  });
  test("Should persist url and url identificator on memory map variable", async () => {
    await saveShrinkedUrl("any-url", "any-url-identificator");
    const shrinkedUrl = await collection.findOne({
      urlIdentificator: "any-url-identificator",
    });
    expect(shrinkedUrl.url).toBe("any-url");
  });

  // test("Should return correct url from identificator", async () => {
  //   await saveShrinkedUrl("any-url", "any-url-identificator");
  //   const foundUrl = await getShrinkedUrl("any-url-identificator");
  //   expect(foundUrl).toBe("any-url");
  // });

  // test("Should return current url identificator if url already exists", async () => {
  //   await saveShrinkedUrl("same-url", "same-url-identificator");
  //   const savedIdentificator = await saveShrinkedUrl(
  //     "same-url",
  //     "another-url-identificator"
  //   );
  //   expect(savedIdentificator).toBe("same-url-identificator");
  // });
});
