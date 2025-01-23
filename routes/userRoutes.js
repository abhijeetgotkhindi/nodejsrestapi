// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.get('/', userController.getAllUsers);
router.get('/:oid', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:oid', userController.updateUser);
router.delete('/:oid', userController.deleteUser);

module.exports = router;
