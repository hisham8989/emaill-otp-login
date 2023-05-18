const env = require("./environment");
const mongoose = require("mongoose");

module.exports.connectDB = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const connection = await mongoose.connect(env.db_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      if (connection) {
        return resolve(connection.connections[0]);
      } else {
        throw "failed to find db connection";
      }
    } catch (err) {
      return reject(err);
    }
  });
};
