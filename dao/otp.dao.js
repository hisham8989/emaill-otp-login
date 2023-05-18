const Verification = require("../models/VerifyUser");

class VerificationDao {
  constructor(data = null) {
    const email = this.data?.email;
    const userId = this.data?._id;
  }

  createOtp(otpLength = 4) {
    return new Promise(async (resolve, reject) => {
      try {
        let otp = Math.floor(Math.random() * 10000).toString();

        const addPadd = otpLength - otp.length;

        if (addPadd > 0) otp = Math.floor(Math.random() * addPadd * 10) + otp;

        const verificationBody = { otp };
        const verify = await Verification.create(verificationBody);
        resolve(verify);
      } catch (err) {
        reject(err);
      }
    });
  }

  updateVerification(id, value) {
    return new Promise(async (resolve, reject) => {
      try {
        const otp = await Verification.findByIdAndUpdate(id, { $set: value });
        resolve(otp);
      } catch (err) {
        console.log("reject incerease", err);
        reject({ error: err });
      }
    });
  }
}

module.exports = VerificationDao;
