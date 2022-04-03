const express = require('express');
const router = express.Router();
const apartmentController = require('../controllers/apartmentController')

router.get('/', apartmentController.getAllApartments);
router.get('/:apartmentId', apartmentController.getApartment);
router.post('/', apartmentController.createApartment);
router.put('/:apartmentId', apartmentController.updateApartment);
router.put('/status/:apartmentId', apartmentController.changeStatus);
router.delete('/:apartmentId', apartmentController.deleteApartment);
router.get("/byBuilding/:buildingId", apartmentController.getApartmentByBuilding),
router.get("/byFloor/:floorId", apartmentController.getApartmentByFloor),
router.put("/owner/:apartmentId", apartmentController.updateApartmentOwner),

module.exports = router;
