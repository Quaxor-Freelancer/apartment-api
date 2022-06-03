const Employee = require('../../models/Employee');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')

exports.getAllEmployees = async () => {
    const employees = await Employee.aggregate([
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
    return employees;
}

exports.createEmployee = async ({ employeeCode, firstname, lastname, email, password, phone, address, departmentId, jobRoleId, reportToId, status, loginEnabled }) => {
    if (!employeeCode || !firstname || !lastname || !email || !password || !phone) {
        throw { success: false, error:"Bad Request", statusCode: 400 }
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
    return Employee.findOne({ email }).select({
        password: 0,
        accountRecovery: 0
    })
}

exports.findEmployeeById = async ({ employeeId }) => {
    const employee =await Employee.aggregate([
        {
            $match: { _id: mongoose.Types.ObjectId(employeeId) }
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
                accountRecovery: 0,
                'reportTo.password': 0,
                'reportTo.accountRecovery': 0
            }
        }
    ])
    if(!employee.length){
        throw { success: false, error: "Employee Not Found", statusCode: 404}
    }
    return employee[0]
}

exports.updateEmployee = async ({ employeeId }, { employeeCode, firstname, lastname, phone, address, departmentId, jobRoleId, reportToId, status, loginEnabled }) => {
    if  (!employeeCode || !firstname || !lastname || !phone) {
        throw { success: false, error:"Bad Request", statusCode: 400 }
    }
    const result=await Employee.updateOne({ _id: employeeId }, {
        $set: { employeeCode, firstname, lastname, phone, address, departmentId, jobRoleId, reportToId, status, loginEnabled }
    })
    if(result.n ===0){
        throw { success: false, error: "Employee Not Found", statusCode: 404}
    }
    return result
}

exports.deleteEmployee = async ({ employeeId }) => {
    const result =await Employee.deleteOne({ _id: employeeId })
    if(result.n ===0){
        throw { success: false, error: "Employee Not Found", statusCode: 404}
    }
    return result
}

exports.updateEmployeeStatus = async ({ employeeId },{status }) => {
    const result =await Employee.updateOne({ _id: employeeId }, {
        $set: { status }
    })
    if(result.n ===0){
        throw { success: false, error: "Employee Not Found", statusCode: 404}
    }
    return result
}

exports.updateEmployeeRole = async ({ employeeId },{role }) => {
    const result =await Employee.updateOne({ _id: employeeId }, {
        $set: { jobRoleId: role }
    })
    if(result.n ===0){
        throw { success: false, error: "Employee Not Found", statusCode: 404}
    }
    return result
}

exports.updatePassword = async ({ employeeId, password }) => {
    if  (!employeeId || !password) {
        throw { success: false, error:"Bad Request", statusCode: 400 }
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result =await Employee.updateOne({ _id: employeeId }, {
        $set: { password: hashedPassword }
    })
    if(result.n ===0){
        throw { success: false, error: "Employee Not Found", statusCode: 404}
    }
    return result
}

exports.updateEmployeeAccountStatus = async ({ employeeId, loginEnabled }) => {
    if  (!employeeId) {
        throw { success: false, error:"Bad Request", statusCode: 400 }
    }
    const result =await Employee.updateOne({ _id: employeeId }, {
        $set: { loginEnabled }
    })
    if(result.n ===0){
        throw { success: false, error: "Employee Not Found", statusCode: 404}
    }
    return result
}

exports.addImages = (employeeId, key) => {
    return Employee.updateOne({ _id: employeeId }, {
        $set: {
            image: key
        }
    }) 
}

exports.removeEmployeeImage = (id) => {
    return Employee.updateOne({_id: id }, {
        $set: {
            image: null
        }
    }) 
}