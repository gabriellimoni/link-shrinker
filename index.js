const env = require("./env");
const http = require("http");
const shrinkedLinkController = require("./controller/shrinkedLinkController");

const requestListener = function (req, res) {
  if (req.method.toUpperCase() === "POST") {
    return shrinkedLinkController.post(req, res);
  } else if (req.method.toUpperCase() === "GET") {
    return shrinkedLinkController.get(req, res);
  }
  res.writeHead(405);
  res.end("Method not allowed");
};

const server = http.createServer(requestListener);
server.listen(env.port);
