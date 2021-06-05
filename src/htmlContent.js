const fs = require("fs");
const path = require("path");

const templatePath = path.join(__dirname, "template.html");
const templateData = fs.readFileSync(templatePath, {
  encoding: "utf-8",
});
module.exports = {
  getHtmlContent: function () {
    return templateData;
  },
};
