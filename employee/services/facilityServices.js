const Facility = require('../../models/Facility');
const Building = require('../../models/Building')
const mongoose = require('mongoose');

// exports.getAllFacilitiesByBuilding = async (id) => {
//     const facilities = await Facility.aggregate([
//         {
//             $match: { buildingId: mongoose.Types.ObjectId(id)}
//         },
//         {
//             $lookup: {
//                 from: "facilityCategories",
//                 as: 'facilityCategory',
//                 localField: 'facilityCategoryId',
//                 foreignField: '_id'
//             }
//         },
//         {
//             $sort: {
//                 createdAt: -1
//             }
//         }
//     ])
//     return facilities;
// }

exports.getAllFacilitiesByBuilding = (id) => {
    return Building.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup: {
                from: "facilities",
                as: 'facilities',
                localField: 'floors._id',
                foreignField: 'buildingFloorId'
            }
        },
        {
            $addFields: {
                facilities: {
                    $map: {
                        input: "$facilities",
                        as: "facility",
                        in: {
                            $mergeObjects: [
                                '$$facility',
                                {
                                    floor: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$floors",
                                                    as: "floor",
                                                    cond: { $eq: ["$$floor._id", '$$facility.buildingFloorId'] }
                                                }
                                            },
                                            0
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        {
            $unwind: '$facilities'
        },
        {
            $replaceRoot: {
                newRoot: '$facilities'
            }
        },
    ])
}

exports.getAllFacilitiesByFloor = async (id) => {
    const facilities = await Facility.aggregate([
        {
            $match: { buildingFloorId: mongoose.Types.ObjectId(id) }
        },
        {
            $lookup: {
                from: "facilityCategories",
                as: 'facilityCategory',
                localField: 'facilityCategoryId',
                foreignField: '_id'
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        }
    ])
    return facilities;
}

exports.getFacilityById = async (id) => {
    console.log(id)
    const facility = await Facility.aggregate([
        {
            $match: { _id: mongoose.Types.ObjectId(id) }
        },
        {
            $lookup: {
                from: "buildings",
                as: 'building',
                localField: 'buildingId',
                foreignField: '_id'
            }
        },
        {
            $lookup: {
                from: "facilityCategories",
                as: 'facilityCategory',
                localField: 'facilityCategoryId',
                foreignField: '_id'
            }
        }
    ])
    if (!facility) {
        throw { success: false, error: "Facility Not Found" }
    }
    return facility
}

exports.createFacility = async (buildingId, { facilityCategoryId, buildingFloorId, code, common, name, details, divisible, items, status }) => {
    if (!facilityCategoryId || !buildingFloorId || !code || !name) {
        throw { success: false, error: "Bad Request" }
    }
    // check if facility exists
    const facilityExists = await Facility.findOne({ code })
    if (facilityExists) {
        throw { success: false, error: "Facility  code already exists" }
    }
    // Create facility
    const facility = await Facility.create({
        buildingId, facilityCategoryId, buildingFloorId, code, common, name, details, divisible, items, status
    })
    return facility;
}


exports.updateFacility = async (id, { buildingId, facilityCategoryId, buildingFloorId, code, common, name, details, divisible, items, status }) => {
    if (!buildingId || !facilityCategoryId || !buildingFloorId || !code || !name) {
        throw { success: false, error: "Bad Request" }
    }
    // check if facility exists
    const facilityExists = await Facility.findOne({ code })
    if (facilityExists && facilityExists._id?.toString() !== id) {
        throw { success: false, error: "Facility code already exists" }
    }
    const result = await Facility.updateOne({ _id: id }, {
        $set: { buildingId, facilityCategoryId, buildingFloorId, code, common, name, details, divisible, items, status }
    })
    if (result.n === 0) {
        throw { success: false, error: "Facility category Not Found" }
    }
    return result
}


exports.deleteFacility = async (id) => {
    const result = await Facility.deleteOne({ _id: id })
    if (result.n === 0) {
        throw { success: false, error: "Facility Not Found" }
    }
    return result
}

