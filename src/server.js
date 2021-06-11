const qws = require("quick-webservice");
const env = require("../env");
const shrinkUrlService = require("./service/shrinkUrlService");
const shrinkUrlRepository = require("./repository/mongoShrinkUrlRepository");

const app = qws.build({ parseJson: true, timeout: 1000 });

app.get("/:id", async function (req, res) {
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
});

app.post("/shrink", async function (req) {
  const data = req.body;
  if (invalidData(data)) {
    return { status: 400, data: { message: "Invalid data sent" } };
  }
  const urlIdentificator = await shrinkUrlService.shrinkUrl(
    data,
    shrinkUrlRepository
  );
  return `${env.serverBaseEndpoint}/${urlIdentificator}`;
});

function invalidData(data) {
  if (!data.startsWith("http://") && !data.startsWith("https://")) return true;
  if (!data.includes(".")) return true;
  if (["."].includes(data.charAt(data.length - 1))) return true;
  if (data.includes(" ")) return true;
  return false;
}

module.exports = app.server;
