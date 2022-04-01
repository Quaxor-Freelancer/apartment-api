const Building = require('../../models/Building');
const Facility = require('../../models/Facility');
const mongoose = require('mongoose');

exports.getAllFacilities = async (id) => {
    const facilities = await Building.aggregate([
        {
            $match: { _id: mongoose.Types.ObjectId(id) }
        },
        {
            $lookup: {
                from: "facilities",
                as: '_facilities',
                localField: 'facilities.facilityId',
                foreignField: '_id'
            }
        },
        {
            $project: {
                '_facilities': 1,
                'facilities': 1
            }
        },
        {
            $sort: {
                'facilities.createdAt': -1
            }
        }
    ])
    return facilities;
}

exports.createFacility = async ({ id, facilityId, buildingFloorId, code, common, name, details, divisible, items, status, images }) => {
    // Create facility
    const facility = await Building.findOneAndUpdate(
        { _id: id},
        { $push: { facilities: { facilityId, buildingFloorId, code, common, name, details, divisible, items, status, images }}}
    )
    return facility;
}

exports.findFacilityById = async (id) => {
    console.log(id)
    const facility = await Building.aggregate([
        {
            $match: { 'facilities._id': mongoose.Types.ObjectId(id)   }
        },
        {
            $lookup: {
                from: "facilities",
                as: '_facilities',
                localField: 'facilities.facilityId',
                foreignField: '_id'
            }
        },
        {
            $project: {
                '_facilities': 1,
                'facilities': 1
            }
        }
    ])
    return facility;
}

exports.updateFacility = async ({ id, facilityId, buildingFloorId, code, common, name, details, divisible, items, status, images }) => {
    const facility = await Building.findOneAndUpdate(
        { 'facilities._id': mongoose.Types.ObjectId(id)   },
        { $set: { 
            "facilities.$.facilityId" : facilityId,
            "facilities.$.buildingFloorId" : buildingFloorId,
            "facilities.$.code" : code,
            "facilities.$.common" : common,
            "facilities.$.name" : name,
            "facilities.$.details" : details,
            "facilities.$.divisible" : divisible,
            "facilities.$.items" : items,
            "facilities.$.status" : status,
            "facilities.$.images" : images
        }}
    )
    return facility
}


exports.deleteFacility = async (id) => {
    return Building.update({ $pull : { facilities: {_id: id} }})
}

