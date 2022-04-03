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

exports.createRole = async ({ title, premissions, status }) => {
    // check if role exists
    const roleExists = await Role.findOne({ title })
    if (roleExists) {
        return { success: false, error: "Role title already exists" }
    }

    // Create role
    const role = await Role.create({
        title, premissions, status
    })
    return role;
}

exports.findRoleById = async (id) => {
    return Role.findById(id)
}

exports.updateRole = async ({ id, title, premissions, status }) => {
    // check if role exists
    const roleExists = await Role.findOne({ title })
    if (roleExists && roleExists._id?.toString() !== id) {
        return { success: false, error: "Role title already exists" }
    }
    return Role.updateOne({ _id: id }, {
        $set: { title, premissions, status }
    })
}

exports.deleteRole = async (id) => {
    return Role.deleteOne({ _id: id })
}

exports.updateRoleStatus = async ({ id, status }) => {
    return Role.updateOne({ _id: id }, {
        $set: { status }
    })
}
