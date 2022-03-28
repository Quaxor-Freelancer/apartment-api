const Employee = require('../../models/Employee');
const bcrypt = require('bcryptjs');

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

exports.createEmployee = async ({ employeeCode, firstname, lastname, username, email, password, phone, address, department, jobRoleId, reportTo, status }) => {
    // check if employee exists
    const employeeExists = await Employee.findOne({ email })
    if (employeeExists) {
        throw new Error("Employee already exists")
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create employee
    const employee = await Employee.create({
        employeeCode, firstname, lastname, username, email, password: hashedPassword, phone, address, department, jobRoleId, reportTo, status
    })
    return employee;
}

exports.findEmployeeByEamil = async (email) => {
    return Employee.findOne({ email }).select('-password')
}

exports.findEmployeeById = async (id) => {
    return Employee.findById(id).select('-password')
}

exports.updateEmployee = async ({ id, employeeCode, firstname, lastname, username, phone, address, department, jobRoleId, reportTo, status }) => {
    return Employee.updateOne({ _id: id }, {
        $set: { employeeCode, firstname, lastname, username, phone, address, department, jobRoleId, reportTo, status }
    })
}

exports.deleteEmployee = async (id) => {
    return Employee.deleteOne({ _id: id })
}