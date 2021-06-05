const http = require("http");
const shrinkedLinkController = require("./controller/shrinkedLinkController");
const { getHtmlContent } = require("./htmlContent");

const requestListener = function (req, res) {
  if (req.method.toUpperCase() === "GET" && req.url.toLowerCase() === "/") {
    const htmlContent = getHtmlContent();
    res.writeHead(200);
    res.end(htmlContent);
    return;
  }
  entrypointChecking(req, res);
  if (res.finished) return;
  if (req.method.toUpperCase() === "POST") {
    return shrinkedLinkController.post(req, res);
  } else if (req.method.toUpperCase() === "GET") {
    return shrinkedLinkController.get(req, res);
  }
  res.writeHead(405);
  res.end("Method not allowed");
};

function entrypointChecking(req, res) {
  if (req.method.toUpperCase() === "POST") {
    if (req.url.toLowerCase() !== "/shrink") {
      res.writeHead(404);
      res.end(`Route ${req.url} not found`);
      return;
    }
  }
  if (req.method.toUpperCase() === "GET") {
    const splittedBySlash = req.url.toLowerCase().split("/");
    // "/other/long-path" is invalid
    if (splittedBySlash.length > 3) {
      res.writeHead(404);
      res.end(`Route ${req.url} not found`);
      return;
    }
    // "/shrinked-id/" must be valid
    if (splittedBySlash.length === 3 && splittedBySlash[2].trim() !== "") {
      res.writeHead(404);
      res.end(`Route ${req.url} not found`);
      return;
    }
    // "/" is invalid
    if (splittedBySlash[1].trim() === "") {
      res.writeHead(404);
      res.end(`Route ${req.url} not found`);
      return;
    }
  }
}

const server = http.createServer(requestListener);

module.exports = server;
