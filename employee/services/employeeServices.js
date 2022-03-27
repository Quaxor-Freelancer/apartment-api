const Employee = require('../../models/Employee');
const bcrypt = require('bcryptjs');

exports.getAllEmployees = async () => {
    const employees = await Employee.aggregate([
        {
            $sort : {
                createdAt: -1
            }
        }
    ])
    return employees;
}

exports.createEmployee = async ({employeeCode, firstname, lastname, username, email, password, phone, address, department, jobRoleId, reportTo, status, loginEnabled}) => {
    // check if employee exists
    const employeeExists = await Employee.findOne({ email })
    if (employeeExists) {
        return {status:false, error:"Email already exists"}
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create employee
    const employee = await Employee.create({
        employeeCode, firstname, lastname, username, email, password: hashedPassword, phone, address, department, jobRoleId, reportTo, status, loginEnabled
    })
    return employee;
}

exports.findEmployeeByEamil = async (email) => {
    return Employee.findOne({ email }).select('-password')
}

exports.findEmployeeById = async (id) => {
    return Employee.findById(id).select('-password')
}

exports.updateEmployee = async ({id, employeeCode, firstname, lastname, username, phone, address, department, jobRoleId, reportTo, status, loginEnabled}) => {
    return Employee.updateOne({ _id:id }, {
        $set: {employeeCode, firstname, lastname, username, phone, address, department, jobRoleId, reportTo, status, loginEnabled}
    })
}

exports.deleteEmployee = async (id) => {
    return Employee.deleteOne({ _id: id })
}

exports.updateEmployeeStatus = async ({id, status}) => {
    return Employee.updateOne({ _id:id }, {
        $set: {status}
    })
}

exports.updateEmployeeRole = async ({id, role}) => {
    return Employee.updateOne({ _id:id }, {
        $set: {jobRoleId:role}
    })
}

exports.updatePassword = async ({id, password}) => {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return Employee.updateOne({ _id:id }, {
        $set: {password: hashedPassword}
    })
}

exports.updateEmployeeAccountStatus = async ({id, loginEnabled}) => {
    return Employee.updateOne({ _id:id }, {
        $set: {loginEnabled}
    })
}