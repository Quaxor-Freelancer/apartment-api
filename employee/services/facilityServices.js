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
//                 from: "facilitycategories",
// as: 'facilityCategory',
// localField: 'facilityCategoryId',
// foreignField: '_id'
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
                foreignField: 'floorId'
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
                                                    cond: { $eq: ["$$floor._id", '$$facility.floorId'] }
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
        {
            $lookup: {
                from: "facilitycategories",
                as: 'facilityCategory',
                localField: 'facilityCategoryId',
                foreignField: '_id'
            }
        },
        {
            $addFields: {
                facilityCategory: {
                    $arrayElemAt: ['$facilityCategory', 0]
                }
            }
        }
    ])
}

exports.getAllFacilitiesByFloor = async (id) => {
    const facilities = await Facility.aggregate([
        {
            $match: { floorId: mongoose.Types.ObjectId(id) }
        },
        {
            $lookup: {
                from: "facilitycategories",
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
                from: "facilitycategories",
                as: 'facilityCategory',
                localField: 'facilityCategoryId',
                foreignField: '_id'
            }
        }
    ])
    if (!facility[0]) {
        throw { success: false, error: "Facility Not Found" }
    }
    return facility[0]
}

exports.createFacility = async (buildingId, { facilityCategoryId, floorId, code, common, name, details, divisible, items, status }) => {
    if (!facilityCategoryId || !floorId || !code || !name) {
        throw { success: false, error: "Bad Request" }
    }
    // check if facility exists
    const facilityExists = await Facility.findOne({ code })
    if (facilityExists) {
        throw { success: false, error: "Facility  code already exists" }
    }
    // Create facility
    const facility = await Facility.create({
        buildingId, facilityCategoryId, floorId, code, common, name, details, divisible, items, status
    })
    return facility;
}


exports.updateFacility = async (id, { buildingId, facilityCategoryId, floorId, code, common, name, details, divisible, items, status }) => {
    if (!buildingId || !facilityCategoryId || !floorId || !code || !name) {
        throw { success: false, error: "Bad Request" }
    }
    // check if facility exists
    const facilityExists = await Facility.findOne({ code })
    if (facilityExists && facilityExists._id?.toString() !== id) {
        throw { success: false, error: "Facility code already exists" }
    }
    const result = await Facility.updateOne({ _id: id }, {
        $set: { buildingId, facilityCategoryId, floorId, code, common, name, details, divisible, items, status }
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

