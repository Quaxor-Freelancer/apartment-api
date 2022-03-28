const buildingService = require('../services/buildingService')

const getAllBuildings = (req, res) => {
    buildingService.getAllBuildings()
    .then((data)=>{
        res.status(201).json(data)
    })
    .catch((err)=>{
        console.log(err)
        return res.status(500).send("Internal Server Error")
    })
}

const getBuilding = (req, res) => {
    const {buildingId} = req.params
    if (!buildingId) {
        return res.status(500).send("Bad Request")
    }
    buildingService.getBuilding(buildingId)
    .then((data)=>{
        console.log(data)
        res.status(201).json(data)
    })
    .catch((err)=>{
        console.log(err)
        return res.status(500).send("Internal Server Error")
    })
}

const createBuilding = (req, res) => {
    const {buildingServiceCode, name, city, country, address, buildingServiceType, facilityIds, floors, images, status} = req.body
    if (!name) {
        return res.status(500).send("Bad Request")
    }
    buildingService.createBuilding({buildingServiceCode, name, city, country, address, buildingServiceType, facilityIds, floors, images, status})
    .then(()=>{
        res.json({status: true})
    })
    .catch((err)=>{
        console.log(err)
        return res.status(500).send("Internal Server Error")
    })
}

const updateBuilding = (req, res) => {
    const {buildingId} = req.params
    const {buildingServiceCode, name, city, country, address, buildingServiceType, facilityIds, floors, images, status} = req.body
    if (!buildingId || !name) {
        return res.status(500).send("Bad Request")
    }
    buildingService.updateBuilding({buildingId, buildingServiceCode, name, city, country, address, buildingServiceType, facilityIds, floors, images, status})
    .then(()=>{
        res.json({status: true})
    })
    .catch((err)=>{
        console.log(err)
        return res.status(500).send("Internal Server Error")
    })
}

const deleteBuilding = (req, res) => {
    const {buildingId} = req.params
    if (!buildingId) {
        return res.status(500).send("Bad Request")
    }
    buildingService.deleteBuilding(buildingId)
    .then(()=>{
        res.json({status: true})
    })
    .catch((err)=>{
        console.log(err)
        return res.status(500).send("Internal Server Error")
    })
}

const changeStatus = (req, res) => {
    const {buildingId} = req.params
    const {status} = req.body
    if (!buildingId || !status) {
        return res.status(500).send("Bad Request")
    }
    buildingService.changeStatus({buildingId, status})
    .then(()=>{
        res.json({status: true})
    })
    .catch((err)=>{
        console.log(err)
        return res.status(500).send("Internal Server Error")
    })
}

const getAllFloorByBuilding = (req, res) => {
    const {buildingId} = req.params
    if (!buildingId) {
        return res.status(500).send("Bad Request")
    }
    buildingService.getAllFloorByBuilding(buildingId)
    .then((data)=>{
        res.status(201).json(data)
    })
    .catch((err)=>{
        console.log(err)
        return res.status(500).send("Internal Server Error")
    })
}

const getFloor = (req, res) => {
    const {floorId} = req.params
    if (!floorId) {
        return res.status(500).send("Bad Request")
    }
    buildingService.getFloor(floorId)
    .then((data)=>{
        res.status(201).json(data)
    })
    .catch((err)=>{
        console.log(err)
        return res.status(500).send("Internal Server Error")
    })
}

const createFloor = (req, res) => {
    const {buildingId} = req.params
    const {code, name, details, status, images} = req.body
    if (!buildingId || !code || !name) {
        return res.status(500).send("Bad Request")
    }
    buildingService.createFloor({buildingId, code, name, details, status, images})
    .then(()=>{
        res.json({status: true})
    })
    .catch((err)=>{
        console.log(err)
        return res.status(500).send("Internal Server Error")
    })
}

const updateFloor = (req, res) => {
    const {floorId} = req.params
    const {code, name, details, status, images} = req.body
    if (!floorId || !code || !name) {
        return res.status(500).send("Bad Request")
    }
    buildingService.updateFloor({floorId, code, name, details, status, images})
    .then(()=>{
        res.json({status: true})
    })
    .catch((err)=>{
        console.log(err)
        return res.status(500).send("Internal Server Error")
    })
}

const deleteFloor = (req, res) => {
    const {floorId} = req.params
    if (!floorId) {
        return res.status(500).send("Bad Request")
    }
    buildingService.deleteFloor(floorId)
    .then(()=>{
        res.json({status: true})
    })
    .catch((err)=>{
        console.log(err)
        return res.status(500).send("Internal Server Error")
    })
}

const changeFloorStatus = (req, res) => {
    const {floorId} = req.params
    const {status} = req.body
    if (!buildingId || !status) {
        return res.status(500).send("Bad Request")
    }
    buildingService.changeFloorStatus({floorId, status})
    .then(()=>{
        res.json({status: true})
    })
    .catch((err)=>{
        console.log(err)
        return res.status(500).send("Internal Server Error")
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