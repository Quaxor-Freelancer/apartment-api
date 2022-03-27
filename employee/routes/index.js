const express = require('express');
const router = express.Router();

router.use('/buildings', require('./buildingRoute'));
router.use('/apartments', require('./apartmentRoute'));
router.use('/floors', require('./floorRoute'));

module.exports = router;