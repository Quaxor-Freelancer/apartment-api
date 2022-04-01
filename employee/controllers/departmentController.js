const departmentServices = require('../services/departmentServices')

const getAllDepartments= (req, res) => {
    departmentServices.getAllDepartments()
    .then((departments)=>{
        return res.status(201).json(departments)
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).send("Internal Server Error")
    })
}

const createDepartment = (req, res) => {
    const { code, title, description } = req.body;
    if ( !title || !code ) {
        return res.status(500).send("Bad Request")
    }
    departmentServices.createDepartment({ code, title, description })
    .then((department)=>{
        return res.status(201).json(department)
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).send("Internal Server Error")
    })
}

const findDepartment = (req, res) => {
    const { departmentId } = req.params
    departmentServices.findDepartmentById(departmentId)
    .then((department)=>{
        return res.status(201).json(department)
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).send("Internal Server Error")
    })
}

const updateDepartment = (req, res) => {
    const { departmentId } = req.params
    const {code, title, description} = req.body
    if  (!title || !code ) {
        return res.status(500).send("Bad Request")
    }
    departmentServices.updateDepartment({id:departmentId, code, title, description })
    .then((response)=>{
        if(response.error){
            return res.status(201).json(response)
        }
        if(response.n===0){
            return res.status(201).json({status:false, error:"Department not Found"})
        }
        return res.status(200).json({status: true})
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).send("Internal Server Error")
    })
}

const deleteDepartment = (req, res) => {
    const { departmentId } = req.params
    departmentServices.deleteDepartment(departmentId)
    .then((response)=>{
        if(response.n===0){
            return res.status(200).json({status:false, error:"Department not Found"})
        }
        return res.status(200).json({status: true})
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).send("Internal Server Error")
    })
};

module.exports = {
    getAllDepartments,
    createDepartment,
    findDepartment,
    updateDepartment,
    deleteDepartment
}