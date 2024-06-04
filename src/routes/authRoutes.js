const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/jwt', authController.jwt);
router.get('/profile', verifyToken, authController.getProfile);
router.post("/profile", verifyToken, authController.createProfile);
router.put('/profile', authController.updateProfile);
// router.post('/signup', authController.signupUser);
// router.post('/login', authController.loginUser);
// router.post('/forgot-password', authController.forgotPassword);
// router.post('/reset-password/:token', authController.resetPassword);
// router.get('/verify', authController.verifyUser);
// router.get('/logout', authController.logoutUser);

module.exports = router;
