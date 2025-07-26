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
    from: `Nume Platform <${process.env.EMAIL_USER}>`,
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

const sendPasswordResetEmail = async (email, resetToken, userName) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        .container { max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; }
        .header { background: #10b981; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
        .logo { color: white; font-size: 32px; font-weight: bold; margin-bottom: 10px; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
        .logo-nu { color: #ffffff; background: #059669; padding: 2px 8px; border-radius: 6px; margin-right: 2px; }
        .logo-me { color: #ffffff; background: #0891b2; padding: 2px 8px; border-radius: 6px; margin-left: 2px; }
        .content { background: white; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .button { display: inline-block; background: #10b981; color: white !important; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        .warning { background: #fef3cd; border: 2px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">
            <span class="logo-nu">Nu</span><span class="logo-me">me</span> ✨
          </div>
          <p style="color: #ffffff; margin: 0; opacity: 0.95; font-size: 16px;">Your Nutrition Journey Starts Here</p>
        </div>
        
        <div class="content">
          <h2 style="color: #1f2937; margin-bottom: 20px; font-size: 24px;">🔒 Password Reset Request</h2>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            Hello <strong>${userName || 'there'}</strong>,
          </p>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            We received a request to reset your <strong>Nume</strong> account password. If you made this request, click the button below to choose a new password:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" class="button" style="color: white; text-decoration: none;">🔐 Reset My Password</a>
          </div>
          
          <div class="warning">
            <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: bold;">
              ⏰ Important Security Notice
            </p>
            <p style="margin: 10px 0 0 0; color: #92400e; font-size: 14px;">
              This link expires in <strong>10 minutes</strong> for your security. 
              If you didn't request this reset, you can safely ignore this email.
            </p>
          </div>
          
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #6b7280; font-size: 12px; line-height: 1.4;">
              <strong>Trouble clicking the button?</strong> Copy and paste this link into your browser:
            </p>
            <p style="margin: 5px 0 0 0; color: #10b981; font-size: 12px; word-break: break-all;">
              ${resetUrl}
            </p>
          </div>
        </div>
        
        <div class="footer">
          <p style="margin: 0 0 10px 0; font-weight: bold;">
            <span style="color: #059669; background: #ecfdf5; padding: 2px 6px; border-radius: 4px;">Nu</span><span style="color: #0891b2; background: #ecfeff; padding: 2px 6px; border-radius: 4px;">me</span> Platform
          </p>
          <p style="margin: 0;">Questions? Contact us at support@nume.app</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    email,
    subject: '🔒 Reset Your Nume Password',
    html,
  });
};

const sendPasswordChangeConfirmationEmail = async (email, userName) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        .container { max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; }
        .header { background: #059669; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
        .logo { color: white; font-size: 32px; font-weight: bold; margin-bottom: 10px; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
        .logo-nu { color: #ffffff; background: #047857; padding: 2px 8px; border-radius: 6px; margin-right: 2px; }
        .logo-me { color: #ffffff; background: #0891b2; padding: 2px 8px; border-radius: 6px; margin-left: 2px; }
        .content { background: white; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .success { background: #d1fae5; border: 2px solid #10b981; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        .security-tips { background: #f0f9ff; border: 2px solid #0ea5e9; padding: 15px; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">
            <span class="logo-nu">Nu</span><span class="logo-me">me</span> ✨
          </div>
          <p style="color: #ffffff; margin: 0; opacity: 0.95; font-size: 16px;">Your Nutrition Journey Starts Here</p>
        </div>
        
        <div class="content">
          <h2 style="color: #1f2937; margin-bottom: 20px; font-size: 24px;">✅ Password Successfully Changed</h2>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            Hello <strong>${userName || 'there'}</strong>,
          </p>
          
          <div class="success">
            <p style="margin: 0; color: #047857; font-size: 18px; font-weight: bold;">
              🎉 Great news!
            </p>
            <p style="margin: 10px 0 0 0; color: #047857; font-size: 16px;">
              Your <strong>Nume</strong> account password has been successfully updated.
            </p>
          </div>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            Your account is now secure with your new password. You can continue using Nume with confidence.
          </p>
          
          <div class="security-tips">
            <p style="margin: 0 0 10px 0; color: #0369a1; font-size: 16px; font-weight: bold;">
              🛡️ Security Reminder
            </p>
            <ul style="margin: 0; padding-left: 20px; color: #0369a1; font-size: 14px; line-height: 1.5;">
              <li>Never share your password with anyone</li>
              <li>Use a unique password for your Nume account</li>
              <li>Consider using a password manager</li>
              <li>Log out from shared devices</li>
            </ul>
          </div>
          
          <div style="background: #fef2f2; border: 2px solid #ef4444; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #dc2626; font-size: 14px; font-weight: bold;">
              ⚠️ Didn't make this change?
            </p>
            <p style="margin: 5px 0 0 0; color: #dc2626; font-size: 14px;">
              If you didn't change your password, please contact our support team immediately at <strong>support@nume.app</strong>
            </p>
          </div>
        </div>
        
        <div class="footer">
          <p style="margin: 0 0 10px 0; font-weight: bold;">
            <span style="color: #059669; background: #ecfdf5; padding: 2px 6px; border-radius: 4px;">Nu</span><span style="color: #0891b2; background: #ecfeff; padding: 2px 6px; border-radius: 4px;">me</span> Platform
          </p>
          <p style="margin: 0;">Password changed on ${new Date().toLocaleDateString()}</p>
          <p style="margin: 5px 0 0 0;">Questions? Contact us at support@nume.app</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    email,
    subject: '✅ Your Nume Password Has Been Changed',
    html,
  });
};

const sendWelcomeEmail = async (email, name) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        .container { max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; }
        .header { background: #0891b2; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
        .logo { color: white; font-size: 32px; font-weight: bold; margin-bottom: 10px; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
        .logo-nu { color: #ffffff; background: #059669; padding: 2px 8px; border-radius: 6px; margin-right: 2px; }
        .logo-me { color: #ffffff; background: #0369a1; padding: 2px 8px; border-radius: 6px; margin-left: 2px; }
        .content { background: white; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .button { display: inline-block; background: #0891b2; color: white !important; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        .welcome-box { background: #f0f9ff; border: 2px solid #0ea5e9; padding: 20px; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">
            <span class="logo-nu">Nu</span><span class="logo-me">me</span> ✨
          </div>
          <p style="color: #ffffff; margin: 0; opacity: 0.95; font-size: 16px;">Your Nutrition Journey Starts Here</p>
        </div>
        
        <div class="content">
          <h2 style="color: #1f2937; margin-bottom: 20px; font-size: 28px;">🎉 Welcome to Nume!</h2>
          
          <p style="color: #4b5563; font-size: 18px; line-height: 1.6;">
            Hello <strong>${name}</strong>,
          </p>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            Welcome to <strong>Nume</strong>! We're excited to help you on your nutrition journey. Your account is now ready and you can start exploring all our features.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.CLIENT_URL}/login" class="button" style="color: white; text-decoration: none;">🚀 Start Your Journey</a>
          </div>
          
          <div class="welcome-box">
            <h3 style="color: #0369a1; margin-top: 0; font-size: 18px;">🎯 What's next?</h3>
            <ul style="color: #0369a1; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
              <li><strong>Complete your profile</strong> - Add your health information</li>
              <li><strong>Set your nutrition goals</strong> - Define what you want to achieve</li>
              <li><strong>Connect with professional dieticians</strong> - Find the right expert for you</li>
              <li><strong>Start tracking your progress</strong> - Monitor your journey</li>
            </ul>
          </div>
        </div>
        
        <div class="footer">
          <p style="margin: 0 0 10px 0; font-weight: bold; font-size: 16px;">
            Welcome to the <span style="color: #059669; background: #ecfdf5; padding: 2px 6px; border-radius: 4px;">Nu</span><span style="color: #0891b2; background: #ecfeff; padding: 2px 6px; border-radius: 4px;">me</span> family! 🌟
          </p>
          <p style="margin: 0;">Questions? We're here to help at support@nume.app</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    email,
    subject: '🎉 Welcome to Nume - Your Nutrition Journey Begins!',
    html,
  });
};

module.exports = {
  sendEmail,
  sendPasswordResetEmail,
  sendPasswordChangeConfirmationEmail,
  sendWelcomeEmail,
};