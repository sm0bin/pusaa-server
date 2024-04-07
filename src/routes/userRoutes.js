const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/create', userController.createUser);
router.get('/:email', verifyToken, userController.getUserByEmail);
router.post('/create-jwt', userController.createUserJWT);
router.put('/:email', verifyToken, userController.updateUser);
router.delete('/:email', verifyToken, userController.deleteUser);
// Define routes for update and delete operations

module.exports = router;
