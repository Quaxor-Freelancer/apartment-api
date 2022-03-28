const express = require('express');
const router = express.Router();
const { ensureEmployee } = require('../../middlewares/authMiddleware')

router.use('/auth', require('./authRoute'));

router.use(ensureEmployee)
router.use('/employees', require('./employeeRoute'));
router.use('/roles', require('./roleRoute'));
router.use('/user', require('./userRoute'));
router.use('/buildings', require('./buildingRoute'));
router.use('/apartments', require('./apartmentRoute'));
router.use('/floors', require('./floorRoute'));


module.exports = router;