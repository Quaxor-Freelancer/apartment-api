const express = require('express');
const router = express.Router();
const buildingController = require('../controllers/buildingController')

router.get('/:floorId', buildingController.getFloor);
router.get('/byBuilding/:buildingId', buildingController.getAllFloorByBuilding);
router.post('/:buildingId', buildingController.createFloor);
router.put('/:floorId', buildingController.updateFloor);
router.put('/status/:floorId', buildingController.changeFloorStatus);
router.delete('/:floorId', buildingController.deleteFloor);

module.exports = router;