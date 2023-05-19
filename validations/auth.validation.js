const { Joi } = require("express-validation");

module.exports.createUser = {
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
};

module.exports.generateOtp = {
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
};

module.exports.login = {
  body: Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().min(4).max(4).required(),
  }),
};

// (module.exports = {
//   createUser: {
//     body: Joi.object({
//       email: Joi.string().email().required(),
//     }),
//   },
//   generateOtp: {
//     body: Joi.object({
//       email: Joi.string().email().required(),
//     }),
//   },
//   login: {
//     body: Joi.object({
//       email: Joi.string().email().required(),
//       otp: Joi.string().min(4).max(6).required(),
//     }),
//   },
// });
