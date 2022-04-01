const express = require('express');
const router = express.Router();
const buildingFacilityController = require("../controllers/buildingFacilityController")

router.get('/byBuilding/:buildingId', buildingFacilityController.getAllFacilities);
router.get('/:buildingFacilityId', buildingFacilityController.findFacility)
router.post('/:buildingId', buildingFacilityController.createFacility);
router.put('/update/:buildingFacilityId', buildingFacilityController.updateFacility);
router.delete('/:buildingFacilityId', buildingFacilityController.deleteFacility);

module.exports = router;