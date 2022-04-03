const resourceServices = require('../services/resourceServices')

const getAllResources= (req, res, next) => {
    resourceServices.getAllResources()
    .then((resources)=>{
        return res.status(201).json(resources)
    })
    .catch(error=>next(error))
}

const createResource = (req, res, next) => {
    resourceServices.createResource(req.body)
    .then((resource)=>{
        return res.status(200).json(resource)
    })
    .catch(error=>next(error))
}

const findResource =(req, res, next) => {
    const { resourceId } = req.params
    resourceServices.findResourceById(resourceId)
    .then((resource)=>{
        return res.status(201).json(resource)
    })
    .catch(error=>next(error))
}

const updateResource = (req, res, next) => {
    const { resourceId } = req.params
    resourceServices.updateResource(resourceId, req.body)
    .then(()=>{
        return res.status(200).json({status: true})
    })
    .catch(error=>next(error))
}

const deleteResource = (req, res, next) => {
    const { resourceId } = req.params
    resourceServices.deleteResource(resourceId)
    .then(()=>{
        return res.status(200).json({status: true})
    })
    .catch(error=>next(error))
};

const changeStatus = (req, res) => {
    const {resourceId} = req.params
    resourceServices.changeStatus(resourceId, req.body)
    .then(()=>{
        res.status(200).json({status: true})
    })
    .catch(error=>next(error))
}

module.exports = {
    getAllResources,
    createResource,
    findResource,
    updateResource,
    deleteResource,
    changeStatus
}