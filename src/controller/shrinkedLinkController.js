module.exports = {
  post: function (req, res) {
    let data = "";
    req.on("data", (buffer) => {
      data += buffer.toString();
    });
    req.on("end", () => {
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
      res.writeHead(200);
      res.end(`POSTED ${data}`);
    });
  },
  get: function (req, res) {
    res.writeHead(200);
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
