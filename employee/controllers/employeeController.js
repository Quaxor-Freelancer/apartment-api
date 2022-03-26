const employeeServices = require('../services/employeeServices')

const getAllEmployees= async (req, res) => {
    await employeeServices.getAllEmployees()
    .then((employees)=>{
        return res.status(201).json(employees)
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).send("Internal Server Error")
    })
}

const createEmployee = async (req, res) => {
    const {employeeCode, firstname, lastname, username, email, password, phone, address, department, jobRoleId, reportTo, status } = req.body;
    if (!employeeCode || !firstname || !lastname || !username || !email || !password || !phone) {
        return res.status(500).send("Bad Request")
    }

    employeeServices.createEmployee({ employeeCode, firstname, lastname, username, email, password, phone, address, department, jobRoleId, reportTo, status })
    .then((employees)=>{
        return res.status(201).json(employees)
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).send("Internal Server Error")
    })
}

const findEmployee = async (req, res) => {
    const { employeeId } = req.params
    if (!employeeId) {
        return res.status(500).send("Bad Request")
    }
    employeeServices.findEmployeeById(employeeId)
    .then((employee)=>{
        return res.status(201).json(employee)
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).send("Internal Server Error")
    })
}

const updateEmployee = async (req, res) => {
    const { employeeId } = req.params
    const {employeeCode, firstname, lastname, username, email, phone, address, department, jobRoleId, reportTo, status} = req.body
    if  (!employeeId || !employeeCode || !firstname || !lastname || !username || !email || !phone) {
        return res.status(500).send("Bad Request")
    }
    employeeServices.updateEmployee({id: employeeId, employeeCode, firstname, lastname, username, phone, address, department, jobRoleId, reportTo, status})
    .then((response)=>{
        if(response.n===0){
            return res.status(201).json({status:false, error:"Employee not Found"})
        }
        return res.status(201).json({status: true})
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).send("Internal Server Error")
    })
}

const deleteEmployee = (req, res) => {
    const { employeeId } = req.params;
    if (!employeeId) {
        return res.status(500).send("Bad Request")
    }
    employeeServices.deleteEmployee(employeeId)
    .then((response)=>{
        if(response.n===0){
            return res.status(201).json({status:false, error:"Employee not Found"})
        }
        return res.status(201).json({status: true})
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).send("Internal Server Error")
    })
};

const updateEmployeeStatus = async (req, res) => {
    const { employeeId } = req.params
    const {status } = req.body
    if  (!employeeId || !status) {
        return res.status(500).send("Bad Request")
    }
    employeeServices.updateEmployeeStatus({id:employeeId, status})
    .then((response)=>{
        if(response.n===0){
            return res.status(201).json({status:false, error:"Employee not Found"})
        }
        return res.status(201).json({status: true})
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).send("Internal Server Error")
    })
}

const updateEmployeeRole = async (req, res) => {
    const { employeeId } = req.params
    const { role } = req.body
    if  (!employeeId || !role) {
        return res.status(500).send("Bad Request")
    }
    employeeServices.updateEmployeeRole({id: employeeId, role})
    .then((response)=>{
        if(response.n===0){
            return res.status(201).json({status:false, error:"Employee not Found"})
        }
        return res.status(201).json({status: true})
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).send("Internal Server Error")
    })
}

const updatePassword = async (req, res) => {
    const { employeeId, password } = req.body
    if  (!employeeId || !password) {
        return res.status(500).send("Bad Request")
    }
    employeeServices.updatePassword({id: employeeId, password})
    .then((response)=>{
        if(response.n===0){
            return res.status(201).json({status:false, error:"Employee not Found"})
        }
        return res.status(201).json({status: true})
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).send("Internal Server Error")
    })
}

const updateEmployeeAccountStatus = async (req, res) => {
    const { employeeId, loginEnabled } = req.body
    if  (!employeeId || (loginEnabled===undefined)) {
        return res.status(500).send("Bad Request")
    }
    employeeServices.updateEmployeeAccountStatus({id:employeeId, loginEnabled})
    .then((response)=>{
        if(response.n===0){
            return res.status(201).json({status:false, error:"Employee not Found"})
        }
        return res.status(201).json({status: true})
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).send("Internal Server Error")
    })
}

module.exports = {
    getAllEmployees,
    createEmployee,
    findEmployee,
    updateEmployee,
    deleteEmployee,
    updateEmployeeStatus,
    updateEmployeeRole,
    updatePassword,
    updateEmployeeAccountStatus
}