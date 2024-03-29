const User = require('../model/User.js');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken.js');
const asyncHandler = require('express-async-handler');

module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //Check user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    //throw
    throw new Error('User already exists');
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //create the user
  const user = await User.create({
    email,
    password: hashedPassword,
  });
  // Generate token for the user
  const token = generateToken(user._id);

  res.status(201).json({
    status: 'success',
    message: 'User Registered Successfully',
    data: user,
    token: token,
  });
});

module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //Find the user in db by email only
  const userFound = await User.findOne({
    email,
  });
  if (userFound && (await bcrypt.compare(password, userFound?.password))) {
    res.json({
      status: 'success',
      message: 'User logged in successfully',
      userFound,
      token: generateToken(userFound?._id),
    });
  } else {
    throw new Error('Invalid login credentials');
  }
});

module.exports.getUserProfileCtrl = asyncHandler(async (req, res) => {
  //find the user
  const user = await User.findById(req.userAuthId);
  res.json({
    status: 'success',
    message: 'User profile fetched successfully',
    user,
  });
});

module.exports.changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  // Check if newPassword and confirmPassword match
  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      status: 'error',
      message: 'New password and confirm password do not match',
    });
  }

  // Find the user by ID
  const user = await User.findById(req.userAuthId);

  // Check if the old password matches
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return res.status(401).json({
      status: 'error',
      message: 'Old password is incorrect',
    });
  }

  // Hash the new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Update the user's password
  user.password = hashedPassword;
  await user.save();

  res.json({
    status: 'success',
    message: 'Password changed successfully',
  });
});
