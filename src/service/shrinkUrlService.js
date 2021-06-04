const uuid = require("uuid");

module.exports = {
  /**
   * Receives an URL and returns a shrinked identificator of it.
   * @param {string} url URL to shrink
   */
  shrinkUrl: async function (url, db) {
    const thisUrlIdentificator = uuid.v4();
    await db.saveShrinkedUrl(url, thisUrlIdentificator);
    return thisUrlIdentificator;
  },
};
