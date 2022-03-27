const roleServices = require('../services/roleServices')

const getAllRoles= (req, res) => {
    roleServices.getAllRoles()
    .then((roles)=>{
        return res.status(201).json(roles)
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).send("Internal Server Error")
    })
}

const createRole = (req, res) => {
    const { title, premissions, status } = req.body;
    if ( !title || !premissions ) {
        return res.status(500).send("Bad Request")
    }
    roleServices.createRole({ title, premissions, status })
    .then((roles)=>{
        return res.status(201).json(roles)
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).send("Internal Server Error")
    })
}

const findRole = (req, res) => {
    const { roleId } = req.params
    roleServices.findRoleById(roleId)
    .then((role)=>{
        return res.status(201).json(role)
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).send("Internal Server Error")
    })
}

const updateRole = (req, res) => {
    const { roleId } = req.params
    const {title, premissions, status} = req.body
    if  (!title || !premissions ) {
        return res.status(500).send("Bad Request")
    }
    roleServices.updateRole({id:roleId, title, premissions, status })
    .then((response)=>{
        if(response.error){
            return res.status(201).json(response)
        }
        if(response.n===0){
            return res.status(201).json({status:false, error:"Role not Found"})
        }
        return res.status(201).json({status: true})
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).send("Internal Server Error")
    })
}

const deleteRole = (req, res) => {
    const { roleId } = req.params
    roleServices.deleteRole(roleId)
    .then((response)=>{
        if(response.n===0){
            return res.status(201).json({status:false, error:"Role not Found"})
        }
        return res.status(201).json({status: true})
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).send("Internal Server Error")
    })
};

const updateRoleStatus = (req, res) => {
    const { roleId } = req.params
    const {status } = req.body
    if  (status ===undefined) {
        return res.status(500).send("Bad Request")
    }
    roleServices.updateRoleStatus({id:roleId, status})
    .then((response)=>{
        if(response.n===0){
            return res.status(201).json({status:false, error:"Role not Found"})
        }
        return res.status(201).json({status: true})
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).send("Internal Server Error")
    })
}

module.exports = {
    getAllRoles,
    createRole,
    findRole,
    updateRole,
    deleteRole,
    updateRoleStatus
}