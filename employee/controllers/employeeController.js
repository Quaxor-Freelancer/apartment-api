const employeeServices = require('../services/employeeServices')
const {upload, uploadSingle, deleteFile} = require('../../config/s3')

const getAllEmployees = (req, res, next) => {
    employeeServices.getAllEmployees()
        .then((employees) => {
            return res.status(200).json(employees)
        })
        .catch(error => next(error))
}

const createEmployee = (req, res, next) => {
    employeeServices.createEmployee(req.body)
        .then((employee) => {
            return res.status(201).json(employee)
        })
        .catch(error => next(error))
}

const findEmployee = (req, res, next) => {
    employeeServices.findEmployeeById(req.params)
        .then((employee) => {
            return res.json(employee)
        })
        .catch(error => next(error))
}

const updateEmployee = (req, res, next) => {
    employeeServices.updateEmployee(req.params, req.body)
        .then(() => {
            return res.status(201).json({ success: true })
        })
        .catch(error => next(error))
}

const deleteEmployee = (req, res, next) => {
    employeeServices.deleteEmployee(req.params)
        .then(() => {
            return res.status(201).json({ success: true })
        })
        .catch(error => next(error))
};

const updateEmployeeStatus = (req, res, next) => {
    employeeServices.updateEmployeeStatus(req.params, req.body)
        .then(() => {
            return res.status(201).json({ success: true })
        })
        .catch(error => next(error))
}

const updateEmployeeRole = (req, res, next) => {
    employeeServices.updateEmployeeRole(req.params, req.body)
        .then(() => {
            return res.status(201).json({ success: true })
        })
        .catch(error => next(error))
}

const updatePassword = (req, res, next) => {
    employeeServices.updatePassword(req.body)
        .then(() => {
            return res.status(201).json({ success: true })
        })
        .catch(error => next(error))
}

const updateEmployeeAccountStatus = (req, res, next) => {
    employeeServices.updateEmployeeAccountStatus(req.body)
        .then(() => {
            return res.status(201).json({ success: true })
        })
        .catch(error => next(error))
}

const createEmployeeImage = (req, res) => {
    const { employeeId } = req.params

    uploadSingle(req, res, async (err) => {
        if (err)
            return res.status(400).json({ success: false, message: err.message });
    
        const key = req.file.key
        await employeeServices.addImages(employeeId, key)
            .then(()=>{
                res.status(200).json({ msg: 'success', image:  key});
            })
            .catch((err)=>{
                console.log(err)
            })
        console.log(key)
    });
    
}


const changeEmployeeImage = async(req, res) => {
    const { employeeId, key } = req.params
    await deleteFile(key)
        .then(()=>{
            uploadSingle(req, res, async (err) => {
                if (err) {
                    await employeeServices.addImages(employeeId, key)
                    .then(()=>{
                        res.status(400).json({ msg: 'failed', image:  key});
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                }
            
                const file = req.file.key
                await employeeServices.addImages(employeeId, file)
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

const removeEmployeeImage = async (req, res) => {
    const { id, key } = req.params;
    await employeeServices.removeEmployeeImage(id)
        .then(async()=>{
            await deleteFile(key)
                .then(()=>{
                    res.status(200).json({ msg: 'success', isDeleted: true});
                    console.log('success')
                })
                .catch((err)=>{
                    employeeServices.addImages(id, key)
                    res.send(400)
                })
        })
        .catch((err)=>{
            console.log(err)
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
    updateEmployeeAccountStatus,
    createEmployeeImage,
    removeEmployeeImage,
    changeEmployeeImage
}