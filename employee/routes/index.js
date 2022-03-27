const express = require('express');
const router = express.Router();

// router.use('/auth', require('./auth'));
router.use('/employees', require('./employees'));
router.use('/roles', require('./roles'));

module.exports = router;