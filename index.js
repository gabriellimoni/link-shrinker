require("dotenv").config();
const env = require("./env");
console.log(env);
const server = require("./src/server");
server.listen(env.port);
