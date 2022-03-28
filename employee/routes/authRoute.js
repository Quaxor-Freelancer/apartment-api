const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.loginEmployeee)
router.post('/refreshToken', authController.tokenRefresh)
router.post('/forgotPassword/email', authController.forgotPassword)
router.post('/auth/forgotPassword/verify', authController.resetPassword)

module.exports = router;