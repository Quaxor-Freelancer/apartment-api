const FacilityCategory = require('../../models/FacilityCategory');

exports.getAllFacilityCategories = async () => {
    const facilities = await FacilityCategory.aggregate([
        {
            $sort: {
                createdAt: -1
            }
        }
    ])
    return facilities;
}

exports.createFacilityCategory = async ({ code, title, details, icon, status }) => {
    if ( !title || !code ) {
        throw {success: false, error: "Bad Request"}
    }
    // check if facilityCategory exists
    const facilityCategoryExists = await FacilityCategory.findOne({ code })
    if (facilityCategoryExists) {
        throw { success: false, error: "Facility Category code already exists" }
    }
    // Create facilityCategory
    const facilityCategory = await FacilityCategory.create({
        code, title, details, icon, status
    })
    return facilityCategory;
}

exports.findFacilityCategoryById = async (id) => {
    const facilityCategory= await FacilityCategory.findById(id)
    if(!facilityCategory){
        throw { success: false, error: "Facility category Not Found"}
    }
    return facilityCategory
}

exports.updateFacilityCategory = async (id, {code, title, details, icon, status }) => {
    if  (!title || !code ) {
        throw {success: false, error: "Bad Request"}
    }
    // check if facilityCategory exists
    const facilityCategoryExists = await FacilityCategory.findOne({ code })
    if (facilityCategoryExists && facilityCategoryExists._id?.toString() !== id) {
        throw { success: false, error: "Facility Category code already exists" }
    }
    const result =await FacilityCategory.updateOne({ _id: id }, {
        $set: { code, title, details, icon, status }
    })
    if(result.n ===0){
        throw { success: false, error: "Facility category Not Found"}
    }
    return result
}

exports.deleteFacilityCategory = async (id) => {
    const result = await FacilityCategory.deleteOne({ _id: id })
    if(result.n ===0){
        throw { success: false, error: "Facility category Not Found"}
    }
    return result
}

