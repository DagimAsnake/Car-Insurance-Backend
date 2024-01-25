const express = require('express');
const {
  registerUserCtrl,
  loginUserCtrl,
  getUserProfileCtrl,
  changePassword
} = require('../controllers/userController.js');
const { isLoggedIn } = require('../middlewares/isLoggedIn.js');

const userRoutes = express.Router();

userRoutes.post('/register', registerUserCtrl);
userRoutes.post('/login', loginUserCtrl);
userRoutes.get("/profile", isLoggedIn, getUserProfileCtrl);
userRoutes.put('/change-password',  isLoggedIn, changePassword);

module.exports = userRoutes;
