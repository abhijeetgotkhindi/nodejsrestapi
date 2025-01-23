// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Routes
// router.post('/', loginController.validatedUser); //old

router.post('/', function(req, res, next) {
    loginController.validatedUser(req, res);
});

module.exports = router;
