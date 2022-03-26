const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const employeeServices = require('../services/employeeServices')

const getAllEmployees= async (req, res) => {
    await employeeServices.getAllEmployees()
    .then((employees)=>{
        res.status(201).json(employees)
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).send("Internal Server Error")
    })
}

const createEmployee = async (req, res) => {
    const {employeeCode, firstname, lastname, username, email, password, phone, address, department, jobRoleId, reportTo, status } = req.body;
    console.log(req.body)
    if (!employeeCode || !firstname || !lastname || !username || !email || !password || !phone) {
        res.status(500).send("Internal Server Error")
    }

    employeeServices.createEmployee({ employeeCode, firstname, lastname, username, email, password, phone, address, department, jobRoleId, reportTo, status })
    .then((employees)=>{
        res.status(201).json(employees)
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).send("Internal Server Error")
    })
}

const findEmployee = async (req, res) => {
    const { employeeId } = req.params
    employeeServices.findEmployeeById(employeeId)
    .then((employee)=>{
        res.status(201).json(employee)
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).send("Internal Server Error")
    })
}

const updateEmployee = async (req, res) => {
    const { employeeId } = req.params
    const {employeeCode, firstname, lastname, username, email, phone, address, department, jobRoleId, reportTo, status} = req.body
    if  (!employeeCode || !firstname || !lastname || !username || !email || !phone) {
        res.status(500).send("Internal Server Error")
    }
    employeeServices.updateEmployee({id: employeeId, employeeCode, firstname, lastname, username, phone, address, department, jobRoleId, reportTo, status})
    .then((response)=>{
        res.status(201).json(response)
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).send("Internal Server Error")
    })
}

const deleteEmployee = (req, res) => {
    const { employeeId } = req.params;

    employeeServices.deleteEmployee(employeeId)
    .then((response)=>{
        res.status(201).json(response)
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).send("Internal Server Error")
    })
};

module.exports = {
    getAllEmployees,
    createEmployee,
    findEmployee,
    updateEmployee,
    deleteEmployee
}