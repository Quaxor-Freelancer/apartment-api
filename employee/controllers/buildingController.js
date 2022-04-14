const buildingService = require('../services/buildingService')

const getAllBuildings = (req, res, next) => {
    buildingService.getAllBuildings()
        .then((data) => {
            res.json(data)
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
    buildingService.getBuilding({ buildingId })
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
}

const createBuilding = (req, res) => {
    const { buildingCode, name, city, country, address, buildingType, facilityIds, floors, status, resourceIds } = req.body
    if (!name) {
        return res.status(500).send("Bad Request")
    }
    buildingService.createBuilding({ buildingCode, name, city, country, address, buildingType, facilityIds, floors, status, resourceIds })
        .then(() => {
            res.status(201).json({ status: true })
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
        .catch(error => next(error))
}

const updateBuilding = (req, res) => {
    const { buildingId } = req.params
    const { buildingCode, name, city, country, address, buildingType, facilityIds, floors, status, resourceIds } = req.body
    if (!buildingId || !name) {
        return res.status(500).send("Bad Request")
    }
    buildingService.updateBuilding({ buildingId, buildingCode, name, city, country, address, buildingType, facilityIds, floors, status, resourceIds })
        .then(() => {
            res.status(201).json({ status: true })
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
    buildingService.deleteBuilding({ buildingId })
        .then(() => {
            res.status(201).json({ status: true })
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
            res.status(201).json({ status: true })
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