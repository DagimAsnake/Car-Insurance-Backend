const express = require('express');
const cors = require('cors');
const {
  registerUserCtrl,
  loginUserCtrl,
  getUserProfileCtrl
} = require('../controllers/userController.js');
const { isLoggedIn } = require('../middlewares/isLoggedIn.js');

const userRoutes = express.Router();
userRoutes.use(cors());
userRoutes.post('/register', registerUserCtrl);
userRoutes.post('/login', loginUserCtrl);
userRoutes.get("/profile", isLoggedIn, getUserProfileCtrl);

module.exports = userRoutes;
