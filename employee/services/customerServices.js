const Customer = require('../../models/Customer');
const Apartment = require('../../models/Apartment');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')

exports.getAllCustomers = async () => {
    const customers = await Customer.aggregate([
        {
            $project: {
                password: 0,
                accountRecovery: 0
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        }
    ])
    return customers;
}


exports.findCustomerById = async (id) => {
    return Customer.aggregate([
        {
            $match: { _id: mongoose.Types.ObjectId(id) }
        },
        {
            $project: {
                password: 0,
                accountRecovery: 0
            }
        }
    ])
}

exports.getAllAppartmentsByCustomer = async (id) => {
    return Apartment.aggregate([
        {
            $match: { ownerId: mongoose.Types.ObjectId(id) }
        }
    ])
}

exports.createCustomer = async ({ code, firstname, lastname, email, password, phone, address, status }) => {
    if (!code || !firstname || !lastname || !email || !password || !phone) {
        throw { success: false, error: "Bad Request" }
    }

    // check if customer exists
    const customerExists = await Customer.findOne({ email })
    if (customerExists) {
        throw { success: false, error: "Email already exists" }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create customer
    let customer = await Customer.create({
        code, firstname, lastname, email, password: hashedPassword, phone, address, status
    })
    let doc = {...customer._doc}
    delete doc.password
    delete doc.accountRecovery
    return doc;
}

exports.findCustomerByEamil = async (email) => {
    return Customer.findOne({ email }) .select({
        password: 0,
        accountRecovery: 0
    })
}

exports.updateCustomer = async (id, { code, firstname, lastname, email, phone, address, status }) => {
    if (!code || !firstname || !lastname || !email || !phone) {
        throw { success: false, error: "Bad Request" }
    }

    return Customer.updateOne({ _id: id }, {
        $set: { code, firstname, lastname, email, phone, address, status}
    })
}

exports.deleteCustomer = async (id) => {
    const result=await Customer.deleteOne({ _id: id })
    if(result.n ===0){
        throw { success: false, error: "Customer Not Found"}
    }
    return result
}

exports.updateCustomerStatus = async (id, { status }) => {
    const result = await Customer.updateOne({ _id: id }, {
        $set: { status }
    })
    if(result.n ===0){
        throw { success: false, error: "Customer Not Found"}
    }
    return result
}


exports.updatePassword = async ({ customerId, password }) => {
    if (!customerId || !password ) {
        return { success: false, error: "Bad Request" }
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result= await Customer.updateOne({ _id: customerId }, {
        $set: { password: hashedPassword }
    })
    if(result.n ===0){
        throw { success: false, error: "Customer Not Found"}
    }
    return result
}
