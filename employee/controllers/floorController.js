const floorService = require('../services/floorService')

const getAllFloorByBuilding = (req, res) => {
    const { buildingId } = req.params
    if (!buildingId) {
        return res.status(500).send("Bad Request")
    }
    floorService.getAllFloorByBuilding({ buildingId })
        .then((data) => {
            res.json(data[0].floors)
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
    floorService.getFloor({ floorId })
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
}

const createFloor = (req, res) => {
    const { buildingId } = req.params
    const { code, name, details, status } = req.body
    if (!buildingId || !code || !name) {
        return res.status(500).send("Bad Request")
    }
    floorService.createFloor({ buildingId, code, name, details, status })
        .then(() => {
            res.json.status(201)({ status: true })
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
        .catch(error => next(error))
}

const updateFloor = (req, res) => {
    const { floorId } = req.params
    const { code, name, details, status } = req.body
    if (!floorId || !code || !name) {
        return res.status(500).send("Bad Request")
    }
    floorService.updateFloor({ floorId, code, name, details, status })
        .then(() => {
            res.status(201).json({ status: true })
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
    floorService.deleteFloor({ floorId })
        .then(() => {
            res.status(201).json({ status: true })
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
    floorService.changeFloorStatus({ floorId, status })
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
    getAllFloorByBuilding,
    getFloor,
    createFloor,
    updateFloor,
    deleteFloor,
    changeFloorStatus
}