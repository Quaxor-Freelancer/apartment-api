const facilityServices = require('../services/facilityServices')

const getAllFacilitiesByBuilding = (req, res, next) => {
    const { buildingId } = req.params
    const { common } = req.query;
    facilityServices.getAllFacilitiesByBuilding(buildingId, { common })
        .then((facilities) => {
            return res.json(facilities)
        })
        .catch(error => next(error))
}

const getAllFacilitiesByFloor = (req, res, next) => {
    const { floorId } = req.params
    facilityServices.getAllFacilitiesByFloor(floorId)
        .then((facilities) => {
            return res.json(facilities)
        })
        .catch(error => next(error))
}

const getFacilityById = (req, res, next) => {
    const { facilityId } = req.params
    facilityServices.getFacilityById(facilityId)
        .then((facility) => {
            return res.json(facility)
        })
        .catch(error => next(error))
}

const createFacility = (req, res, next) => {
    const { buildingId } = req.params
    facilityServices.createFacility(buildingId, req.body)
        .then((facility) => {
            return res.status(201).json(facility)
        })
        .catch(error => next(error))
}


const updateFacility = (req, res, next) => {
    const { facilityId } = req.params
    facilityServices.updateFacility(facilityId, req.body)
        .then(() => {
            return res.status(201).json({ success: true })
        })
        .catch(error => next(error))
}

const deleteFacility = (req, res, next) => {
    const { facilityId } = req.params
    facilityServices.deleteFacility(facilityId)
        .then(() => {
            return res.status(201).json({ success: true })
        })
        .catch(error => next(error))
};

module.exports = {
    getAllFacilitiesByBuilding,
    getAllFacilitiesByFloor,
    getFacilityById,
    createFacility,
    updateFacility,
    deleteFacility
}