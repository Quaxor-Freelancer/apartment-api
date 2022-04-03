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
    if ( !title || !code ) {
        throw { success: false, error:"Bad Request", statusCode: 400 }
    }
    // Create department
    const department = await Department.create({
        code, title, description
    })
    return department;
}

exports.findDepartmentById = async ({ departmentId }) => {
    const department =await Department.findById(departmentId)
    if(!department){
        throw { success: false, error: "Department Not Found", statusCode: 404}
    }
    return department
}

exports.updateDepartment = async ({ departmentId },{code, title, description }) => {
    if ( !title || !code ) {
        throw { success: false, error:"Bad Request", statusCode: 400 }
    }
    const result =await Department.updateOne({ _id: departmentId }, {
        $set: { code, title, description }
    })
    if(result.n ===0){
        throw { success: false, error: "Department Not Found", statusCode: 404}
    }
    return result
}

exports.deleteDepartment = async ({ departmentId }) => {
    const result =await Department.deleteOne({ _id: departmentId })
    if(result.n ===0){
        throw { success: false, error: "Department Not Found", statusCode: 404}
    }
    return result
}

