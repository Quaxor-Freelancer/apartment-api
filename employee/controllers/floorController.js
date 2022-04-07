const floorService = require('../services/buildingService')

const getAllFloorByBuilding = (req, res) => {
    const { buildingId } = req.params
    if (!buildingId) {
        return res.status(500).send("Bad Request")
    }
    buildingService.getAllFloorByBuilding({buildingId})
        .then((data) => {
            res.status(201).json(data[0].floors)
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
}

const getFloor = (req, res) => {
    const { floorId } = req.params
    if (!floorId) {
        return res.status(500).send("Bad Request")
    }
    buildingService.getFloor({floorId})
        .then((data) => {
            res.status(201).json(data.floor)
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
}

const createFloor = (req, res) => {
    const { buildingId } = req.params
    const { code, name, details, status, images } = req.body
    if (!buildingId || !code || !name) {
        return res.status(500).send("Bad Request")
    }
    buildingService.createFloor({ buildingId, code, name, details, status, images })
        .then(() => {
            res.json({ status: true })
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
        .catch(error => next(error))
}

const updateFloor = (req, res) => {
    const { floorId } = req.params
    const { code, name, details, status, images } = req.body
    if (!floorId || !code || !name) {
        return res.status(500).send("Bad Request")
    }
    buildingService.updateFloor({ floorId, code, name, details, status, images })
        .then(() => {
            res.json({ status: true })
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
        .catch(error => next(error))
}

const deleteFloor = (req, res) => {
    const { floorId } = req.params
    if (!floorId) {
        return res.status(500).send("Bad Request")
    }
    buildingService.deleteFloor({floorId})
        .then(() => {
            res.json({ status: true })
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
        .catch(error => next(error))
}

const changeFloorStatus = (req, res) => {
    const { floorId } = req.params
    const { status } = req.body
    if (!buildingId || !status) {
        return res.status(500).send("Bad Request")
    }
    buildingService.changeFloorStatus({ floorId, status })
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
    getAllFloorByBuilding,
    getFloor,
    createFloor,
    updateFloor,
    deleteFloor,
    changeFloorStatus
}