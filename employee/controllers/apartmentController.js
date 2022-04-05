const apartmentService = require('../services/apartmentServices')

const getAllApartments = (req, res, next) => {
    apartmentService.getAllApartments()
        .then((data) => {
            res.status(201).json(data)
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
}

const getApartment = (req, res) => {
    const { apartmentId } = req.params
    if (!apartmentId) {
        return res.status(500).send("Bad Request")
    }
    apartmentService.getApartment(apartmentId)
        .then((data) => {
            res.status(201).json(data)
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
}

const createApartment = (req, res) => {
    const { code, name, details, floorId, images, status } = req.body
    if (!code | !name || !floorId) {
        return res.status(500).send("Bad Request")
    }
    apartmentService.createApartment({ code, name, details, floorId, images, status })
        .then(() => {
            res.json({ status: true })
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
        .catch(error => next(error))
}

const updateApartment = (req, res) => {
    const { apartmentId } = req.params
    const { code, name, details, floorId, images, status } = req.body
    if (!apartmentId || !code | !name || !floorId) {
        return res.status(500).send("Bad Request")
    }
    apartmentService.updateApartment({ apartmentId, code, name, details, floorId, images, status })
        .then(() => {
            res.json({ status: true })
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
        .catch(error => next(error))
}

const deleteApartment = (req, res) => {
    const { apartmentId } = req.params
    if (!apartmentId) {
        return res.status(500).send("Bad Request")
    }
    apartmentService.deleteApartment(apartmentId)
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
    const { apartmentId } = req.params
    const { status } = req.body
    if (!apartmentId || status===undefined) {
        return res.status(500).send("Bad Request")
    }
    apartmentService.changeStatus({ apartmentId, status })
        .then(() => {
            res.json({ status: true })
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
        .catch(error => next(error))
}

const getApartmentByFloor = (req, res) => {
    const { floorId } = req.params
    if (!floorId) {
        return res.status(500).send("Bad Request")
    }
    apartmentService.getApartmentByFloor(floorId)
        .then((data) => {
            res.status(201).json(data)
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
}

const getApartmentByBuilding = (req, res) => {
    const { buildingId } = req.params
    if (!buildingId) {
        return res.status(500).send("Bad Request")
    }
    apartmentService.getApartmentByBuilding(buildingId)
        .then((data) => {
            res.status(201).json(data)
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        })
        .catch(error => next(error))
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