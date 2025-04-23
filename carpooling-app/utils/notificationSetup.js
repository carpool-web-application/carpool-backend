import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

// Transporter setup using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail", // correct way to use Gmail with nodemailer
  auth: {
    user: process.env.gmailUser,
    pass: process.env.gmailPassword,
  },
});

const sendEmail = async (email, subject, message) => {
  try {
    const info = await transporter.sendMail({
      from: `${process.env.gmailUser}>`, // sender email
      to: `${email}`, // receivers
      subject: `${subject}`,
      html: `${message}`,
    });

    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendEmail;
