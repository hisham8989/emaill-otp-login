const nodemailer = require("nodemailer");
const env = require("./environment");

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: env.mail_user,
    pass: env.mail_pass,
  },
});

let renderTemplate = (otp) => {
  const htmlMailTemplate = `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>OTP Email</title>
    </head>
    <body>
      <h2>One-Time Password (OTP)</h2>
      <p>Please use the following OTP to login in your account:</p>
      
      <table style="width: 300px;">
        <tr>
          <th style="background-color: #f2f2f2;">OTP:</th>
          <td style="background-color: #f2f2f2;align:center;">${otp.value} </td>
        </tr>
        <tr>
          <th style="background-color: #f2f2f2;">Expiration Time:</th>
          <td style="background-color: #f2f2f2;align:center;">${otp.expiredInMin} mins</td>
        </tr>
      </table>
    
      <p>Please note that the OTP is valid only for a limited time.</p>
      <p>If you did not request this OTP, please ignore this email.</p>
    
      <p>Thank you,</p>
    </body>
    </html>
    `;

  return htmlMailTemplate;
};

module.exports = {
  transporter,
  renderTemplate,
};
