const buildingService = require('../services/buildingService')

const getAllBuildings = (req, res, next) => {
    buildingService.getAllBuildings()
    .then((data)=>{
        res.json(data)
    })
    .catch(error=>next(error))
}

const getBuilding = (req, res, next) => {
    const {buildingId} = req.params
    buildingService.getBuilding(buildingId)
    .then((data)=>{
        res.json(data)
    })
    .catch(error=>next(error))
}

const createBuilding = (req, res, next) => {
    buildingService.createBuilding(req.body)
    .then(()=>{
        res.json({success: true})
    })
    .catch(error=>next(error))
}

const updateBuilding = (req, res, next) => {
    buildingService.updateBuilding(req.params, req.body )
    .then(()=>{
        res.json({success: true})
    })
    .catch(error=>next(error))
}

const deleteBuilding = (req, res, next) => {
    buildingService.deleteBuilding(req.params)
    .then(()=>{
        res.json({success: true})
    })
    .catch(error=>next(error))
}

const changeStatus = (req, res, next) => {
    buildingService.changeStatus(req.params,req.body)
    .then(()=>{
        res.json({success: true})
    })
    .catch(error=>next(error))
}

const getAllFloorByBuilding = (req, res, next) => {
    buildingService.getAllFloorByBuilding({buildingId})
    .then((data)=>{
        res.json(data)
    })
    .catch(error=>next(error))
}

const getFloor = (req, res, next) => {
    buildingService.getFloor(req.params)
    .then((data)=>{
        res.json(data)
    })
    .catch(error=>next(error))
}

const createFloor = (req, res, next) => {
    buildingService.createFloor(req.params,req.body )
    .then(()=>{
        res.json({success: true})
    })
    .catch(error=>next(error))
}

const updateFloor = (req, res, next) => {
    buildingService.updateFloor(req.params,req.body )
    .then(()=>{
        res.json({success: true})
    })
    .catch(error=>next(error))
}

const deleteFloor = (req, res, next) => {
    buildingService.deleteFloor(req.params)
    .then(()=>{
        res.json({success: true})
    })
    .catch(error=>next(error))
}

const changeFloorStatus = (req, res, next) => {
    buildingService.changeFloorStatus(req.params, req.body)
    .then(()=>{
        res.json({success: true})
    })
    .catch(error=>next(error))
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