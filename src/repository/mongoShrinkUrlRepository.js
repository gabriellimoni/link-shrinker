const mongodb = require("../infra/mongodb");

module.exports = {
  saveShrinkedUrl: async (url, urlIdentificator) => {
    const collection = await mongodb.getCollection("shrinked_urls");
    await collection.insert({
      urlIdentificator,
      url,
    });
    return urlIdentificator;
  },
  getShrinkedUrl: async (urlIdentificator) => {
    return urlMap.get(urlIdentificator);
  },
};
