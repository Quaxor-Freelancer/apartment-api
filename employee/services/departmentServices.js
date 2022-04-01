const Department = require('../../models/Department');

exports.getAllDepartments = async () => {
    const departments = await Department.aggregate([
        {
            $sort: {
                createdAt: -1
            }
        }
    ])
    return departments;
}

exports.createDepartment = async ({ code, title, description }) => {
    // check if department exists
    const departmentExists = await Department.findOne({ code })
    if (departmentExists) {
        return { status: false, error: "Department code already exists" }
    }

    // Create department
    const department = await Department.create({
        code, title, description
    })
    return department;
}

exports.findDepartmentById = async (id) => {
    return Department.findById(id)
}

exports.updateDepartment = async ({ id, code, title, description }) => {
    // check if department exists
    const departmentExists = await Department.findOne({ code })
    if (departmentExists && departmentExists._id?.toString() !== id) {
        return { status: false, error: "Department code already exists" }
    }
    return Department.updateOne({ _id: id }, {
        $set: { code, title, description }
    })
}

exports.deleteDepartment = async (id) => {
    return Department.deleteOne({ _id: id })
}

