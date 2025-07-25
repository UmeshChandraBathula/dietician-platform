const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (options) => {
  const message = {
    from: `Nume <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  try {
    const info = await transporter.sendMail(message);
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Email error:', error);
    return false;
  }
};

const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
  
  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
      <h2 style="color: #333;">Password Reset Request</h2>
      <p>You requested a password reset for your Nume account.</p>
      <p>Click the button below to reset your password:</p>
      <a href="${resetUrl}" style="display: inline-block; background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 16px 0;">Reset Password</a>
      <p>This link will expire in 10 minutes.</p>
      <p>If you didn't request this reset, please ignore this email.</p>
    </div>
  `;

  return await sendEmail({
    email,
    subject: 'Password Reset Request',
    html,
  });
};

const sendWelcomeEmail = async (email, name) => {
  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
      <h2 style="color: #333;">Welcome to Nume!</h2>
      <p>Hello ${name},</p>
      <p>Thank you for joining our platform. We're excited to help you on your transformation journey!</p>
      <p>You can now log in to your account and start exploring our features.</p>
      <a href="${process.env.CLIENT_URL}/login" style="display: inline-block; background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 16px 0;">Login to Your Account</a>
    </div>
  `;

  return await sendEmail({
    email,
    subject: 'Welcome to Nume',
    html,
  });
};

module.exports = { sendEmail, sendPasswordResetEmail, sendWelcomeEmail };