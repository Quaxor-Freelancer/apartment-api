const buildingService = require('../services/buildingService')
const {upload, uploadMultiple, deleteFile, uploadSingle} = require('../../config/s3')

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

const createBuildingImage = (req, res) => {
    const { buildingId } = req.params

    uploadMultiple(req, res, async (err) => {
        if (err)
            return res.status(400).json({ success: false, message: err.message });
    
        const arrayOfKeys = []
        console.log(req.files)
        await req.files.map((item)=>arrayOfKeys.push({url: item.key}))
        await buildingService.addImages(buildingId, arrayOfKeys)
            .then(()=>{
                res.status(200).json({ msg: 'success', uploadedImages:  arrayOfKeys});
            })
            .catch((err)=>{
                console.log(err)
            })
    });
}


const changeBuildingImage = async(req, res) => {
    const {imageId, key} = req.params
    console.log({change: key})
    await deleteFile(key)
        .then(()=>{
            uploadSingle(req, res, async (err) => {
                if (err) {
                    res.status(400).json({ msg: 'failed', image:  key});
                }
            
                const file = req.file.key
                await buildingService.changeImage(imageId, file)
                    .then(()=>{
                        res.status(200).json({ msg: 'success', image:  file});
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                console.log(file)
            });
        })
        .catch((err)=>{
           console.log(err)
        })
}


const removeBuildingImage = async (req, res) => {
    const { id, key } = req.params;
    await buildingService.removeBuildingImage(id, key)
        .then(async()=>{
            await deleteFile(key)
                .then(()=>{
                    res.status(200).json({ msg: 'success', isDeleted: true});
                    console.log('success')
                })
                .catch((err)=>{
                    buildingService.addImages(id, [{url: key}])
                    res.send(400)
                })
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
    createBuildingImage,
    removeBuildingImage,
    changeBuildingImage
}