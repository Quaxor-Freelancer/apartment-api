const express = require('express');
const router = express.Router();
const facilityMembershipController = require("../controllers/facilityMembershipController")

router.get('/byApartment/:apartmentId', facilityMembershipController.getAllFacilityMembershipsByApartment);
router.get('/byFacility/:facilityId', facilityMembershipController.getAllFacilityMembershipsByFacility);
router.get('/byApartment/byFacility/:apartmentId/:facilityId', facilityMembershipController.getAllFacilityMembershipsByApartmentAndFacility);
router.get('/byApartment/byFacilityCategory/:apartmentId/:facilityCategoryId', facilityMembershipController.getAllFacilityMembershipsByApartmentAndFacilityCategory);
router.get('/:membershipId', facilityMembershipController.findFacilityMembership)
router.post('/:facilityId', facilityMembershipController.createFacilityMembership);
router.put('/update/:membershipId', facilityMembershipController.updateFacilityMembership);
router.delete('/:membershipId', facilityMembershipController.deleteFacilityMembership);

module.exports = router;