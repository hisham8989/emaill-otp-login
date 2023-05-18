const dotenv = require("dotenv");
dotenv.config();

const development = {
  name: "development",
  db_url: process.env.MONGO_DEV_URL,
  jwt_secret: process.env.JWT_SECRET,
  mail_user: process.env.MAIL_USER,
  mail_pass: process.env.MAIL_PASSWORD,
};

const production = {
  name: "production",
  db_url: process.env.MONGO_PROD_URL,
  jwt_secret: process.env.JWT_SECRET,
  mail_user: process.env.MAIL_USER,
  mail_pass: process.env.MAIL_PASSWORD,
};

module.exports =
  eval(process.env.NODE_ENV) == undefined
    ? development
    : eval(process.env.NODE_ENV);
