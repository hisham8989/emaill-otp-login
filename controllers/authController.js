const jwt = require("jsonwebtoken");
const env = require("../config/environment");
const OtpDao = require("../dao/otp.dao");
const UserDao = require("../dao/user.dao");
const {
  appConstant: { OTP_MAX_LENGTH },
} = require("../Constant");
const NodeMailer = require("../service/mailer");

const userDao = new UserDao();

class OtpController {
  constructor() {}

  login = async (req, res) => {
    try {
      const { email, otp } = req.body;
      let user = await userDao.getUserByEmail(email);
      if (!user) throw "user does not exist with this email";
      if (!user.verify) {
        return res
          .status(200)
          .json({ status: false, message: "otp has expired" });
      }
      if (otp !== user.verify.otp) {
        const { verify } = user;
        const otpDao = new OtpDao();
        const dataToUpdate = {
          wrongAttempts: verify.wrongAttempts + 1,
        };

        if (dataToUpdate.wrongAttempts === 5) {
          await userDao.updateUser(user._id, {
            accountBlockedAt: new Date(),
          });
        }

        if (verify.wrongAttempts >= 5) {
          throw "number of attempts exceeded";
        }

        await otpDao.updateVerification(verify._id, dataToUpdate);
        throw "invalid otp";
      }

      const token = jwt.sign({}, env.jwt_secret);

      await userDao.removeOtp(user._id);

      return res.status(200).json({ token, userData: { email: user.email } });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }
  };

  generateOtp = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await userDao.getUserByEmail(email);
      if (!user) throw "user does not exist";

      if (user?.verify) {
        const currentDate = new Date();
        const otpDate = user.verify.createdAt;
        const miliSecondDiff = currentDate - otpDate;

        // One Mintue Wait Condition
        if (miliSecondDiff < 60000) {
          return res.json({
            success: false,
            message: `wait new otp can be generate in ${Math.ceil(
              (60000 - miliSecondDiff) / 1000
            )} seconds`,
          });
        }
      }

      const otp = new OtpDao();

      const generatedOtp = await otp.createOtp(OTP_MAX_LENGTH);
      const userWithOtp = {
        verify: generatedOtp._id,
      };
      await userDao.updateUser(user._id, userWithOtp);
      const nodemailer = new NodeMailer();
      const mailData = {
        user: {
          email: user.email,
        },
        otp: {
          expiredInMin: 5,
          value: generatedOtp.otp,
        },
      };
      nodemailer.sendMail(mailData);
      return res.json({
        success: true,
        message: "check your email inbox , otp sent successfully",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }
  };

  accoundBlockVerify = async (req, res, next) => {
    try {
      const { email } = req.body;
      if (!email) throw "email is required";
      const user = await userDao.getUserByEmail(email);
      if (!user) throw "user does not exist";
      if (user.accountBlockedAt) {
        const currentDate = new Date();
        const blockData = user.accountBlockedAt;
        const miliSecondDiff = currentDate - blockData;
        if (miliSecondDiff < 3600000) {
          throw `account is blocked, wait for ${Math.ceil(
            (3600000 - miliSecondDiff) / 60000
          )} minutes`;
        } else {
          delete user.accountBlockedAt;
          await user.save();
        }
      }
      next();
    } catch (err) {
      return res.status(500).json({
        error: err,
      });
    }
  };
}

module.exports = OtpController;
