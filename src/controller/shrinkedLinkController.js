module.exports = {
  post: function (req, res) {
    res.writeHead(200);
    res.end("POSTED");
  },
  get: function (req, res) {
    res.writeHead(200);
    res.end("GOT");
  },
};
