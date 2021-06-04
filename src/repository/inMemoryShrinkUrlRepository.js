const urlMap = new Map();

module.exports = {
  saveShrinkedUrl: async (url, urlIdentificator) => {
    urlMap.set(urlIdentificator, url);
  },
  getShrinkedUrl: async (urlIdentificator) => {
    return urlMap.get(urlIdentificator);
  },
  _urlMap: urlMap,
};
