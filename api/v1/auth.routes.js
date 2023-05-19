const express = require("express");
const router = express.Router();
const { validate } = require("express-validation");
const { generateOtp, login } = require("../../validations/auth.validation");
const OtpController = require("../../controllers/authController");

const otpController = new OtpController();

router.post(
  "/login",
  validate(login, {}, {}),
  otpController.accoundBlockVerify,
  otpController.login
);
router.post(
  "/generate-otp",
  validate(generateOtp, {}, {}),
  otpController.accoundBlockVerify,
  otpController.generateOtp
);

module.exports = router;
