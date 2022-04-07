const buildingService = require('../services/buildingService')

const getAllBuildings = (req, res, next) => {
    buildingService.getAllBuildings()
        .then((data) => {
            res.status(201).json(data)
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
}

const getBuilding = (req, res, next) => {
    const { buildingId } = req.params
    if (!buildingId) {
        return res.status(500).send("Bad Request")
    }
    buildingService.getBuilding({buildingId})
        .then((data) => {
            console.log(data)
            res.status(201).json(data)
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
}

const createBuilding = (req, res) => {
    const { buildingCode, name, city, country, address, buildingServiceType, facilityIds, floors, images, status } = req.body
    if (!name) {
        return res.status(500).send("Bad Request")
    }
    buildingService.createBuilding({ buildingCode, name, city, country, address, buildingServiceType, facilityIds, floors, images, status })
        .then(() => {
            res.json({ status: true })
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
        .catch(error => next(error))
}

const updateBuilding = (req, res) => {
    const { buildingId } = req.params
    const { buildingCode, name, city, country, address, buildingType, facilityIds, floors, images, status } = req.body
    if (!buildingId || !name) {
        return res.status(500).send("Bad Request")
    }
    buildingService.updateBuilding({ buildingId, buildingCode, name, city, country, address, buildingType, facilityIds, floors, images, status })
        .then(() => {
            res.json({ status: true })
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
        .catch(error => next(error))
}

const deleteBuilding = (req, res) => {
    const { buildingId } = req.params
    if (!buildingId) {
        return res.status(500).send("Bad Request")
    }
    buildingService.deleteBuilding({buildingId})
        .then(() => {
            res.json({ status: true })
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
        .catch(error => next(error))
}

const changeStatus = (req, res) => {
    const { buildingId } = req.params
    const { status } = req.body
    if (!buildingId || !status) {
        return res.status(500).send("Bad Request")
    }
    buildingService.changeStatus({ buildingId, status })
        .then(() => {
            res.json({ status: true })
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
        .catch(error => next(error))
}


module.exports = {
    getAllBuildings,
    getBuilding,
    createBuilding,
    updateBuilding,
    deleteBuilding,
    changeStatus
}