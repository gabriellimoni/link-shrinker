const MongoClient = require("mongodb").MongoClient;

const env = require("../../env");
const uri = env.mongoUri;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {
  getCollection: async function (collectionName) {
    return new Promise((resolve) => {
      if (client.isConnected()) {
        const collection = client.db(env.mongoDb).collection(collectionName);
        return resolve(collection);
      }
      client.connect((err) => {
        const collection = client.db(env.mongoDb).collection(collectionName);
        resolve(collection);
      });
    });
  },
  closeConnection: async function () {
    await client.close();
  },
};
