const express = require("express");
const router = express.Router();
const OtpController = require("../../controllers/authController");

const otpController = new OtpController();

router.post("/login", otpController.accoundBlockVerify, otpController.login);
router.post(
  "/generate-otp",
  otpController.accoundBlockVerify,
  otpController.generateOtp
);

module.exports = router;
