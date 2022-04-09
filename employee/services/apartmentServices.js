const mongoose = require('mongoose')
const Apartment = require('../../models/Apartment')
const Building = require('../../models/Building')

exports.getAllApartments = () => {
    return Apartment.find()
}

exports.getApartment = (apartmentId) => {
    return Apartment.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(apartmentId)
            }
        },
        {
            $lookup: {
                from: 'buildings',
                localField: 'floorId',
                foreignField: 'floors._id',
                as: 'building'
            }
        },
        {
            $addFields: {
                building: {
                    $arrayElemAt: ['$building', 0]
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
            $lookup: {
                from: 'facilitymemberships',
                localField: '_id',
                foreignField: 'apartmentId',
                as: 'facilityMemberships'
            }
        },
        {
            $lookup: {
                from: 'facilities',
                localField: 'facilityMemberships.facilityId',
                foreignField: '_id',
                as: 'facilities'
            }
        },
        {
            $addFields: {
                facilityMemberships: {
                    $map: {
                        input: '$facilityMemberships',
                        as: 'facilityMembership',
                        in: {
                            $mergeObjects: [
                                '$$facilityMembership',
                                {
                                    facility: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: '$facilities',
                                                    as: 'facility',
                                                    cond: [{
                                                        $eq: ['$$facility._id', '$$facilityMembership.facilityId']
                                                    }]
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
                facilities: 0,
                'building.floors': 0
            }
        }
    ]).then(data => data[0])
}

exports.createApartment = ({ code, name, details, floorId, ownerId, buildingId, status }) => {
    const apartment = new Apartment({
        code, name, details, floorId, buildingId, ownerId, status
    })
    return apartment.save()
}

exports.updateApartment = ({ apartmentId, code, name, details, floorId, ownerId, buildingId, status }) => {
    return Apartment.updateOne({ _id: apartmentId }, {
        $set: {
            code, name, details, floorId, buildingId, ownerId, status
        }
    })
}

exports.deleteApartment = (apartmentId) => {
    return Apartment.deleteOne({ _id: apartmentId })
}

exports.changeStatus = ({ apartmentId, status }) => {
    return Apartment.updateOne({ _id: apartmentId }, {
        $set: {
            status
        }
    })
}

exports.getApartmentByFloor = (floorId) => {
    return Apartment.aggregate([
        {
            $match: {
                floorId: mongoose.Types.ObjectId(floorId)
            }
        }
    ])
}

exports.getApartmentByBuilding = async (buildingId) => {
    return Apartment.aggregate([
        {
            $match: {
                buildingId: mongoose.Types.ObjectId(buildingId)
            }
        }
    ])
}

exports.updateApartmentOwner = ({ apartmentId }, { ownerId }) => {
    return Apartment.updateOne({ _id: apartmentId }, {
        $set: {
            ownerId: ownerId || null
        }
    })
}