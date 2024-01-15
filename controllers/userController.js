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
  res.status(201).json({
    status: 'success',
    message: 'User Registered Successfully',
    data: user,
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
