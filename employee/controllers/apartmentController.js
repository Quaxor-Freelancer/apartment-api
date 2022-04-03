const apartmentService = require('../services/apartmentServices')

const getAllApartments = (req, res, next) => {
    apartmentService.getAllApartments()
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log(err)
    })
}

const getApartment = (req, res, next) => {
    const {apartmentId} = req.params
    apartmentService.getApartment(apartmentId)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log(err)
    })
}

const createApartment = (req, res, next) => {
    const {code, name, details, floorId, images, status} = req.body
    apartmentService.createApartment({code, name, details, floorId, images, status})
    .then(()=>{
        res.json({success: true})
    })
    .catch((err)=>{
        console.log(err)
    })
}

const updateApartment = (req, res, next) => {
    const {apartmentId} = req.params
    const {code, name, details, floorId, images, status} = req.body
    apartmentService.updateApartment({apartmentId, code, name, details, floorId, images, status})
    .then(()=>{
        res.json({success: true})
    })
    .catch((err)=>{
        console.log(err)
    })
}

const deleteApartment = (req, res, next) => {
    const {apartmentId} = req.params
    apartmentService.deleteApartment(apartmentId)
    .then(()=>{
        res.json({success: true})
    })
    .catch((err)=>{
        console.log(err)
    })
}

const changeStatus = (req, res, next) => {
    const {apartmentId} = req.params
    const {status} = req.body
    apartmentService.changeStatus({apartmentId, status})
    .then(()=>{
        res.json({success: true})
    })
    .catch((err)=>{
        console.log(err)
    })
}

const getApartmentByFloor = (req, res, next) => {
    const {floorId} = req.params
    apartmentService.getApartmentByFloor(floorId)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log(err)
    })
}

const getApartmentByBuilding = (req, res, next) => {
    const {buildingId} = req.params
    apartmentService.getApartmentByBuilding(buildingId)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log(err)
    })
}

const updateApartmentOwner = (req, res, next) => {
    const { apartmentId} = req.params
    apartmentService.updateApartmentOwner(apartmentId, req.body)
    .then(()=>{
        res.json({success: true})
    })
    .catch((err)=>next(err))
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