const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signupUser);
router.post('/login', authController.loginUser);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);
router.get('/verify', authController.verifyUser);
router.get('/logout', authController.logoutUser);
router.get('/profile', authController.getProfile);
router.post('/profile', authController.updateProfile);

module.exports = router;
