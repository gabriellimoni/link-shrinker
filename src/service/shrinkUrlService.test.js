const shrinkUrlService = require("./shrinkUrlService");

/**
 * Mock uuid.v4 because we are using this
 * lib function to generate the url identificator
 */
jest.mock("uuid", () => ({
  v4: () => "any-url-identificator",
}));

describe("shrinkUrlService", () => {
  describe("shrinkUrl", () => {
    test("Should call db.saveShrinkedUrl with correct values", () => {
      const mockedDb = {
        saveShrinkedUrl: jest.fn(),
      };
      const urlToShrink = "any-url";
      shrinkUrlService.shrinkUrl(urlToShrink, mockedDb);

      expect(mockedDb.saveShrinkedUrl).toHaveBeenCalledWith(
        "any-url",
        "any-url-identificator"
      );
    });
  });

  describe("getShrinkedUrl", () => {
    test("Should call db.getShrinkedUrl with correct values", () => {
      const mockedDb = {
        getShrinkedUrl: jest.fn(),
      };
      const urlIdToFind = "any-url-id";
      shrinkUrlService.getShrinkedUrl(urlIdToFind, mockedDb);

      expect(mockedDb.getShrinkedUrl).toHaveBeenCalledWith("any-url-id");
    });
  });
});
