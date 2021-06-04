const urlMap = new Map();

module.exports = {
  saveShrinkedUrl: async (url, urlIdentificator) => {
    urlMap.set(urlIdentificator, url);
  },
  _urlMap: urlMap,
};
