const qws = require("quick-webservice");
const getShrinkedLinkController = require("./controller/getShrinkedLinkController");
const createShrinkedLinkController = require("./controller/createShrinkedLinkController");

const app = qws.build({ parseJson: true, timeout: 1000 });
app.get("/:id", getShrinkedLinkController);
app.post("/shrink", createShrinkedLinkController);

module.exports = app.server;
