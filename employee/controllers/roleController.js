const roleServices = require('../services/roleServices')

const getAllRoles= (req, res, next) => {
    roleServices.getAllRoles()
    .then((roles)=>{
        return res.status(200).json(roles)
    })
    .catch(error=>next(error))
}

const createRole = (req, res, next) => {
    roleServices.createRole(req.body)
    .then((role)=>{
        return res.status(201).json(role)
    })
    .catch(error=>next(error))
}

const findRole = (req, res, next) => {
    roleServices.findRoleById(req.params)
    .then((role)=>{
        return res.status(201).json(role)
    })
    .catch(error=>next(error))
}

const updateRole = (req, res, next) => {
    roleServices.updateRole( req.params,req.body )
    .then(()=>{
        return res.status(201).json({success: true})
    })
    .catch(error=>next(error))
}

const deleteRole = (req, res, next) => {
    roleServices.deleteRole(req.params)
    .then(()=>{
        return res.status(201).json({success: true})
    })
    .catch(error=>next(error))
};

const updateRoleStatus = (req, res, next) => {
    roleServices.updateRoleStatus(req.params, req.body)
    .then(()=>{
        return res.status(201).json({success: true})
    })
    .catch(error=>next(error))
}

module.exports = {
    getAllRoles,
    createRole,
    findRole,
    updateRole,
    deleteRole,
    updateRoleStatus
}