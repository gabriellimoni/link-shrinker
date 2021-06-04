module.exports = {
  port: process.env.PORT || 3000,
  serverBaseEndpoint:
    process.env.SERVER_BASE_ENDPOINT || "http://localhost:3000",
  mongoUri: process.env.MONGO_URI,
  mongoDb: process.env.MONGO_DB || "shrink_url_dev",
};
