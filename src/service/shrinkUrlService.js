const uuid = require("uuid");

/**
 * Receives an URL and returns a shrinked identificator of it.
 * @param {string} url URL to shrink
 */
module.exports = async function (url, db) {
  const thisUrlIdentificator = uuid.v4();
  await db.saveShrinkedUrl(url, thisUrlIdentificator);
  return thisUrlIdentificator;
};
