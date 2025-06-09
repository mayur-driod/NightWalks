const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

// ✅ Correct absolute path to Email.html using __dirname
const htmlContent = fs.readFileSync(
  path.join(__dirname, "../../Emails/Email.html"),
  "utf8",
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendConfirmationEmail = async (email) => {
  await transporter.sendMail({
    from: `"Attacus and Psyche Confirmation Bot" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your night walk has been confirmed!",
    html: htmlContent,
  });
};

module.exports = sendConfirmationEmail;
