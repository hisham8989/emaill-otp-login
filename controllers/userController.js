const OtpDao = require("../dao/otp.dao");
const UserDao = require("../dao/user.dao");
const userDao = new UserDao();

class UserController {
  createUser = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await userDao.createUser__force(email);
      if (user) {
        return res.json({
          success: true,
          message: "user created",
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }
  };
}

module.exports = UserController;
