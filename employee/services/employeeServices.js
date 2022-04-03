const Employee = require('../../models/Employee');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')

exports.getAllEmployees = async () => {
    const employees = await Employee.aggregate([
        {
            $project: {
                password: 0
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        }
    ])
    return employees;
}

exports.createEmployee = async ({ employeeCode, firstname, lastname, email, password, phone, address, departmentId, jobRoleId, reportToId, status, loginEnabled }) => {
    // check if employee exists
    const employeeExists = await Employee.findOne({ email })
    if (employeeExists) {
        return { status: false, error: "Email already exists" }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create employee
    const employee = await Employee.create({
        employeeCode, firstname, lastname, email, password: hashedPassword, phone, address, departmentId, jobRoleId, reportToId, status, loginEnabled
    })

    let doc = {...employee._doc}
    delete doc.password
    delete doc.accountRecovery
    return doc;
}

exports.findEmployeeByEamil = async (email) => {
    return Employee.findOne({ email }).select('-password')
}

exports.findEmployeeById = async (id) => {
    return Employee.aggregate([
        {
            $match: { _id: mongoose.Types.ObjectId(id) }
        },
        {
            $lookup: {
                from: "roles",
                as: "role",
                localField: "jobRoleId",
                foreignField: "_id"
            }
        },
        {
            $lookup: {
                from: "employees",
                as: "reportTo",
                localField: "reportToId",
                foreignField: "_id"
            }
        },
        {
            $lookup: {
                from: "departments",
                as: "department",
                localField: "departmentId",
                foreignField: "_id"
            }
        },
        {
            $project: {
                password: 0,
                'reportTo.password': 0
            }
        }
    ])
}

exports.updateEmployee = async ({ id, employeeCode, firstname, lastname, phone, address, departmentId, jobRoleId, reportToId, status, loginEnabled }) => {
    return Employee.updateOne({ _id: id }, {
        $set: { employeeCode, firstname, lastname, phone, address, departmentId, jobRoleId, reportToId, status, loginEnabled }
    })
}

exports.deleteEmployee = async (id) => {
    return Employee.deleteOne({ _id: id })
}

exports.updateEmployeeStatus = async ({ id, status }) => {
    return Employee.updateOne({ _id: id }, {
        $set: { status }
    })
}

exports.updateEmployeeRole = async ({ id, role }) => {
    return Employee.updateOne({ _id: id }, {
        $set: { jobRoleId: role }
    })
}

exports.updatePassword = async ({ id, password }) => {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return Employee.updateOne({ _id: id }, {
        $set: { password: hashedPassword }
    })
}

exports.updateEmployeeAccountStatus = async ({ id, loginEnabled }) => {
    return Employee.updateOne({ _id: id }, {
        $set: { loginEnabled }
    })
}