const customerServices = require('../services/customerServices')

const getAllCustomers= (req, res, next) => {
    customerServices.getAllCustomers()
    .then((customers)=>{
        return res.status(201).json(customers)
    })
    .catch(error=>next(error))
}

const findCustomer = (req, res, next) => {
    const { customerId } = req.params
    customerServices.findCustomerById(customerId)
    .then((customer)=>{
        return res.status(201).json(customer[0])
    })
    .catch(error=>next(error))
}

const getAllAppartmentsByCustomer = (req, res, next) => {
    const { customerId } = req.params
    customerServices.getAllAppartmentsByCustomer(customerId)
    .then((apartments)=>{
        return res.status(201).json(apartments)
    })
    .catch(error=>next(error))
}

const createCustomer = (req, res, next) => {
    customerServices.createCustomer(req.body)
    .then((customer)=>{
        return res.status(200).json(customer)
    })
    .catch(error=>next(error))
}


const updateCustomer = (req, res, next) => {
    const { customerId } = req.params
    customerServices.updateCustomer( customerId,req.body)
    .then(()=>{
        return res.status(200).json({success: true})
    })
    .catch(error=>next(error))
}

const deleteCustomer = (req, res, next) => {
    const { customerId } = req.params;
    customerServices.deleteCustomer(customerId)
    .then(()=>{
        return res.status(200).json({success: true})
    })
    .catch(error=>next(error))
};

const updateCustomerStatus = (req, res, next) => {
    const { customerId } = req.params
    customerServices.updateCustomerStatus(customerId, req.body)
    .then(()=>{
        return res.status(201).json({success: true})
    })
    .catch(error=>next(error))
}

const updatePassword = (req, res, next) => {
    customerServices.updatePassword(req.body)
    .then(()=>{
        return res.status(201).json({success: true})
    })
    .catch(error=>next(error))
}

module.exports = {
    getAllCustomers,
    findCustomer,
    getAllAppartmentsByCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    updateCustomerStatus,
    updatePassword
}