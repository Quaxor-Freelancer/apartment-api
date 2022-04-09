const Role = require('../../models/Role');

exports.getAllRoles = async () => {
    const roles = await Role.aggregate([
        {
            $sort: {
                createdAt: -1
            }
        }
    ])
    return roles;
}

exports.createRole = async ({ title, permissions, status }) => {
    if ( !title || !permissions ) {
        throw { success: false, error:"Bad Request", statusCode: 400 }
    }
    // Create role
    const role = await Role.create({
        title, permissions, status
    })
    return role;
}

exports.findRoleById = async ({roleId}) => {
    return Role.findById(roleId)
}

exports.updateRole = async ({ roleId},{title, permissions, status }) => {
    if ( !title || !permissions ) {
        throw { success: false, error:"Bad Request", statusCode: 400 }
    }
    return Role.updateOne({ _id: roleId }, {
        $set: { title, permissions, status }
    })
}

exports.deleteRole = async ({ roleId }) => {
    return Role.deleteOne({ _id: roleId })
}

exports.updateRoleStatus = async ({ roleId}, {status }) => {
    return Role.updateOne({ _id: roleId }, {
        $set: { status }
    })
}
