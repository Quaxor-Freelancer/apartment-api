const departmentServices = require('../services/departmentServices')

const getAllDepartments = (req, res, next) => {
    departmentServices.getAllDepartments()
        .then((departments) => {
            return res.status(200).json(departments)
        })
        .catch(error => next(error))
}

const createDepartment = (req, res, next) => {
    departmentServices.createDepartment(req.body)
        .then((department) => {
            return res.status(201).json(department)
        })
        .catch(error => next(error))
}

const findDepartment = (req, res, next) => {
    departmentServices.findDepartmentById(req.params)
        .then((department) => {
            return res.json(department)
        })
        .catch(error => next(error))
}

const updateDepartment = (req, res, next) => {
    departmentServices.updateDepartment(req.params, req.body)
        .then(() => {
            return res.status(201).json({ success: true })
        })
        .catch(error => next(error))
}

const deleteDepartment = (req, res, next) => {
    departmentServices.deleteDepartment(req.params)
        .then(() => {
            return res.status(201).json({ success: true })
        })
        .catch(error => next(error))
};

module.exports = {
    getAllDepartments,
    createDepartment,
    findDepartment,
    updateDepartment,
    deleteDepartment
}