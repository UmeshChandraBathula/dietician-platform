const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { pool } = require('../utils/database');
const { generateToken, generateResetToken } = require('../utils/jwt');
const { sendPasswordResetEmail, sendWelcomeEmail } = require('../utils/email');

const register = async (req, res) => {
  const { name, email, password, role, phone, specialization } = req.body;

  try {
    const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    
    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const insertQuery = `
      INSERT INTO users (name, email, password, role, phone, specialization)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, name, email, role, created_at
    `;
    
    const values = [name, email, hashedPassword, role, phone, specialization];
    const result = await pool.query(insertQuery, values);
    
    const user = result.rows[0];
    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    await sendWelcomeEmail(email, name);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userQuery = 'SELECT * FROM users WHERE email = $1 AND is_active = true';
    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const user = userResult.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const userQuery = 'SELECT id, name FROM users WHERE email = $1 AND is_active = true';
    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No user found with this email address',
      });
    }

    const user = userResult.rows[0];
    const { resetToken, hashedToken, expireTime } = generateResetToken();

    const updateQuery = `
      UPDATE users 
      SET reset_password_token = $1, reset_password_expire = $2 
      WHERE id = $3
    `;
    await pool.query(updateQuery, [hashedToken, expireTime, user.id]);

    const emailSent = await sendPasswordResetEmail(email, resetToken);

    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: 'Error sending password reset email',
      });
    }

    res.json({
      success: true,
      message: 'Password reset email sent',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during password reset request',
    });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const userQuery = `
      SELECT id FROM users 
      WHERE reset_password_token = $1 
      AND reset_password_expire > NOW() 
      AND is_active = true
    `;
    const userResult = await pool.query(userQuery, [hashedToken]);

    if (userResult.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired password reset token',
      });
    }

    const user = userResult.rows[0];
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const updateQuery = `
      UPDATE users 
      SET password = $1, reset_password_token = NULL, reset_password_expire = NULL 
      WHERE id = $2
    `;
    await pool.query(updateQuery, [hashedPassword, user.id]);

    res.json({
      success: true,
      message: 'Password reset successful',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during password reset',
    });
  }
};

const getMe = async (req, res) => {
  res.json({
    success: true,
    data: {
      user: req.user,
    },
  });
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  getMe,
};