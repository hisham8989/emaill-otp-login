const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    otp: {
      type: String,
      required: true,
    },
    wrongAttempts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

verificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

const Verification = mongoose.model("Verification", verificationSchema);

module.exports = Verification;
