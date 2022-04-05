const employeeServices = require('../services/employeeServices')

const getAllEmployees= (req, res, next) => {
    employeeServices.getAllEmployees()
    .then((employees)=>{
        return res.status(200).json(employees)
    })
    .catch(error=>next(error))
}

const createEmployee = (req, res, next) => {
    employeeServices.createEmployee(req.body)
    .then((employee)=>{
        return res.status(201).json(employee)
    })
    .catch(error=>next(error))
}

const findEmployee = (req, res, next) => {
    employeeServices.findEmployeeById(req.params)
    .then((employee)=>{
        return res.status(201).json(employee)
    })
    .catch(error=>next(error))
}

const updateEmployee = (req, res, next) => {
    employeeServices.updateEmployee(req.params, req.body)
    .then(()=>{
        return res.status(201).json({success: true})
    })
    .catch(error=>next(error))
}

const deleteEmployee = (req, res, next) => {
    employeeServices.deleteEmployee(req.params)
    .then(()=>{
        return res.status(201).json({success: true})
    })
    .catch(error=>next(error))
};

const updateEmployeeStatus = (req, res, next) => {
    employeeServices.updateEmployeeStatus(req.params, req.body)
    .then(()=>{
        return res.status(201).json({success: true})
    })
    .catch(error=>next(error))
}

const updateEmployeeRole = (req, res, next) => {
    employeeServices.updateEmployeeRole(req.params, req.body)
    .then(()=>{
        return res.status(201).json({success: true})
    })
    .catch(error=>next(error))
}

const updatePassword = (req, res, next) => {
    employeeServices.updatePassword(req.body)
    .then(()=>{
        return res.status(201).json({success: true})
    })
    .catch(error=>next(error))
}

const updateEmployeeAccountStatus = (req, res, next) => {
    employeeServices.updateEmployeeAccountStatus(req.body)
    .then(()=>{
        return res.status(201).json({success: true})
    })
    .catch(error=>next(error))
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