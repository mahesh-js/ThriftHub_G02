const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/thrifthub', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  emailVerified: { type: Boolean, default: false },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

const User = mongoose.model('User', userSchema);

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Replace with your email
    pass: 'your-email-password', // Replace with your email password
  },
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'/index.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname,'/signup.html'));
});

app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, '/signin.html'));
});

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomBytes(20).toString('hex');

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    verificationToken,
  });

  await newUser.save();

  // Send verification email
  const verificationUrl = `http://localhost:${PORT}/verify-email?token=${verificationToken}`;
  await transporter.sendMail({
    to: email,
    subject: 'Verify Your Email',
    html: `Click <a href="${verificationUrl}">here</a> to verify your email.`,
  });

  res.send('Signup successful! Please check your email to verify your account.');
});

app.get('/verify-email', async (req, res) => {
  const { token } = req.query;
  const user = await User.findOne({ verificationToken: token });

  if (user) {
    user.emailVerified = true;
    user.verificationToken = undefined;
    await user.save();
    res.send('Email verified successfully!');
  } else {
    res.send('Invalid or expired token.');
  }
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && await bcrypt.compare(password, user.password)) {
    res.send('Signin successful!');
  } else {
    res.send('Invalid credentials.');
  }
});

app.get('/forgot-password', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'forgot-password.html'));
});

app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send reset password email
    const resetUrl = `http://localhost:${PORT}/reset-password?token=${resetToken}`;
    await transporter.sendMail({
      to: email,
      subject: 'Reset Your Password',
      html: `Click <a href="${resetUrl}">here</a> to reset your password.`,
    });

    res.send('Password reset email sent. Please check your email.');
  } else {
    res.send('No user found with that email.');
  }
});

app.get('/reset-password', async (req, res) => {
  const { token } = req.query;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (user) {
    res.sendFile(path.join(__dirname, 'views', 'reset-password.html'));
  } else {
    res.send('Invalid or expired token.');
  }
});

app.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (user) {
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.send('Password reset successful!');
  } else {
    res.send('Invalid or expired token.');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});