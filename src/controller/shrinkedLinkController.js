const env = require("../../env");
const shrinkUrlRepository = require("../repository/mongoShrinkUrlRepository");
const shrinkUrlService = require("../service/shrinkUrlService");

module.exports = {
  post: function (req, res) {
    let data = "";
    req.on("data", (buffer) => {
      data += buffer.toString();
    });
    req.on("end", async () => {
      if (!data) {
        res.writeHead(400);
        res.end("No data received");
        return;
      }
      if (invalidData(data)) {
        res.writeHead(400);
        res.end("Invalid data sent");
        return;
      }
      const urlIdentificator = await shrinkUrlService.shrinkUrl(
        data,
        shrinkUrlRepository
      );
      res.writeHead(200);
      res.end(`${env.serverBaseEndpoint}/${urlIdentificator}`);
    });
  },
  get: async function (req, res) {
    const urlIdToFind = req.url.split("/").join("");
    const foundUrl = await shrinkUrlService.getShrinkedUrl(
      urlIdToFind,
      shrinkUrlRepository
    );
    if (!foundUrl) {
      res.writeHead(404);
      res.end("Shrinked URL not found");
      return;
    }
    res.writeHead(302, {
      Location: foundUrl,
    });
    res.end();
  },
};

function invalidData(data) {
  if (!data.startsWith("http://") && !data.startsWith("https://")) return true;
  if (!data.includes(".")) return true;
  if (["."].includes(data.charAt(data.length - 1))) return true;
  if (data.includes(" ")) return true;
  return false;
}
