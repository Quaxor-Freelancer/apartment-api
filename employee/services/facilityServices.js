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

exports.getAllFacilitiesByBuilding = (id, { common }) => {
    const commonFilter = typeof common !== 'undefined' ? [{
        $addFields: {
            facilities: {
                $filter: {
                    input: '$facilities',
                    as: 'facility',
                    cond: {
                        $eq: ['$$facility.common', !!Number(common)]
                    }
                }
            }
        }
    }] : []
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
        ...commonFilter,
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
    const facility = await Facility.aggregate([
        {
            $match: { _id: mongoose.Types.ObjectId(id) }
        },
        {
            $lookup: {
                from: 'facilitymemberships',
                localField: '_id',
                foreignField: 'facilityId',
                as: 'facilityMemberships'
            }
        },
        {
            $lookup: {
                from: 'apartments',
                localField: 'facilityMemberships.apartmentId',
                foreignField: '_id',
                as: 'apartments'
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
            $lookup: {
                from: "buildings",
                as: 'building',
                localField: 'buildingId',
                foreignField: '_id'
            }
        },
        {
            $addFields: {
                building: {
                    $arrayElemAt: ['$building', 0]
                },
                facilityCategory: {
                    $arrayElemAt: ['$facilityCategory', 0]
                },
                facilityMemberships: {
                    $map: {
                        input: '$facilityMemberships',
                        as: 'facilityMembership',
                        in: {
                            $mergeObjects: [
                                '$$facilityMembership',
                                {
                                    apartment: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: '$apartments',
                                                    as: 'apartment',
                                                    cond: {
                                                        eq: ['$$apartment._id', '$$facilityMembership.apartmentId']
                                                    }
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
            $addFields: {
                floor: {
                    $arrayElemAt: [
                        {
                            $filter: {
                                input: '$building.floors',
                                as: 'floor',
                                cond: {
                                    $eq: ['$$floor._id', '$floorId']
                                }
                            }
                        },
                        0
                    ]
                }
            }
        },
        {
            $project: {
                'building.floors': 0
            }
        }
    ])
    if (!facility[0]) {
        throw { success: false, statusCode: 404, error: "Facility Not Found" }
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

