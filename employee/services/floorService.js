const mongoose = require('mongoose')
const Building = require('../../models/Building')


exports.getAllFloorByBuilding = ({ buildingId }) => {
    return Building.aggregate([
        {
            $match: { _id: mongoose.Types.ObjectId(buildingId) }
        },
        {
            $project: {
                floors: 1,
                _id: 0
            }
        }
    ])
}

exports.getFloor = async ({ floorId }) => {
    const floor = await Building.aggregate([
        {
            $match: {
                'floors._id': mongoose.Types.ObjectId(floorId)
            }
        },
        {
            $addFields: {
                floor: {
                    $arrayElemAt: [
                        {
                            $filter: {
                                input: "$floors",
                                as: "floor",
                                cond: { $eq: ["$$floor._id", mongoose.Types.ObjectId(floorId)] }
                            }
                        },
                        0
                    ]

                },
            }
        },
        {
            $replaceRoot: {
                newRoot: '$floor'
                // newRoot: {
                //     $mergeObjects: [
                //         '$$ROOT', '$floor'
                //     ]
                // }
            }
        },
        {
            $lookup: {
                from: 'facilities',
                localField: '_id',
                foreignField: 'buildingFloorId',
                as: 'facilities'
            }
        },
        {
            $lookup: {
                from: 'apartments',
                localField: '_id',
                foreignField: 'floorId',
                as: 'apartments'
            }
        },
        {
            $lookup: {
                from: 'customers',
                localField: 'apartments.ownerId',
                foreignField: '_id',
                as: 'owners'
            }
        },
        {
            $addFields: {
                apartments: {
                    $map: {
                        input: "$apartments",
                        as: "apartment",
                        in: {
                            $mergeObjects: [
                                '$$apartment',
                                {
                                    owner: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$owners",
                                                    as: "owner",
                                                    cond: { $eq: ["$$owner._id", '$$apartment.ownerId'] }
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
            $project: {
                owners: 0
            }
        }
    ])

    if (!floor.length) {
        return null
    }
    return (floor[0] || null)
}

exports.createFloor = ({ buildingId, code, name, details, status, images }) => {
    return Building.updateOne(
        { _id: buildingId },
        {
            $push: {
                floors: { code, name, details, status, images }
            }
        }

    )
}

exports.deleteFloor = ({ floorId }) => {
    return Building.updateOne(
        { 'floors._id': floorId },
        {
            $pull: {
                floors: {
                    _id: floorId
                }
            }
        }
    )
}

exports.updateFloor = ({ floorId, code, name, details, status, images }) => {
    return Building.updateOne(
        {
            "floors._id": floorId
        },
        {
            $set: {
                "floors.$.name": name,
                "floors.$.code": code,
                "floors.$.details": details,
                "floors.$.status": status,
                "floors.$.images": images
            }
        }
    )
}

exports.changeFloorStatus = ({ floorId, status }) => {
    return Building.updateOne(
        {
            "floors._id": floorId
        },
        {
            $set: {
                "floors.$.status": status
            }
        }
    )
}