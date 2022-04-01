const Facility = require('../../models/Facility');

exports.getAllFacilities = async () => {
    const facilities = await Facility.aggregate([
        {
            $sort: {
                createdAt: -1
            }
        }
    ])
    return facilities;
}

exports.createFacility = async ({ code, title, details, icon, status }) => {
    // check if facility exists
    const facilityExists = await Facility.findOne({ code })
    if (facilityExists) {
        return { status: false, error: "Facility code already exists" }
    }

    // Create facility
    const facility = await Facility.create({
        code, title, details, icon, status
    })
    return facility;
}

exports.findFacilityById = async (id) => {
    return Facility.findById(id)
}

exports.updateFacility = async ({ id, code, title, details, icon, status }) => {
    // check if facility exists
    const facilityExists = await Facility.findOne({ code })
    if (facilityExists && facilityExists._id?.toString() !== id) {
        return { status: false, error: "Facility code already exists" }
    }
    return Facility.updateOne({ _id: id }, {
        $set: { code, title, details, icon, status }
    })
}

exports.deleteFacility = async (id) => {
    return Facility.deleteOne({ _id: id })
}

