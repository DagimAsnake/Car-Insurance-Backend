const express = require('express');
const router = express.Router();
const { createProfile, getProfile, updateProfile, deleteProfile } = require('../controllers/profileController');
const { isLoggedIn } = require('../middlewares/isLoggedIn');

// Protect all routes with authentication middleware
router.use(isLoggedIn);

// Routes
router.post('/', createProfile);    
router.get('/', getProfile);        
router.put('/', updateProfile);     
router.delete('/', deleteProfile);  

module.exports = router;
