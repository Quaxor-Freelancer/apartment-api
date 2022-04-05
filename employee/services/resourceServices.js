const Resource = require('../../models/Resource');

exports.getAllResources = async () => {
    const resources = await Resource.aggregate([
        {
            $sort: {
                createdAt: -1
            }
        }
    ])
    return resources;
}

exports.createResource = async ({ code, title, status }) => {
    if ( !title || !code ) {
        throw {success: false, error: "Bad Request"}
    }
    // check if resource exists
    const resourceExists = await Resource.findOne({ code })
    if (resourceExists) {
        throw { success: false, error: "Resource code already exists" }
    }
    // Create resource
    const resource = await Resource.create({
        code, title, status
    })
    return resource;
}

exports.findResourceById = async (id) => {
    const resource= await Resource.findById(id)
    if(!resource){
        throw { success: false, error: "Resource Not Found"}
    }
    return resource
}

exports.updateResource = async (id, {code, title, status }) => {
    if  (!title || !code ) {
        throw {success: false, error: "Bad Request"}
    }
    // check if resource exists
    const resourceExists = await Resource.findOne({ code })
    if (resourceExists && resourceExists._id?.toString() !== id) {
        throw { success: false, error: "Resource code already exists" }
    }
    const result =await Resource.updateOne({ _id: id }, {
        $set: { code, title, status }
    })
    if(result.n ===0){
        throw { success: false, error: "Resource Not Found"}
    }
    return result
}

exports.deleteResource = async (id) => {
    const result = await Resource.deleteOne({ _id: id })
    if(result.n ===0){
        throw { success: false, error: "Resource Not Found"}
    }
    return result
}

exports.changeStatus = (resourceId,{status}) => {
    return Resource.updateOne({ _id: resourceId }, {
        $set: {
            status
        }
    })
}