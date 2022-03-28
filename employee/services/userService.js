const Employee = require('../../models/Employee');
const bcrypt = require('bcryptjs');

exports.changeInfo = (employeeId, { firstname, lastname, phone, address }) => {
    return Employee.updateOne({ _id: employeeId }, {
        $set: { firstname, lastname, phone, address }
    })
}

exports.changePassword = async ({ id, oldPassword, newPassword }) => {
    try {
        const employee = await Employee.findOne({ _id: id })

        if (employee && (await bcrypt.compare(oldPassword, employee.password))) {
            const result = await changeEmployeePassword(id, newPassword)
            return "Password changed"
        } else {
            console.log("Employee not found/ pasword didn't match")
            throw new Error("Employee not found/ pasword didn't match")
        }
    } catch (error) {
        console.log(error)
        throw new Error("Error occured")
    }
}

exports.updateInfo = ({ id, firstname, lastname, phone, address, department }) => {
    return Employee.updateOne({ _id: id }, {
        $set: { firstname, lastname, phone, address, department }
    })
}

const changeEmployeePassword = async (id, newPassword) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const result = await Employee.updateOne({ _id: id }, {
        $set: { password: hashedPassword }
    })
    return result
}