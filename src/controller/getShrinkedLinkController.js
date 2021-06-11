const shrinkUrlService = require("../service/shrinkUrlService");
const shrinkUrlRepository = require("../repository/mongoShrinkUrlRepository");

module.exports = async function (req, res) {
  const urlIdToFind = req.url.split("/").join("");
  const foundUrl = await shrinkUrlService.getShrinkedUrl(
    urlIdToFind,
    shrinkUrlRepository
  );
  if (!foundUrl) {
    return { status: 404, data: { message: "Shrinked URL not found" } };
  }
  res.writeHead(302, {
    Location: foundUrl,
  });
  res.end();
};
