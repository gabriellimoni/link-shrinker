const mongodb = require("../infra/mongodb");

module.exports = {
  saveShrinkedUrl: async (url, urlIdentificator) => {
    const collection = await mongodb.getCollection("shrinked_urls");
    const alreadyExistentShrink = await collection.findOne({ url });
    if (alreadyExistentShrink) {
      return alreadyExistentShrink.urlIdentificator;
    }
    await collection.insertOne({
      urlIdentificator,
      url,
      createdAt: new Date(),
    });
    return urlIdentificator;
  },
  getShrinkedUrl: async (urlIdentificator) => {
    const collection = await mongodb.getCollection("shrinked_urls");
    const document = await collection.findOne({
      urlIdentificator,
    });
    return document.url;
  },
};
