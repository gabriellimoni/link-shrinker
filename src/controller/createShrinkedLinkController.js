const env = require("../../env");
const shrinkUrlService = require("../service/shrinkUrlService");
const shrinkUrlRepository = require("../repository/mongoShrinkUrlRepository");

module.exports = async function (req) {
  const data = req.body;
  if (invalidData(data)) {
    return { status: 400, data: { message: "Invalid data sent" } };
  }
  const urlIdentificator = await shrinkUrlService.shrinkUrl(
    data,
    shrinkUrlRepository
  );
  return `${env.serverBaseEndpoint}/${urlIdentificator}`;
};

function invalidData(data) {
  if (!data.startsWith("http://") && !data.startsWith("https://")) return true;
  if (!data.includes(".")) return true;
  if (["."].includes(data.charAt(data.length - 1))) return true;
  if (data.includes(" ")) return true;
  return false;
}
