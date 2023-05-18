const nodemailer = require("../config/nodemailer");

class NodeMailer {
  constructor() {}

  sendMail(data) {
    const htmlString = nodemailer.renderTemplate(data.otp);
    nodemailer.transporter.sendMail(
      {
        from: "admin@auth.in",
        to: data.user.email,
        subject: "OTP",
        html: htmlString,
      },
      function (err, info) {
        if (err) {
          console.log("Error in Sending Mails", err);
          return;
        }
        console.log("Message Sent");
        return;
      }
    );
  }
}

module.exports = NodeMailer;
