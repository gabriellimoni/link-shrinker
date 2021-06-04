const shrinkUrlService = require("./shrinkUrlService");

/**
 * Mock uuid.v4 because we are using this
 * lib function to generate the url identificator
 */
jest.mock("uuid", () => ({
  v4: () => "any-url-identificator",
}));

describe("shrinkUrlService", () => {
  test("Should call db.saveShrinkedUrl with correct values", () => {
    const mockedDb = {
      saveShrinkedUrl: jest.fn(),
    };
    const urlToShrink = "any-url";
    shrinkUrlService(urlToShrink, mockedDb);

    expect(mockedDb.saveShrinkedUrl).toHaveBeenCalledWith(
      "any-url",
      "any-url-identificator"
    );
  });
});
