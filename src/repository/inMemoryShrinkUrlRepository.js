const urlMap = new Map();

module.exports = {
  saveShrinkedUrl: async (url, urlIdentificator) => {
    for (const [key, value] of urlMap) {
      if (value === url) return key;
    }
    urlMap.set(urlIdentificator, url);
    return urlIdentificator;
  },
  getShrinkedUrl: async (urlIdentificator) => {
    return urlMap.get(urlIdentificator);
  },
  _urlMap: urlMap,
};
