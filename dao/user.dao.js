const User = require("../models/User");
class UserDao {
  constructor() {}

  createUser__force(email) {
    return new Promise(async (resolve, reject) => {
      try {
        let dbUser = await User.findOne({ email });

        if (dbUser) {
          resolve(dbUser);
        } else {
          dbUser = await User.create({ email });
          resolve(dbUser);
        }
      } catch (err) {
        reject({ error: err });
      }
    });
  }

  getUserByEmail(email) {
    return new Promise(async (resolve, reject) => {
      try {
        let dbUser = await User.findOne({ email }).populate("verify");
        resolve(dbUser);
      } catch (err) {
        reject({ error: err });
      }
    });
  }

  updateUser(id, value) {
    return new Promise(async (resolve, reject) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(id, { $set: value });
        resolve(updatedUser);
      } catch (err) {
        return reject({ error: err });
      }
    });
  }

  removeOtp(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findByIdAndUpdate(id, {
          $unset: { verify: 1 },
        });
        resolve(user);
      } catch (err) {
        reject({ error: err });
      }
    });
  }
}

module.exports = UserDao;
