import nodemailer from 'nodemailer';
import { GMAIL_USER, GMAIL_PASS } from '../config.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

async function sendVerificationEmail(toEmail, otp) {
  try {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 20px; border: 1px solid #eee;">
        <h2 style="color: #e11d48;">Verify your Caelvi account</h2>
        <p>Hi there,</p>
        <p>Your verification code is:</p>
        <p style="font-size: 28px; font-weight: bold; color: #10b981;">${otp}</p>
        <p>This code is valid for 10 minutes.</p>
        <hr />
        <p style="font-size: 12px; color: #999;">If you didn't request this, just ignore this email.</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"Caelvi" <${GMAIL_USER}>`,
      to: toEmail,
      subject: 'Verify your Caelvi Account',
      html,
    });
    return info;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Could not send verification email");
  }
}

export default sendVerificationEmail;