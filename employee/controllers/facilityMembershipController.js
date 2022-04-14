const facilityMembershipServices = require('../services/facilityMembershipServices')

const getAllFacilityMembershipsByApartment = (req, res, next) => {
    const { apartmentId } = req.params
    facilityMembershipServices.getAllFacilityMembershipsByApartment(apartmentId)
        .then((facilityMemberships) => {
            return res.json(facilityMemberships)
        })
        .catch(error => next(error))
}

const getAllFacilityMembershipsByFacility = (req, res, next) => {
    const { facilityId } = req.params
    facilityMembershipServices.getAllFacilityMembershipsByFacility(facilityId)
        .then((facilityMemberships) => {
            return res.json(facilityMemberships)
        })
        .catch(error => next(error))
}

const getAllFacilityMembershipsByApartmentAndFacility = (req, res, next) => {
    const { apartmentId, facilityId } = req.params
    facilityMembershipServices.getAllFacilityMembershipsByApartmentAndFacility(apartmentId, facilityId)
        .then((facilityMemberships) => {
            return res.json(facilityMemberships)
        })
        .catch(error => next(error))
}

const getAllFacilityMembershipsByApartmentAndFacilityCategory = (req, res, next) => {
    const { apartmentId, facilityCategoryId } = req.params
    facilityMembershipServices.getAllFacilityMembershipsByApartmentAndFacilityCategory(apartmentId, facilityCategoryId)
        .then((facilityMemberships) => {
            return res.json(facilityMemberships)
        })
        .catch(error => next(error))
}

const createFacilityMembership = (req, res, next) => {
    facilityMembershipServices.createFacilityMembership(req.body)
        .then((facilityMembership) => {
            return res.status(201).json(facilityMembership)
        })
        .catch(error => next(error))
}

const findFacilityMembership = (req, res, next) => {
    const { membershipId } = req.params
    facilityMembershipServices.findFacilityMembership(membershipId)
        .then((facilityMembership) => {
            return res.json(facilityMembership)
        })
        .catch(error => next(error))
}

const updateFacilityMembership = (req, res, next) => {
    const { membershipId } = req.params
    facilityMembershipServices.updateFacilityMembership(membershipId, req.body)
        .then(() => {
            return res.status(201).json({ success: true })
        })
        .catch(error => next(error))
}

const deleteFacilityMembership = (req, res, next) => {
    const { membershipId } = req.params
    facilityMembershipServices.deleteFacilityMembership(membershipId)
        .then((response) => {
            if (response.n === 0) {
                return res.status(400).json({ status: false, error: "Facility not Found" })
            }
            return res.status(201).json({ success: true })
        })
        .catch(error => next(error))
};

module.exports = {
    getAllFacilityMembershipsByApartment,
    getAllFacilityMembershipsByFacility,
    getAllFacilityMembershipsByApartmentAndFacility,
    getAllFacilityMembershipsByApartmentAndFacilityCategory,
    findFacilityMembership,
    createFacilityMembership,
    updateFacilityMembership,
    deleteFacilityMembership
}