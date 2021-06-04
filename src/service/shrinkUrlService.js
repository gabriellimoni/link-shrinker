const uuid = require("uuid");

module.exports = {
  /**
   * Receives an URL and returns a shrinked identificator of it.
   * @param {string} url URL to shrink
   */
  shrinkUrl: async function (url, db) {
    const thisUrlIdentificator = uuid.v4();
    const committedIdentificator = await db.saveShrinkedUrl(
      url,
      thisUrlIdentificator
    );
    return committedIdentificator;
  },
  /**
   * Receives an URL identificator and returns the desired URL.
   * If URL not found, return null.
   * @param {string} urlIdentificator URL identificator to find
   */
  getShrinkedUrl: async function (urlIdentificator, db) {
    const foundUrl = await db.getShrinkedUrl(urlIdentificator);
    if (!foundUrl) return null;
    return foundUrl;
  },
};
