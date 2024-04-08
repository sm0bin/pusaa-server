const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/auth/signup', userController.signupUser);
router.post('/auth/login', userController.loginUser);
router.post('/auth/forgot-password', userController.forgotPassword);
router.post('/auth/reset-password/:token', userController.resetPassword);
router.get('/:email', verifyToken, userController.getUserByEmail);
router.post('/create-jwt', userController.createUserJWT);
router.put('/:email', verifyToken, userController.updateUser);
router.delete('/:email', verifyToken, userController.deleteUser);
// Define routes for update and delete operations

module.exports = router;
