const nodemailer = require("nodemailer");

module.exports.sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const result = await transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    subject,
    html,
  });

  return result;
};
