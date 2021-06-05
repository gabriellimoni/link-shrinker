const fs = require("fs");
const path = require("path");

module.exports = {
  getHtmlContent: function () {
    const templatePath = path.join(__dirname, "template.html");
    const templateData = fs.readFileSync(templatePath, {
      encoding: "utf-8",
    });
    return templateData;
  },
};
