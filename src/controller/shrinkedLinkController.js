const env = require("../../env");
const shrinkUrlInMemoryRepo = require("../repository/inMemoryShrinkUrlRepository");
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
        shrinkUrlInMemoryRepo
      );
      res.writeHead(200);
      res.end(`${env.serverBaseEndpoint}/${urlIdentificator}`);
    });
  },
  get: function (req, res) {
    res.writeHead(302);
    res.end("GOT");
  },
};

function invalidData(data) {
  if (!data.includes("http://") && !data.includes("https://")) return true;
  if (!data.includes(".")) return true;
  if (["."].includes(data.charAt(data.length - 1))) return true;
  if (data.includes(" ")) return true;
  return false;
}
