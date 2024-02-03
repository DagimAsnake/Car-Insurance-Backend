const Profile = require('../model/Profile.js');
const asyncHandler = require('express-async-handler');

const setAuthToken = (req) => {
  const token = req.headers['x-auth-token'];
  if (token) {
    req.userAuthId = token;
  }
};

module.exports.createProfile = asyncHandler(async (req, res) => {

   setAuthToken(req);
  const { firstName, lastName, phone, insurance, image } = req.body;

  const profile = await Profile.create({
    firstName,
    lastName,
    phone,
    insurance,
    image,
    user: req.userAuthId, 
  });

  res.status(201).json({
    status: 'success',
    message: 'Profile created successfully',
    data: profile,
  });
});


module.exports.getProfile = asyncHandler(async (req, res) => {

  setAuthToken(req);
  const profile = await Profile.findOne({ user: req.userAuthId }).populate('user'); 

  if (!profile) {
    return res.status(404).json({
      status: 'error',
      message: 'Profile not found',
    });
  }

  res.json({
    status: 'success',
    message: 'Profile fetched successfully',
    data: profile,
  });
});


module.exports.updateProfile = asyncHandler(async (req, res) => {

  setAuthToken(req);
  const { firstName, lastName, phone, insurance, image } = req.body;

  const profile = await Profile.findOneAndUpdate(
    { user: req.userAuthId },
    { firstName, lastName, phone, insurance, image },
    { new: true }
  );

  if (!profile) {
    return res.status(404).json({
      status: 'error',
      message: 'Profile not found',
    });
  }

  res.json({
    status: 'success',
    message: 'Profile updated successfully',
    data: profile,
  });
});


module.exports.deleteProfile = asyncHandler(async (req, res) => {
  setAuthToken(req);
  const profile = await Profile.findOneAndDelete({ user: req.userAuthId });

  if (!profile) {
    return res.status(404).json({
      status: 'error',
      message: 'Profile not found',
    });
  }

  res.json({
    status: 'success',
    message: 'Profile deleted successfully',
  });
});
