const buildingService = require('../services/buildingService')

const getAllBuildings = (req, res) => {
    buildingService.getAllBuildings()
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log(err)
    })
}

const getBuilding = (req, res) => {
    const {buildingId} = req.params
    buildingService.getBuilding(buildingId)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log(err)
    })
}

const createBuilding = (req, res) => {
    const {buildingServiceCode, name, city, country, address, buildingServiceType, facilityIds, floors, images, status} = req.body
    buildingService.createBuilding({buildingServiceCode, name, city, country, address, buildingServiceType, facilityIds, floors, images, status})
    .then(()=>{
        res.json({status: true})
    })
    .catch((err)=>{
        console.log(err)
    })
}

const updateBuilding = (req, res) => {
    const {buildingId} = req.params
    const {buildingServiceCode, name, city, country, address, buildingServiceType, facilityIds, floors, images, status} = req.body
    buildingService.updateBuilding({buildingId, buildingServiceCode, name, city, country, address, buildingServiceType, facilityIds, floors, images, status})
    .then(()=>{
        res.json({status: true})
    })
    .catch((err)=>{
        console.log(err)
    })
}

const deleteBuilding = (req, res) => {
    const {buildingId} = req.params
    buildingService.deleteBuilding(buildingId)
    .then(()=>{
        res.json({status: true})
    })
    .catch((err)=>{
        console.log(err)
    })
}

const changeStatus = (req, res) => {
    const {buildingId} = req.params
    const {status} = req.body
    buildingService.changeStatus({buildingId, status})
    .then(()=>{
        res.json({status: true})
    })
    .catch((err)=>{
        console.log(err)
    })
}

const getAllFloorByBuilding = (req, res) => {
    const {buildingId} = req.params
    console.log(buildingId)
    buildingService.getAllFloorByBuilding(buildingId)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log(err)
    })
}

const getFloor = (req, res) => {
    const {floorId} = req.params
    buildingService.getFloor(floorId)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log(err)
    })
}

const createFloor = (req, res) => {
    const {buildingId} = req.params
    const {code, name, details, status, images} = req.body
    buildingService.createFloor({buildingId, code, name, details, status, images})
    .then(()=>{
        res.json({status: true})
    })
    .catch((err)=>{
        console.log(err)
    })
}

const updateFloor = (req, res) => {
    const {floorId} = req.params
    const {code, name, details, status, images} = req.body
    buildingService.updateFloor({floorId, code, name, details, status, images})
    .then(()=>{
        res.json({status: true})
    })
    .catch((err)=>{
        console.log(err)
    })
}

const deleteFloor = (req, res) => {
    const {floorId} = req.params
    buildingService.deleteFloor(floorId)
    .then(()=>{
        res.json({status: true})
    })
    .catch((err)=>{
        console.log(err)
    })
}

const changeFloorStatus = (req, res) => {
    const {floorId} = req.params
    const {status} = req.body
    buildingService.changeFloorStatus({floorId, status})
    .then(()=>{
        res.json({status: true})
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports = {
    getAllBuildings,
    getBuilding,
    createBuilding,
    updateBuilding,
    deleteBuilding,
    changeStatus,
    getAllFloorByBuilding,
    getFloor,
    createFloor,
    updateFloor,
    deleteFloor,
    changeFloorStatus
}