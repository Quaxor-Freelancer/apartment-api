const apartmentService = require('../services/apartmentServices')

const getAllApartments = (req, res, next) => {
    apartmentService.getAllApartments()
    .then((data)=>{
        res.json(data)
    })
    .catch(error=>next(error))
}

const getApartment = (req, res, next) => {
    apartmentService.getApartment(req.params)
    .then((data)=>{
        res.json(data)
    })
    .catch(error=>next(error))
}

const createApartment = (req, res, next) => {
    apartmentService.createApartment(req.body)
    .then(()=>{
        res.json({success: true})
    })
    .catch(error=>next(error))
}

const updateApartment = (req, res, next) => {
    apartmentService.updateApartment(req.params, req.body)
    .then(()=>{
        res.json({success: true})
    })
    .catch(error=>next(error))
}

const deleteApartment = (req, res, next) => {
    apartmentService.deleteApartment(req.params)
    .then(()=>{
        res.json({success: true})
    })
    .catch(error=>next(error))
}

const changeStatus = (req, res, next) => {
    apartmentService.changeStatus(req.params, req.body)
    .then(()=>{
        res.json({success: true})
    })
    .catch(error=>next(error))
}

const getApartmentByFloor = (req, res, next) => {
    apartmentService.getApartmentByFloor(req.params)
    .then((data)=>{
        res.json(data)
    })
    .catch(error=>next(error))
}

const getApartmentByBuilding = (req, res, next) => {
    apartmentService.getApartmentByBuilding(req.params)
    .then((data)=>{
        res.json(data)
    })
    .catch(error=>next(error))
}

const updateApartmentOwner = (req, res, next) => {
    apartmentService.updateApartmentOwner(req.params, req.body)
    .then(()=>{
        res.json({success: true})
    })
    .catch(error=>next(error))
}

module.exports = {
    getAllApartments,
    getApartment,
    createApartment,
    updateApartment,
    deleteApartment,
    changeStatus,
    getApartmentByFloor,
    getApartmentByBuilding,
    updateApartmentOwner
}