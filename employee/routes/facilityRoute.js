const express = require('express');
const router = express.Router();
const facilityController = require("../controllers/facilityController")

router.get('/', facilityController.getAllFacilities);
router.get('/:facilityId', facilityController.findFacility)
router.post('/', facilityController.createFacility);
router.put('/update/:facilityId', facilityController.updateFacility);
router.delete('/:facilityId', facilityController.deleteFacility);

module.exports = router;